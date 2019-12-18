const { Transfer } = require( "../models/transfer" );

/**
 * Creating a transfer transaction.
 * This api must not be called by any route
 */
exports.makeTransfer = ( req, res ) => {
  const { reciever, recieverPhone, sender, amount,} = req.body;
  console.log( reciever, recieverPhone, sender, amount, " from transfer controller" );  
  if ( !reciever ) return res.status( 400 ).json( { error: "Reciever name is not provided" } );
  if ( !amount ) return res.status( 400 ).json( { error: "Amount is missing" } );
  if ( !recieverPhone ) return res.status( 400 ).json( { error: "Reciever phone number is required" } );
  let transfer = new Transfer( {
    sender,
    reciever,
    recieverPhone,
    amount
  } );

  transfer.save()
    .then( response => {
      res.json( response );
    } )
    .catch( err => {
      console.log(err.message, " error from transfer controller")
      res.status( 400 ).json( { error: err.messageg } );
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
 * Finalize pending transfer transactions
 */
exports.approveTransfer = ( req, res ) => {
  const { transferId, role } = req.params;
  if ( !transferId ) return res.status( 400 ).json( { error: "Unknow transaction ID" } );
  
  if ( !role ) return res.status( 400 ).json( { error: "Invalid parameter" } );
  if ( role !== "admin" && role !== "support" ) return res.status( 400 ).json( { error: "Only admin and support persons can approve transfer request" } );
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
                  Transfer.findByIdAndUpdate( { _id: transferId }, { $set: { status: true } }, { new: true } )
                    .then( trans => {
                      if ( !trans ) return res.status( 400 ).json( { error: "Could not finalize this transaction. Please try again" } );
                      // res.json( trans );
                    } )
                } )
            } );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

