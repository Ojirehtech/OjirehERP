const mongoose = require( "mongoose" );
const winston = require( "winston" );
require( "dotenv" ).config();

let db_url;
const env = process.env.NODE_ENV || 'development';
if ( env === "development" ) {
  db_url = process.env.DEV_DB;
} else {
  db_url = process.env.PROD_DB;
}

module.exports = () => {
  mongoose.Promise = global.Promise;
  mongoose.connect( db_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    poolSize: 5,
    socketTimeoutMS: 45000,
    autoReconnect: true
  } )
    .then( () => {
      console.log( "Connection to database established" );
    } )
    .catch( err => {
      console.log( `Connection failed. ${ err.message }` );
    } );
  
  mongoose.set( "useFindAndModify", false );
  mongoose.set( "useCreateIndex", true );
}