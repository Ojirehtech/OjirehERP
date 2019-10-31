const { User } = require( "../models/user" );

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