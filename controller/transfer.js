const { Transfer } = require( "../models/transfer" );

/**
 * Creating a transfer transaction
 */
exports.makeTransfer = ( req, res, sender, reciever, amount, recieverPhone ) => {
  if ( !reciever || !amount || recieverPhone ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  let transfer = new Transfer( {
    sender,
    reciever,
    recieverPhone,
    amount
  } );

  transfer.save()
    .then( response => {
      res.json( response )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.messageg } );
    } );
}

/**
 * Fetches all transfer transactions
 */
exports.getTransfers = ( req, res ) => {
  Transfer.find( {} )
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
exports.Finalize = ( req, res ) => {
  const { transactionId } = req.params;

  if ( !transactionId ) return res.status( 400 ).json( { error: "Unknow transaction ID" } );
  Transfer.findByIdAndUpdate( { _id: transactionId }, { $set: { status: true } }, { new: true } )
    .then( trans => {
      if ( !trans ) return res.status( 400 ).json( { error: "Could not finalize this transaction. Please try again" } );
      res.json( trans );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}