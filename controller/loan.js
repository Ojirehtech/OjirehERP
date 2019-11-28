const { Loan } = require( "../models/loan" );
const { User } = require( "../models/user" );

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
        amount = 500000;
      } else {
        return;
      }

      if ( Number(requestedAmount) > amount ) return res.status( 400 ).json( { error: `You don't have access to NGN${ requestedAmount } yet.` } );
      
      let newLoan = new Loan( {
        userId: _id,
        amount: requestedAmount
      } )
      return newLoan.save()
        .then( loan => {
          if ( !loan ) return res.status( 400 ).json( { error: "Request failed. Refresh the page and try again." } );
          user.findByIdAndUpdate( { _id: userId }, { $inc: { loanRequestCount: +1 } }, { new: true } )
            .then( result => {
              if ( !result ) return res.status( 400 ).json( { error: "Request failed due to unknown error" } );
              // res.json( result );
              console.log( result )
            } );
          res.json( loan );
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
  if ( role !== "admin" || role !== "support" ) return res.status( 400 ).json( { error: "Only admin and support can see loan requrests" } );
  Loan.find( {} )
    .populate("userId", "name email phone _id")
    .then( loans => {
      if ( !loans ) return res.status( 400 ).json( { error: "Loan record is empty" } );
      res.json( loans );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * fetches single loan with the userId
 */
exports.loanByUser = ( req, res ) => {
  const { role, userId } = req.params;
  const { _id } = req.user;
  if ( !role || !userId ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You're not properly logged in" } );
  if ( role !== "admin" || role !== "agent" || role !== "support" ) return res.status( 400 ).json( { error: "Only admin, support and agents can access this operation" } );

  Loan.find( { userId: userId } )
    .sort( "createdAt", -1 )
    .then( loan => {
      if ( !loan ) return res.status( 400 ).json( { error: "Can not find loan for this agent" } );
      res.json( loan );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Pays back loan
 */
exports.repayLoan = ( req, res ) => {
  const { userId, loanId } = req.params;
  const { _id } = req.user;
  const { amount } = req.body;
  const intAmount = Number( amount );
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You are not properly logged in" } );
  if ( userId !== _id ) return res.status( { error: "You do not have the right access" } );
  User.findByIdAndUpdate( { _id: userId }, { $inc: { balance: -intAmount } }, { new: true } )
    .then( result => {
      if ( !result ) return res.status( 400 ).json( { error: "We could not process your request. Try again" } );
      User.findByIdAndUpdate( { _id: userId }, { $inc: { balance: +intAmount } }, { new: true } )
        .then( d => {
          if ( !d ) return res.status( 400 ).json( { error: "We could not create system account. Please try again" } );
          Loan.findByIdAndUpdate( { _id: loanId }, { $set: { paid: true } }{ _id: userId }, { $inc: { balance: -intAmount } }, { new: true }, { new: true } )
            .then( resp => {
              if ( !resp ) return res.status( 400 ).json( { error: "Could not update loan data" } );
              res.json( resp );
            } );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } ); 
}
