const { Transfer } = require( "../models/transfer" );
const { User } = require( "../models/user" );
const { debitSms, creditSms } = require( "../service/sms" );

/**
 * Creating a transfer transaction.
 * This api must not be called by any route
 */
exports.makeTransfer = ( req, res ) => {
  const { phone, userId, sender, amount, cardNo} = req.body;
  console.log( phone, userId, sender, amount, " from transfer controller" );  
  if ( !sender ) return res.status( 400 ).json( { error: "Reciever name is not provided" } );
  if ( !amount ) return res.status( 400 ).json( { error: "Amount is missing" } );
  if ( !phone ) return res.status( 400 ).json( { error: "Reciever phone number is required" } );
  if ( !cardNo ) return res.status( 400 ).json( { error: "Receiver's card number is required" } );
  User.findOne( { phone: phone } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User with phone number ${ phone } does not have OjirehPrime card` } );
      let transfer = new Transfer( {
        sender: userId,
        receiver: user.name,
        receiverPhone: phone,
        cardNo,
        amount
      } );

      transfer.save()
        .then( response => {
          res.json( response );
        } )
        .catch( err => {
          res.status( 400 ).json( { error: err.messageg } );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Fetches all transfer transactions
 */
exports.getTransfers = ( req, res ) => {
  Transfer.find( {} )
    .populate("sender", "name _id email phone")
    .then( transfers => {
      if ( !transfers ) return res.status( 400 ).json( { error: "Transfer record is empty" } );
      res.json( transfers );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * GET ALL TRANSFER REQUEST BY A USER
 */
exports.getTransferByUser = ( req, res ) => {
  const { userId } = req.params;
  const { _id } = req.user;
  if ( !userId ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  if ( !_id ) return res.status( 400 ).json( { error: "Unauthorized access" } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "Unknown user" } );
  Transfer.find( { sender: userId } )
    .populate("sender", "name")
    .then( result => {
      if ( !result ) return res.status( 400 ).json( { error: "No transfer request found for you" } );
      res.json( result );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Finalize pending transfer transactions
 */
exports.approveTransfer = ( req, res ) => {
  const { transferId, role } = req.params;
  if ( !transferId ) return res.status( 400 ).json( { error: "Unknow transaction ID" } );
  
  if ( !role ) return res.status( 400 ).json( { error: "Invalid parameter" } );
  if ( role !== "admin" && role !== "support" ) return res.status( 400 ).json( { error: "Only admin and support persons can approve transfer request" } );
  const { amount, receiverPhone, senderId } = req.body;

  if ( !amount ) return res.status( 400 ).json( { error: "Amount to transfer is not specified" } );
  if ( !receiverPhone ) return res.status( 400 ).json( { error: "Enter the phone number of the reciever" } );
  if ( !senderId ) return res.status( 400 ).json( { error: "invalid request parameters" } );
  User.findById( { _id: senderId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "You do not have Ojirehprime card" } );
      if ( amount > user.balance ) return res.status( 400 ).json( { error: "Request failed. Insufficient balance" } );
      User.findOne( { phone: receiverPhone } )
        .then( reciever => {
          if ( !reciever ) return res.status( 400 ).json( {
            error: `The user with the phone number ${ receiverPhone } does not have Ojirehprime card`
          } );
          const recieverName = reciever.name;
          User.findByIdAndUpdate( { _id: senderId }, { $inc: { balance: -amount } }, { new: true } )
            .then( response => {
              const alertNum = response.phone;
              const bal = response.balance;
              debitSms( res, alertNum, amount, bal );
              User.findOneAndUpdate( { phone: receiverPhone }, { $inc: { balance: +amount } }, { new: true } )
                .then( credit => {
                  const creditNum = credit.phone;
                  const balance = credit.balance;
                  creditSms( res, creditNum, amount, balance );
                  Transfer.findByIdAndUpdate( { _id: transferId }, { $set: { status: true } }, { new: true } )
                    .then( trans => {
                      if ( !trans ) return res.status( 400 ).json( { error: "Could not finalize this transaction. Please try again" } );
                      res.json( {message: "Transfer success"} );
                    } )
                } )
            } );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

