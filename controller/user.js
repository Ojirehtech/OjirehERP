const { User } = require( "../models/user" );
const bcrypt = require( "bcrypt" );
const winston = require( "winston" );
const fs = require( "fs" );
const fetch = require( "node-fetch" );
require( "dotenv" ).config();

/**
 * User account signup
 */
exports.signup = ( req, res ) => {
  const {
    email,
    phone,
    name,
    refererPhone,
    address
  } = req.body;
  
  if ( !phone ) return res.status( 400 ).json( { error: "Phone number is missing" } );
  if ( !name ) return res.status( 400 ).json( { error: "Your first name is required" } );
  if ( !address ) return res.status( 400 ).json( { error: "Your last name is required" } );
  if (!refererPhone) return res.status(400).json({ error: "Your referer phone number is required"});

  User.findOne( { phone } )
    .then( user => {
      if ( user ) return res.status( 400 ).json( { error: `The phone number ${ phone } has been used by someone else` } );
      let newUser = new User( {
        email,
        name,
        phone,
        refererPhone,
        address
      } )

      newUser.save();
      const token = newUser.generateToken();
      res.header( "x-auth-token", token ).json( newUser );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Generate OTP code for users
 */
exports.generateOTP = ( req, res ) => {
  const otpCode = Math.floor( 1000 + Math.random() * 9000 );
  const { userId } = req.params;
  console.log(userId)
  const sender = "OjirehPrime";
  const username = "onoja";
  const password = "igochemat7@@"
  const message = `Your verification pass code is ${otpCode}`
  console.log(otpCode, " otpcode")
  // const url = `https://kullsms.com/customer/api/?username=${username}&password=${password}&message=${message}&sender=${sender}&mobiles=${userId}`
  const url = `http://www.jamasms.com/smsapi/?username=${username}&password=${password}&sender=${sender}&numbers=${userId}&message=${message}
`
  if ( !userId ) return res.status( 400 ).json( { error: "Your phone is required" } );
  User.findOneAndUpdate( { phone: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User with the phone number ${ userId } does not exist` } );
      user.otp = otpCode;
      user.save();
      console.log(user)
      fetch( url, {
        method: "POST",
        headers: {
          "Content-Type": "text/html"
        }
      } )
        .then( resp => {
          return res.json( resp );
        } )
        .catch( err => {
          res.status( 400 ).json( { error: err.message } );
        } );
  })
}

/**
 * User account login 
 */
exports.signIn = ( req, res ) => {
  const { otp } = req.body;

  if ( !otp ) return res.status( 400 ).json( { error: "Enter your phone number" } );
  // const refererId = req.cookie.refererId ? req.cookie.refererId : "8jdu493029492jjdsh3";
  User.findOne( { otp } )
    .then( user => {
      if ( user.otp !== otp ) return res.status( 400 ).json( { error: `Verification failed. Invalid code` } );
      /**
       * We get the user token @user.generatetoken() send it with the json response
       */
      const token = user.generateToken();
      const { _id, email, name, cardBought, parentId, role, profileUpdated } = user;
      const refererLink = `http://localhost:3030/api/v1/ojirehprime/agent/${ _id }`;
      res.cookie( "token", token, { expire: new Date() + 9999 } );
      res.json( {
        token,
        user: { _id, email, cardBought, parentId, role, name, refererLink, profileUpdated }
      } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * User account signout
 */
exports.signout = ( req, res ) => {
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
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User does not exist` } );
      return res.json( user );
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
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user ID. Please login to update your profile" } );
  const {
    firstName,
    lastName,
    street,
    city,
    state,
    phone,
    refererPhone
  } = req.body;
  // const { refererId } = req.cookie;
  if ( !userId ) return res.status( 400 ).json( { error: "User ID is required for this operation" } );
  User.findByIdAndUpdate( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `User with ID ${userId} not found` } );
      if ( firstName ) user.firstName = firstName;
      if ( lastName ) user.lastName = lastName;
      if ( street ) user.address.street = street;
      if ( city ) user.address.city = city;
      if ( state ) user.address.state = state;
      if ( phone ) user.phone = phone;
      if ( refererPhone ) user.referPhone = refererPhone;
      // if ( refererId ) user.parentId = refererId;
      user.save();
      User.findByIdAndUpdate( { _id: userId }, { $set: { profileUpdated: true } }, { new: true } )
        .then( resp => {
          console.log( resp )
          res.json( resp );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Gets the profile photo of an agent
 */
exports.photo = ( req, res, next ) => {
  const { userId } = req.params;

  User.findById( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User not found" } );
      res.set( "Content-Type", user.photo.ContentType );
      return res.send( user.photo.data );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } )
}

/**
 * Uploads profile photos
 */
exports.uploadPhoto = ( req, res ) => {
  const { userId } = req.params;
  // Assigned the path to a new constant @photo
  const photo = req.file.path;
  User.findByIdAndUpdate( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User does not exist" } );
      user.photo.data = fs.readFileSync( req.file.path );
      user.photo.contentType = "image/jpg";
      user.save();
      res.json( user );
    } )
    .catch( err => {
      res.json( { error: err.message } );
    } );
}


/**
 * This api confirms that the user has bought a card
 */
exports.cardBought = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "Unknown user" } );
  User.findByIdAndUpdate( { _id: userId }, { $set: { cardBought: true } }, { new: true } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User not found" } );
      res.json( user )
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