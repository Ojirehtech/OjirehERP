const { User } = require( "../models/user" );
const { debitSms, creditSms } = require( "../service/sms" );
const { makeTransfer } = require( "./transfer" );

/**
 * Handles withdrawal requests from agent
 */
exports.withdrawalRequest = ( req, res ) => {
  const { userId, role } = req.params;
  const { amount, balance, name } = req.body;  
  const { _id } = req.user;

  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user. Please ensure you are an agent" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "Unauthorized user access" } );
  if ( role !== "agent" ) return res.status( 400 ).json( { error: "Only agents are allowed to request for fund withdrawal" } );

  const time = new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
  const date = new Date().getMonth() + 1 + "/" + new Date().getDate() + "/" + new Date().getFullYear();
  const request = {
    name: name,
    balance: Number(balance),
    amount: Number(amount),
    date: date,
    time: time,
    status: false
  }

  /**
   * We find the agent with the given userId @param {userId}
   */

  User.findById( { _id: userId } )
    .then( agent => {
      if ( !agent ) return res.status( 400 ).json( { error: `Agent with the ID ${ userId } not found.` } )
      if ( agent.balance < amount ) return res.status( 400 ).json( { error: `${ amount } is greater than your available balance of ${ agent.balance }. Please consider withdrawing a lower amount or an equivalent of your balance.` } );
      if ( amount < 1000 ) return res.status( 400 ).json( { error: `The amount ${ amount } you request is too low. Consider withdrawing 1000 naira and above` } );
      User.findByIdAndUpdate( { _id: userId }, { $push: { request: request } }, { new: true } )
        .then( resp => {
          if ( !resp ) return res.status( 400 ).json( { error: "Request did not succeed please try again." } );
          res.json( resp );
        } )
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}

/**
 * handles withdrawal requests approvals by the admin
 */

exports.requestApproval = ( req, res ) => {
  const { userId, agentId, requestId, role } = req.params;
  // const { _id } = req.user;
  const { amount } = req.body;
  if ( amount < 1000 ) return res.status( 400 ).json( { error: "You can not approve request with amount less then 1000" } );
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user. Please ensure you are an agent" } );
  if ( !requestId ) return res.status( 400 ).json( { error: "Unknown request. Make sure you have the right access to approve requests" } );
  // if ( userId !== _id ) return res.status( 400 ).json( { error: "Unauthorized user access" } );
  if ( role !== "admin" ) return res.status( 400 ).json( { error: "Only an admin can approve fund withdrawal requests" } );
  if ( !agentId ) return res.status( 400 ).json( { error: "User ID must be provided to approve this request" } );

  User.findByIdAndUpdate( { _id: agentId } )
    .then( user => {
      user.balance -= amount;
      const requests = user.request;
      requests.forEach( request => {
        if ( request.status === false ) {
          request.status = true
        }
      } );
      
      user.save();
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
  // console.log(req.params, ' this is req.params')
  // const { userId } = req.params;
  console.log(amount, phone, sender, userId)

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