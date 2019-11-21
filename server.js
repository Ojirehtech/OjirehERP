const express = require( "express" );
const bodyParser = require( "body-parser" );
const winston = require( "winston" );
const db = require( "./config/db" );
const morgan = require( "morgan" );
const path = require( "path" );
const cookieParser = require( "cookie-parser" );
const app = express();

const port = process.env.PORT || 3031;

/**
 * Connection to the database
 */
db();
app.use( express.static( __dirname ) );
app.use( express.static( path.join( __dirname, 'client/build' ) ) );
app.use( morgan( "dev" ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( cookieParser() );

//==================================================
// Setting up Cross Origin Resource Sharing
//==================================================
app.use( ( req, res, next ) => {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Credentials", true );
  res.header( "Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH" );
  res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token' );

  next();
} );

/**
 * call to error logger
 */
require( "./config/error-logger" )();

/**
 * connection to custom routes
 */
require( "./middleware/routes" )( app );

app.get( '*', ( req, res ) => {
  res.sendFile( path.join( __dirname + '/client/build/index.html' ) );
} );

app.listen( port, ( err ) => {
  if ( err ) {
    winston.error( err.message );
  }

  winston.info( `Server is up and running on port ${ port }` );
} );