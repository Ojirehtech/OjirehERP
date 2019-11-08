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
  const { userId, role } = req.params;
  const { refererId } = req.cookie;
  if ( !userId ) return res.status( 400 ).json( { error: "Unknow user" } );
  if ( role !== "agent" ) return res.status( 400 ).json( { error: "Only agents are allowed this operation" } );

  User.findByIdAndUpdate( { _id: userId }, { $set: { parentId: refererId } }, { new: true } )
    .then( resp => {
      if ( !resp ) return res.status( 400 ).json( { error: "Could not update parent ID. Try again" } )
      res.json( resp );
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
  
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
  User.findByIdAndUpdate( { _id: refererId }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
      const phone = user.phone;
      smsalert(phone, 200)
      const grandReferer = user.refererId;
      User.findOneAndUpdate( { _id: directReferer }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          if ( !resp ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
          const ancestralReferer = resp.refererId;
          const phone = resp.phone;
          smsalert( phone, 50 );
          User.findOneAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              const phone = response.phone;
              smsalert( phone, 8 );
              if ( !response ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
            } )
        } )
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}