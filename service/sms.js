const fetch = require( "node-fetch" );

/**
 * Sends credit alert message to the credited user
 */
exports.creditSms = (res, phone, amount, balance ) => {
  const message = `Your OjirehPrime account has been credited with NGN${ amount }. Bal: NGN${balance}`;
  const sender = "OjirePrime";
  const url = `http://www.jamasms.com/smsapi/?username=${ process.env.SMS_USERNAME }&password=${ process.env.SMS_PASS }&sender=${ sender }&numbers=${ phone }&message=${ message }`;

  fetch( url, {
    method: "POST",
    "Content-Type": "text/html"
  } )
    .then( resp => {
      // console.log( resp );
    } )
    .catch( err => {
      // res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Sends debit alert message to the debited user
 */
exports.debitSms = ( res, phone, amount, balance ) => {
  const message = `NGN${amount} has been debited from your Ojirehprime account. Bal: NGN${ balance }`;
  const sender = "OjirePrime";
  const url = `http://www.jamasms.com/smsapi/?username=${ process.env.SMS_USERNAME }&password=${ process.env.SMS_PASS }&sender=${ sender }&numbers=${ phone }&message=${ message }`;

  fetch( url, {
    method: "POST",
    "Content-Type": "text/html"
  } )
    .then( resp => {
      // console.log( resp );
    } )
    .catch( err => {
      // res.status( 400 ).json( { error: err.message } );
    } );
}