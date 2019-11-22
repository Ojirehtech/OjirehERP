const { User } = require( "../models/user" );
const { debitSms, creditSms } = require( "../service/sms" );
const { makeTransfer } = require( "./transfer" );
const { Request } = require( "../models/request" );

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
      if ( amount < 10 ) return res.status( 400 ).json( { error: `The amount NGN${ amount } you request is too low` } );
      const balance = agent.balance;
      let newRequest = new Request( {
        userId,
        amount,
        balance
      } )
      newRequest.save();
      res.json( newRequest );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * Gets all list of requests
*/
exports.getRequests = ( req, res ) => {
  const { userId, role } = req.params;

  Request.find( {} )
    .populate("userId", "name")
    .then( request => {
      if ( !request ) return res.status( 400 ).json( { error: "Request list is empty" } );
      res.json( request );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * Gets request for a user with the user ID
*/
exports.getRequest = ( req, res ) => {
  const { userId, } = req.params;

  Request.find( { userId: userId} )
    .populate( "userId", "name" )
    .then( request => {
      if ( !request ) return res.status( 400 ).json( { error: "Request list is empty" } );
      res.json( request );
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
  if ( amount < 10 ) return res.status( 400 ).json( { error: "You can not approve request with amount less then 1000" } );
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user. Please ensure you are an agent" } );
  if ( !requestId ) return res.status( 400 ).json( { error: "Unknown request. Make sure you have the right access to approve requests" } );
  if ( !agentId ) return res.status( 400 ).json( { error: "User ID must be provided to approve this request" } );
  const amt = Number( amount );
  User.findByIdAndUpdate( { _id: agentId }, {$inc: { balance: -amt}}, { new: true} )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "Failed to debit user" } );
      Request.findByIdAndUpdate( { _id: requestId }, { $set: { status: true } }, { new: true } )
        .then( request => {
          if ( !request ) return res.status( 400 ).json( { error: "Request approval failed. Try again" } );
          debitSms(res,)
        } );
      
      return res.json(user)
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * handles fund transfer
 */
exports.transferFund = ( req, res ) => {
  const { amount, phone, userId, sender } = req.body;

  if ( !amount ) return res.status( 400 ).json( { error: "Amount to transfer is not specified" } );
  if ( !phone ) return res.status( 400 ).json( { error: "Enter the phone number of the reciever" } );
  if ( !userId ) return res.status( 400 ).json( { error: "invalid request parameters" } );
  User.findById( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "You do not have Ojirehprime card" } );
      if ( amount > user.balance ) return res.status( 400 ).json( { error: "Request failed. Insufficient balance" } );
      User.findOne( { phone: phone } )
        .then( reciever => {
          if ( !reciever ) return res.status( 400 ).json( {
            error: `The user with the phone number ${ phone } does not have Ojirehprime card`
          } );
          console.log(reciever.name, " this is the reciever of the fund")
          const recieverName = reciever.name;
          User.findByIdAndUpdate( { _id: userId }, { $inc: { balance: -amount } }, { new: true } )
            .then( response => {
              const alertNum = response.phone;
              const bal = response.balance;
              debitSms( res, alertNum, amount, bal );
              User.findOneAndUpdate( { phone: phone }, { $inc: { balance: +amount } }, { new: true } )
                .then( credit => {
                  const creditNum = credit.phone;
                  const balance = credit.balance;
                  creditSms( res, creditNum, amount, balance );
                } )
            } );
          return makeTransfer( req, res, userId, recieverName, amount, phone );
        } );
    } )
    .catch( err => {
      console.log(err.message, "error from transaction ")
      res.status( 400 ).json( { error: err.message } );
    } );
}

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
  User.findByIdAndUpdate( { _id: userId }, { $set: { loan: amount }, $inc: { loanRequestCount: +1 } }, { new: true } )
    .then( resp => {
      if ( !resp ) return res.status( 400 ).json( { error: "Loan request failed. Try again" } );
      res.json( resp );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}
