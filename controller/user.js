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
  if ( !email ) return res.status( 400 ).json( { error: "Enter your email address" } );
  if ( !phone ) return res.status( 400 ).json( { error: "Phone number is missing" } );
  if ( !name ) return res.status( 400 ).json( { error: "Your first name is required" } );
  if ( !address ) return res.status( 400 ).json( { error: "Your last name is required" } );
  if (!refererPhone) return res.status(400).json({ error: "Your referer phone number is required"});

  User.findOne( { phone: phone } )
    .then( user => {
      if ( user ) return res.status( 400 ).json( { error: `The phone number ${ phone } has been used by another user` } );
      let newUser = new User( req.body )

      newUser.save();
      const token = newUser.generateToken();
      const { _id, email, name, phone, parentId, refererPhone, role, profileUpdated } = newUser;
      const refererLink = `${process.env.API_URL}/ojirehprime/agent/${ _id }`;
      res.cookie( "token", token, { expire: new Date() + 9999 } );
      res.header( "x-auth-token", token ).json( {
        token,
        user: { _id, email, phone, refererPhone, parentId, role, name, refererLink, profileUpdated }});
    } )
    .catch( err => {
      console.log(err.message)
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Generate OTP code for users
 */
exports.generateOTP = ( req, res ) => {
  const otpCode = Math.floor( 1000 + Math.random() * 9000 );
  const { phone } = req.params;
  console.log( phone, " phone number" )

  if ( !phone ) return res.status( 400 ).json( { error: "Your phone number is required" } );
  const sender = "OjirehPrime";
  const message = `Your verification pass code is ${ otpCode }`;
  const url = `http://www.jamasms.com/smsapi/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASS}&sender=${sender}&numbers=${phone}&message=${message}
`
  User.findOne( { phone: phone } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `You do not have Ojirehprime card ${ phone }. Click on Register to buy a card` } );
      
      User.findByIdAndUpdate( { _id: user._id }, { $set: { otp: otpCode } }, { new: true } )
        .then( resp => {
          console.log( resp )
          fetch( url, {
            method: "POST",
            headers: {
              "Content-Type": "text/html"
            }
          } )
            .then( result => {
              res.json( { message: "Success"} );
            } )
            .catch( err => {
              res.status( 400 ).json( { error: err.message } );
            } );
        } );
      
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * User account login 
 */
exports.signIn = ( req, res ) => {
  const { otp } = req.body;

  if ( !otp ) return res.status( 400 ).json( { error: "Enter the OTP code" } );
  User.findOne( { otp } )
    .then( user => {
      if ( user.otp !== otp ) return res.status( 400 ).json( { error: `Verification failed. Invalid code` } );
      /**
       * We get the user token @user.generatetoken() send it with the json response
       */
      const token = user.generateToken();
      const { _id, email, name, cardBought, phone, parentId, refererPhone, role, profileUpdated } = user;
      const refererLink = `${ process.env.API_URL }/ojirehprime/agent/${ _id }`;
      res.cookie( "token", token, { expire: new Date() + 9999 } );
      res.json( {
        token,
        user: { _id, email, cardBought, phone, refererPhone, parentId, role, name, refererLink, profileUpdated }
      } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * Generate OTP code for Loan request
 */
exports.generateLoanOTP = ( req, res ) => {
  const otpCode = Math.floor( 1000 + Math.random() * 9000 );
  const { phone, userId } = req.params;
  const { _id } = req.user;
  if ( !phone ) return res.status( 400 ).json( { error: "Your phone number is required." } );
  if ( !userId || !_id ) return res.status( 400 ).json( { error: "Oops! Seems like you're not properly logged in." } );
  if ( userId !== _id ) return res.status( 400 ).json( { error: "Ooops! Malicious user!! User not recognized" } );
  const sender = "OjirehPrime";
  const message = `Your verification pass code is ${ otpCode }`;
  const url = `http://www.jamasms.com/smsapi/?username=${ process.env.SMS_USERNAME }&password=${ process.env.SMS_PASS }&sender=${ sender }&numbers=${ phone }&message=${ message }
`;
  if ( !phone ) return res.status( 400 ).json( { error: "Your phone is required" } );
  User.findById( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `You do not have Ojirehprime card. Click on Register to buy one.` } );
      if ( user.phone !== phone ) return res.status( 400 ).json( { error: `The number ${ phone } is not your number` } );
      User.findByIdAndUpdate( { _id: user._id }, { $set: { otp: otpCode } }, { new: true } )
        .then( resp => {
          console.log( resp.otp );
          fetch( url, {
            method: "POST",
            headers: {
              "Content-Type": "text/html"
            }
          } )
            .then( result => {
              res.json( { message: "Success" } );
            } )
            .catch( err => {
              res.status( 400 ).json( { error: err.message } );
            } );
        } );

    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}


/**
 * Verifies OTP code for loan request
 */
exports.otpVerification = ( req, res ) => {
  const { otp } = req.params;

  if ( !otp ) return res.status( 400 ).json( { error: "Enter the OTP number" } );
  User.findOne( { otp } )
    .then( user => {
      if ( user.otp !== otp ) return res.status( 400 ).json( { error: `Verification failed. Invalid code` } );
      
      res.json( { message: "Success" } );
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
 * Set the parent id of the user
 */
exports.setParentId = ( req, res ) => {
  const { userId, refererPhone } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "User not found" } );
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  User.findOne( { phone: refererPhone } )
    .then( referer => {
      if ( !referer ) return res.status( 400 ).json( { error: "Referer not found" } );
      const refererId = referer._id;
      User.findByIdAndUpdate( { _id: userId }, { $set: { parentId: refererId } }, { new: true } )
        .then( user => {
          if ( !user ) return res.status( 400 ).json( { error: "Could not update user account" } )
          res.json( user );
        } )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

/**
 * Get user by parentId
 */
exports.userByParentId = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "User ID is not defined" } );
  User.find( { parentId: userId } )
    .then( users => {
      if ( !users ) return res.status( 400 ).json( { error: `No user found with parent ID ${ userId }` } );
      res.json( users )
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