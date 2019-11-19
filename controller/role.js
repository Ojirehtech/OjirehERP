const { User } = require( "../models/user" );

/**
 * We are assigning admin role to a user
 */
exports.createRole = ( req, res ) => {
  const { userId, adminId, role } = req.params;
  const { user: { _id} } = req;
  // we checked for the admin ID and the user ID
  if ( !userId || !adminId ) return res.status( 400 ).json( { error: "The admin and user ID are required" } );
  // We checked if the user assigning the role has the role of an admin
  if ( _id !== adminId) return res.status( 400 ).json( { error: "Only admin can assign roles to users" } );
  // We find the user with the given user ID and update the role to the role of an admin
  User.findByIdAndUpdate( { _id: userId }, { $set: { role: role } }, { new: true } )
    .then( resp => {
      if ( !resp ) return res.status( 400 ).json( { error: "Operation failed. Could not assign new role try again" } );
      res.json( resp );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}