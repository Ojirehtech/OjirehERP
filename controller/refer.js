const { User } = require( "../models/user" );
require( "dotenv" ).config();

/**
 * Refers 
 */
exports.refer = ( req, res ) => {
  const { userId } = req.params;

  if ( !req.cookie.refererId ) {
    User.findOne( { _id: userId } )
      .then( user => {
        if ( !user ) return res.status( 400 ).json( { error: `Referer with the ID ${ userId } not found` } )
        res.cookie( "refererId", userId )
        res.redirect( process.env.FRONTEND_APP_URL )
      } )
      .catch( err => {
        res.status( 400 ).json( { error: err.message } );
      } );
  }
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
  const { parentId } = req.params;

  if ( !parentId ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  User.findByIdAndUpdate( { _id: parentId }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
      const grandParentId = user.parentId;
      User.findByIdAndUpdate( { _id: grandParentId }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          if ( !resp ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } )
          const ancestralParentId = resp.parentId;
          User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              if ( !response ) return res.status( 400 ).json( { error: "No parent ID found for this agent" } );
            } )
        } )
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}