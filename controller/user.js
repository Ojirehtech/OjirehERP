const { User } = require( "../models/user" );
const bcrypt = require( "bcrypt" );
const winston = require( "winston" );
require( "dotenv" ).config();

/**
 * User account signup
 */
exports.signup = ( req, res ) => {
  const { email, password, username } = req.body;
  if ( !email ) return res.status( 400 ).json( {
    error: "No email provided. Your email is required"
  } );

  if ( !password ) return res.status( 400 ).json( { error: "Password must be provided to continue" } );

  User.findOne( { email } )
    .then( user => {
      if ( user ) return res.status( 400 ).json( { error: `User with the email ${email} already exists` } );
      return bcrypt.hash( password, 12 )
        .then( hashedPassword => {
          if ( !hashedPassword ) return res.status( 400 ).json( { error: "Password hashing failed. Please try signup again" } );
          let newUser = new User( {
            email,
            password: hashedPassword,
            username
          } )

          newUser.save();
          const token = newUser.generateToken();
          res.header( "x-auth-token", token ).json( newUser );
        } )
        .catch( err => {
          res.status( 400 ).json( { error: err.message } );
        } );
    } );
}

/**
 * User account login 
 */
exports.signIn = ( req, res ) => {
  const { email, password } = req.body;
  if ( !email ) return res.status( 400 ).json( { error: "No email provided. Your email is required for login" } );

  if ( !password ) return res.status( 400 ).json( { error: "Password must be provided to login" } );
  User.findOne( { email } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User with the email ${ email } does not exist` } );
      return bcrypt.compare( password, user.password )
        .then( passwordMatch => {
          if ( !passwordMatch ) return res.status( 400 ).json( { error: "Invalid emal or password" } );
          /**
           * We get the user token @user.generatetoken() send it with the json response
           */
          const token = user.generateToken();
          const { _id, email, firstName, lastName, userType, role } = user;
          const refererLink = `http://localhost:3030/api/v1/ojirehprime/agent/${_id}`
          res.cookie( "token", token, { expire: new Date() + 9999 } );
          // We respond 
          res.json( { token, user: { _id, email, userType, role, firstName, lastName, refererLink } } );
        } )
        .catch( err => {
          res.status( 400 ).json( { error: err.message } );
        } );
    } );
}

/**
 * User account signout
 */
exports.Signout = ( req, res ) => {
  res.clearCookie( "token" );
  res.json( "You have successfully been logged out" );
}

/**
 * gets all users
 */
exports.fetchUsers = ( req, res ) => {
  User.find( {} )
    .then( users => {
      if ( !users ) return res.status( 400 ).json( { error: "User record is empty" } );
      res.json( users )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * gets single user with @param {userId} userId of the user
 */
exports.fetchUser = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "The user ID is required for you to get this user" } );
  User.findById( { _id: userId } )
    .select("firstName lastName email refererId phone balance useraname address -password")
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User does not exist` } );
      return res.json( user )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Updates user information
 */
exports.updateUserInfo = ( req, res ) => {
  const { userId } = req.params;
  const {
    firstName,
    lastName,
    street,
    city,
    state,
    phone,
    referPhone
  } = req.body;
  const { refererId } = req.cookie;
  if ( !userId ) return res.status( 400 ).json( { error: "User ID is required for this operation" } );
  User.findByIdAndUpdate( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User not found` } );
      if ( firstName ) user.firstName = firstName;
      if ( lastName ) user.lastName = lastName;
      if ( street ) user.address.street = street;
      if ( city ) user.address.city = city;
      if ( state ) user.address.state = state;
      if ( phone ) user.phone = phone;
      if ( referPhone ) user.referPhone = referPhone;
      user.parentId = parentId;

      user.save();
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Deletes user account
 */
exports.deleteUser = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "You must provide the user ID" } );

  User.findByIdAndDelete( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "Operation failed. Please try again" } );
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}