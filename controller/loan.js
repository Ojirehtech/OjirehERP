const Loan = require( "../models/loan" );

/**
 * Handles money rain request
 */
exports.loanRequest = ( req, res ) => {
  const { userId, phone } = req.params;
  const { _id } = req.user;
  if ( !userId ) return res.status( 400 ).json( { error: "" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You have to login to access this operation" } );
  if ( !phone ) return res.status( 400 ).json( { error: "You are not a valid Ojirehprime card user" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "You cannot access this operation" } );
  let amount;
  User.findById( { _id: userId } )
    .then( resp => {

      if ( !resp ) return res.status( 400 ).json( { error: "Loan request failed. Try again" } );
      
      if ( loanPaid === false ) return res.status( 400 ).json( { error: "You have an outstanding loan to pay" } );
      if ( loanRequestCount < 1 && resp.networks >=60) {
        amount = 5000;
      } else if ( loanRequestCount === 1 && resp.networks >= 5111) {
        amount = 100000;
      }

      const loan = { amount };
      user.findByIdAndUpdate({ _id: userId}, {$push: {loan: loan}, $set: { loanPaid: true }, $inc: { loanRequestCount: +1}}})
      res.json( resp );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}