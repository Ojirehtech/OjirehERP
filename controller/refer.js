const { User } = require( "../models/user" );
const { smsalert } = require("../service/sms")
require( "dotenv" ).config();

/**
 * Refers 
 */
exports.refer = ( req, res ) => {
  const { userId } = req.params;
  var date = new Date();
  date.setMinutes( date.getMinutes() + 5 );
  console.log(date)
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
 * updating parentId field of the agent
 */
exports.updateParentId = ( req, res ) => {
  const { userId, refererPhone } = req.params;
  
  if ( !userId || refererPhone ) return res.status( 400 ).json( { error: "Unknow user" } );

  User.findByIdAndUpdate({ _id: userId })
    .then( resp => {
      if ( !resp ) return res.status( 400 ).json( { error: "Could not update parent ID. Try again" } )
      if ( !resp.parentId ) {
        User.findOne( { phone: refererPhone } )
          .then( user => {
            resp.parentId = user._id;
            resp.save();
            return res.json( resp );
          } );
      }
    
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
} 

/**
 * Referers settlement
*/
exports.refererSettlement = ( req, res ) => {
  const { refererPhone } = req.params;
  const { refererId } = req.cookies;
  console.log("the entry point")
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
  User.findByIdAndUpdate( { _id: refererId }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      // if ( !user ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
      const phone = user.phone;
      smsalert( res, phone, 200 );
      const grandReferer = user.refererId;
      console.log("this. the first user to get reward")
      User.findOneAndUpdate( { _id: grandReferer }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          // if ( !resp ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
          const ancestralReferer = resp.refererId;
          const phone = resp.phone;
          smsalert( res, phone, 50 );
          console.log(resp, " this is resp")
          User.findOneAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              const phone = response.phone;
              smsalert( res, phone, 8 );
              console.log(response, "")
              // if ( !response ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
            } )
        } )
      console.log(user, " user with the reward")
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}