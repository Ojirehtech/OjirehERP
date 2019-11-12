const { Transfer } = require( "../models/transfer" );

/**
 * Creating a transfer transaction.
 * This api must not be called by any route
 */
exports.makeTransfer = ( req, res, sender, reciever, amount, recieverPhone ) => {
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
exports.finalize = ( req, res ) => {
  const { transferId } = req.params;
  if ( !transferId ) return res.status( 400 ).json( { error: "Unknow transaction ID" } );
  Transfer.findByIdAndUpdate( { _id: transferId }, { $set: { status: true } }, { new: true } )
    .then( trans => {
      if ( !trans ) return res.status( 400 ).json( { error: "Could not finalize this transaction. Please try again" } );
      res.json( trans );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}