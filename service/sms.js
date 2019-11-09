const fetch = require( "node-fetch" );

module.exports = (res, phone, amount ) => {
  console.log(res, phone, amount)
  const message = `Your OjirehPrime card has been credited with NGN${ amount }`;
  const sender = "OjirePrime";
  const url = `http://www.jamasms.com/smsapi/?username=${ process.env.SMS_USERNAME }&password=${ process.env.SMS_PASS }&sender=${ sender }&numbers=${ phone }&message=${ message }`;

  fetch( url, {
    method: "POST",
    "Content-Type": "text/html"
  } )
    .then( resp => {
      console.log( resp );
      res.json(resp)
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}