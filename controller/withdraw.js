const { User } = require( "../models/user" );
const { debitSms, creditSms } = require( "../service/sms" );
const { makeTransfer } = require( "./transfer" );
const { Withdraw } = require( "../models/withdraw" );

/**
 * Handles withdrawal requests from agent
 */
exports.withdrawalRequest = ( req, res ) => {
  const { userId, role } = req.params;
  const { amount } = req.body;  
  // const { _id } = req.user;

  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user. Please ensure you are an agent" } );
 
  /**
   * We find the agent with the given userId @param {userId}
   */
  User.findById( { _id: userId } )
    .then( agent => {
      if ( !agent ) return res.status( 400 ).json( { error: `Agent with the ID ${ userId } not found.` } )
      if ( agent.balance < amount ) return res.status( 400 ).json( { error: `${ amount } is greater than your available balance of ${ agent.balance }. Please consider withdrawing a lower amount or an equivalent of your balance.` } );
      if ( amount < 2000 ) return res.status( 400 ).json( { error: `The amount NGN${ amount } you request is too low` } );
      const balance = agent.balance;
      let newWithdraw = new Withdraw( {
        userId,
        amount,
        balance
      } )
      newWithdraw.save();
      res.json( newWithdraw );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * Gets all list of requests
*/
exports.getWithdrawalRequests = ( req, res ) => {
  const { userId, role } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "Invalid parameter" } );
  if ( !role ) return res.status( 400 ).json( { error: "User role is not known" } );
  if ( role !== "admin" ) return res.status( 400 ).json( { error: "Only admin can access this information" } );
  console.log( "this is the request with modification" );
  Withdraw.find( {} )
    .populate("userId", "name")
    .then( withdraw => {
      if ( !withdraw ) return res.status( 400 ).json( { error: "Request list is empty" } );
      res.json( withdraw );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * Gets request for a user with the user ID
*/
exports.getWithdrawalRequest = ( req, res ) => {
  const { userId, } = req.params;

  Withdraw.find( { userId: userId} )
    .populate( "userId", "name" )
    .then( withdraw => {
      if ( !withdraw ) return res.status( 400 ).json( { error: "Request list is empty" } );
      res.json( withdraw );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * handles withdrawal requests approvals by the admin
 */
exports.requestApproval = ( req, res ) => {
  const { userId, agentId, requestId } = req.params;
  const { amount } = req.body;
  if ( amount < 2000 ) return res.status( 400 ).json( { error: "You can not approve request with amount less than 2000" } );
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user. Please ensure you are an agent" } );
  if ( !requestId ) return res.status( 400 ).json( { error: "Unknown request. Make sure you have the right access to approve requests" } );
  if ( !agentId ) return res.status( 400 ).json( { error: "User ID must be provided to approve this request" } );
  const amt = Number( amount );
  User.findByIdAndUpdate( { _id: agentId }, {$inc: { balance: -amt}}, { new: true} )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "Failed to debit user" } );
      Withdraw.findByIdAndUpdate( { _id: requestId }, { $set: { status: true } }, { new: true } )
        .then( withdraw => {
          if ( !withdraw ) return res.status( 400 ).json( { error: "Request approval failed. Try again" } );
          debitSms(res,)
        } );
      
      return res.json(user)
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}


