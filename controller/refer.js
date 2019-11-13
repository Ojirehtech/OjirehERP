const { User } = require( "../models/user" );
const {creditSms} = require("../service/sms")
require( "dotenv" ).config();

/**
 * Refers 
 */
exports.refer = ( req, res ) => {
  const { userId } = req.params;
  var date = new Date();
  date.setMinutes( date.getMinutes() + 5 );
  User.findOne( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `Referer with the ID ${ userId } not found` } )
      res.cookie( "refererId", userId, { expires: date } );
      res.redirect( process.env.FRONTEND_APP_URL )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
  
}


/**
 * Referers settlement
*/
exports.refererSettlement = ( req, res ) => {
  const { refererPhone } = req.params;
  // const { refererId } = req.cookies;
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  // if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
  User.findOneAndUpdate( { phone: refererPhone }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      if ( !user ) return;
      const phone = user.phone;
      const totalBal = user.balance;
      creditSms( res, phone, 200, totalBal );
      const grandReferer = user.parentId;
      if ( !grandReferer ) return;
      console.log( user, "this. the first user to get reward" )
      User.findByIdAndUpdate( { _id: grandReferer }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          if ( !resp ) return;
          const ancestralParentId = resp.parentId;
          if ( !ancestralParentId ) return;
          const phone = resp.phone;
          const total = resp.balance;
          creditSms( res, phone, 50, total );
          User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              const phone = response.phone;
              const balance = response.balance;
              creditSms( res, phone, 8, balance );
              if ( !response ) return;
            } )
        } )
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}              