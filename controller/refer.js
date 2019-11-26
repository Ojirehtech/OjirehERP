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
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  const newEarning = { amount: 200 }
  User.findOneAndUpdate( { phone: refererPhone }, { $inc: { balance: +200, networks: +1 }, $push: { earnings: newEarning } }, { new: true } )
    .then( user => {
      if ( !user ) return;
      const phone = user.phone;
      const totalBal = user.balance;
      creditSms( res, phone, 200, totalBal );
      const grandReferer = user.parentId;
      if ( !grandReferer ) return;
      console.log( user, "this. the first user to get reward" );

      const myeEarning = { amount: 50 }
      User.findByIdAndUpdate( { _id: grandReferer }, { $inc: { balance: +50, networks: +1 }, $push: { earnings: myeEarning } }, { new: true } )
        .then( resp => {
          if ( !resp ) return;
          const ancestralParentId = resp.parentId;
          if ( !ancestralParentId ) return;
          const phone = resp.phone;
          const total = resp.balance;
          creditSms( res, phone, 50, total );
          const earning = { amount: 15 };
          User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +15, networks: +1 }, $push: { earnings: earning } }, { new: true } )
            .then( response => {
              if ( !response ) return;
              const forthParentId = response._id;
              const phone = response.phone;
              const balance = response.balance;
              creditSms( res, phone, 15, balance );
              const forthEarning = 8;
              User.findByIdAndUpdate( { _id: forthParentId }, { $inc: { balance: +8, networks: +1 }, $push: { earnings: forthEarning } }, { new: true } )
                .then( result => {
                  if ( !result ) return;
                  const id = result._id;
                  const contact = result.phone;
                  const bal = result.balance;
                  creditSms( res, contact, 8, bal );
                  const fifthEarning = 4;
                  User.findByIdAndUpdate( { _id: id }, { $inc: { balance: +4, networks: +1 }, $push: { earnings: fifthEarning } }, { new: true } )
                    .then( respo => {
                      if ( !respo ) return;
                      const ph = respo.phone;
                      const ba = respo.balance;
                      creditSms( res, ph, 4, ba );
                  })
              })
            } )
        } )
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}              