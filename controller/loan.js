const Loan = require( "../models/loan" );

/**
 * Handles money rain request
 */
exports.loanRequest = ( req, res ) => {
  const { userId, phone } = req.params;
  const { _id } = req.user;
  const { requestedAmount } = req.body;
  if ( !userId ) return res.status( 400 ).json( { error: "" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You have to login to access this operation" } );
  if ( !phone ) return res.status( 400 ).json( { error: "You are not a valid Ojirehprime card user" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "You cannot access this operation" } );
  let amount;
  User.findById( { _id: userId } )
    .then( resp => {

      if ( !resp ) return res.status( 400 ).json( { error: "Loan request failed. Try again" } );
      
      if ( loanPaid === false ) return res.status( 400 ).json( { error: "You have an outstanding loan to pay" } );
      if ( loanRequestCount === 0 && resp.networks >= 60 ) {
        amount = 5000;
      } else if ( loanRequestCount === 1 && resp.networks >= 5111 ) {
        amount = 100000;
      } else if ( loanRequest === 2 && resp.networks >= 31000 ) {
        amount = 250000;
      } else if ( loanRequest === 3 && resp.networks >= 136000 ) {
        amount = 500000
      } else {
        return;
      }

      if ( Number(requestedAmount) > amount ) return res.status( 400 ).json( { error: `You don't have access to NGN${ requestedAmount } yet.` } );
      
      user.findByIdAndUpdate( { _id: userId }, { $push: { loan: Number(requestedAmount) }, $inc: { loanRequestCount: +1 } }, { new: true } )
        .then( result => {
          if ( !result ) return res.status( 400 ).json( { error: "Request failed due to unknown error" } );
          res.json( result );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
} 

/**
 * Fetch all loan
 */
exports.allLoan = ( req, res ) => {
  const { userId, role } = req.params;
  const const { _id } = req.user;

  if ( !userId || !role ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "You did not log in correctly" } );

  Loan.find( {} )
    .then( loans => {
      if ( !loans ) return res.status( 400 ).json( { error: "Loan record is empty" } );
      res.json( loans );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Pays back loan
 */
exports.repayLoan = ( req, res ) => {
  const { userId } = req.params;
  const { _id } = req.user;

  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You are not properly logged in" } );
  if ( userId !== _id ) return res.status( { error: "You do not have the right access" } );
  userId.findByIdAndUpdate({ _id: userId}, { $inc: { balance: }})
}