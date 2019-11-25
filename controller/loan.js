const Loan = require( "../models/loan" );

/**
 * Handles money rain request
 */
exports.withdrawMoneyRain = ( req, res ) => {
  const { userId, phone } = req.params;
  const { _id } = req.user;
  if ( !userId ) return res.status( 400 ).json( { error: "" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You have to login to access this operation" } );
  if ( !phone ) return res.status( 400 ).json( { error: "You are not a valid Ojirehprime card user" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "You cannot access this operation" } );
  const loan = { amount };
  User.findByIdAndUpdate( { _id: userId } )
    .then( resp => {
      if ( !resp ) return res.status( 400 ).json( { error: "Loan request failed. Try again" } );
      const 
      res.json( resp );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}