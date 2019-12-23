const { Loan } = require( "../models/loan" );
const { User } = require( "../models/user" );
const moment = require( "moment" );

/**
 * Handles money rain request
 */
exports.loanRequest = ( req, res ) => {
  const { userId } = req.params;
  // const { _id } = req.user;
  const { requestedAmount } = req.body;
  if ( !userId ) return res.status( 400 ).json( { error: "" } );
  // if ( !_id ) return res.status( 400 ).json( { error: "You have to login to access this operation" } );
  // if ( userId !== _id ) return res.status( 400 ).json( { error: "You cannot access this operation" } );
  let amount;
  User.findById( { _id: userId } )
    .then( resp => {

      if ( !resp ) return res.status( 400 ).json( { error: "Loan request failed. Try again" } );
      
      if ( resp.loanPaid === false ) return res.status( 400 ).json( { error: "You have an outstanding loan to pay" } );
      if ( resp.loanRequestCount === 0 && resp.networks >= 0 ) {
        amount = 5000;
      } else if ( resp.loanRequestCount === 1 && resp.networks >= 1 ) {
        amount = 100000;
      } else if ( resp.loanRequestCount === 2 && resp.networks >= 31000 ) {
        amount = 250000;
      } else if ( resp.loanRequestCount === 3 && resp.networks >= 136000 ) {
        amount = 500000;
      } else {
        return res.status(400).json({ error: `NGN${requestedAmount} is more than your accessible loan`})
      }
      if ( Number(requestedAmount) > amount ) return res.status( 400 ).json( { error: `You don't have access to NGN${ requestedAmount } yet.` } );
      
      const future = moment().add( 14, "days" );
      const formattedExp = future.toISOString().split( "T" )[ 0 ];
      let newLoan = new Loan( {
        userId: userId,
        amount: requestedAmount,
        expiryDate: formattedExp
      } )
      return newLoan.save()
        .then( loan => {
          if ( !loan ) return res.status( 400 ).json( { error: "Request failed. Refresh the page and try again." } );
          const toNumber = Number( requestedAmount );
          User.findByIdAndUpdate( { _id: userId }, { $inc: { loanRequestCount: +1 }, $set: { loanPaid: false} }, { new: true } )
            .then( result => {
              if ( !result ) return res.status( 400 ).json( { error: "Request failed due to unknown error" } );
              res.json( result );
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
  const { _id } = req.user;
  if ( !userId || !role ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "You did not log in correctly" } );
  if ( role !== "admin" && role !== "support" ) return res.status( 400 ).json( { error: "Only admin and support can see loan requrests" } );
  Loan.find( {} )
    .populate( "userId", "name email phone _id" )
    .select()
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
  if ( !role || !userId ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  if ( role !== "admin" && role !== "agent" && role !== "support" ) return res.status( 400 ).json( { error: "Unauthorized access" } );
  Loan.find( { userId: userId } )
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
  
  const accountId = process.env.ACCOUNT_ID;
  const intAmount = Number( amount );
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user" } );
  if ( !_id ) return res.status( 400 ).json( { error: "You are not properly logged in" } );
  if ( userId !== _id ) return res.status( { error: "You do not have the right access" } );
  User.findByIdAndUpdate( { _id: userId }, { $inc: { balance: -intAmount }, $set: { loanPaid: true} }, { new: true } )
    .then( result => {
      if ( !result ) return res.status( 400 ).json( { error: "We could not process your request. Try again" } );
      User.findByIdAndUpdate( { _id: accountId }, { $inc: { balance: +intAmount } }, { new: true } )
        .then( d => {
          if ( !d ) return res.status( 400 ).json( { error: "We could not create system account. Please try again" } );
          Loan.findById( { _id: loanId } )
            .then( loan => {
              if ( !loan ) return res.status( 400 ).json( { error: "Loan not found" } );
              if ( loan.amount > amount ) return res.status( 400 ).json( { error: `Amount ${ amount } is less than ${ loan.amount } owed` } );
              Loan.findByIdAndUpdate( { _id: loanId }, { $set: { paid: true } }, { new: true } )
                .then( resp => {
                  if ( !resp ) return res.status( 400 ).json( { error: "Could not update loan data" } );
                  res.json( resp );
                } );
            })
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}
