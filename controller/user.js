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
  const name = req.body.name;
  const phone = req.body.phone;
  const address = req.body.address;
  // const email = req.body.email;
  
  // if ( !email ) return res.status( 400 ).json( { error: "Enter your email address" } );
  if ( !phone ) return res.status( 400 ).json( { error: "Phone number is missing" } );
  if ( !name ) return res.status( 400 ).json( { error: "Your first name is required" } );
  if ( !address ) return res.status( 400 ).json( { error: "Your last name is required" } );
  // if (refererPhone) return res.status(400).json({ error: "Your referer phone number is required"});
  
  User.findOne( { phone: phone } )
    .then( user => {
      if ( user ) return res.status( 400 ).json( { error: `The phone number ${req.body.phone} has been used by another user` } );
      let newUser = new User( req.body );

      newUser.save();
      const token = newUser.generateToken();
      const { _id, email, name, networks, phone, parentId, refererPhone, role } = newUser;
      const refererLink = `${process.env.API_URL}/api/v1/agent/${ _id }`;
      res.cookie( "token", token, { expire: new Date() + 9999 } );
      res.header( "x-auth-token", token ).json( {
        token,
        user: { _id, email, phone, networks, refererPhone, parentId, role, name, refererLink }});
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.createBrandedCard = (req, res) => {
  const { name, phone, brand } = req.body;

  if (!name) return res.status(400).json({ error: "Your name is required" });
  if (!phone) return res.status(400).json({error: "Your phone number is required" });
  if (!brand) return res.status(400).json({ error: "Tell us the brand you want for you card" });
  User.findOne({ phone })
    .then(user => {
      if (user) return res.status(400).json({ error: `User with phone number ${req.body.phone} already exists`});
      User.findOne({email: req.body.email}, (err, data) => {
        if (data) return res.status(400).json({ error: `User with ${req.body.email} already exists` });
        let newUser = new User({
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          brand: req.body.brand
        });
  
        newUser.save()
        const token = newUser.generateToken();
        const { _id, email, name, phone, role } = newUser;
        res.cookie( "token", token, { expire: new Date() + 9999 } );
        res.header( "x-auth-token", token ).json( {
          token,
          user: { _id, email, phone, role, name 
        }});
      })
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    })
}

/**
 * User account signup
 */
exports.dataUpload = ( req, res ) => {
  const data = req.body;
  for ( let i = 0; i < data.length; i++ ) {
    if ( !data[i].name ) return res.status( 400 ).json( { error: "Name is required" } );
    // if ( !data[i].email ) return res.status( 400 ).json( { error: "User email is required" } );
    if ( !data[i].phone ) return res.status( 400 ).json( { error: "Phone number is required" } );
    if ( !data[i].address ) return res.status( 400 ).json( { error: "You must provide user address to continue" } );
    User.findOne( { phone: data[i].phone } )
      .then( result => {
        if (result) return res.status(400).json({ error: `User with the phone number ${data[i].phone} already exists` });
        let newUser = new User( {
          name:  data[i].name,
          email: data[i].email,
          phone: data[i].phone,
          address: data[i].address
        } );
        newUser.save();
        return res.json( { message: "Success" } );
      } )
      .catch( err => {
        return res.status(400).json({ error: err.message });
      } );
  }
}

/**
 * Generate OTP code for users
 */
exports.generateOTP = ( req, res ) => {
  const otpCode = Math.floor( 1000 + Math.random() * 9000 );
  const { phone } = req.params;
  console.log("inside generate otp controller")
  if ( !phone ) return res.status( 400 ).json( { error: "Your phone number is required" } );
  const sender = "OjirehPrime";
  const message = `Your verification pass code is ${ otpCode }`;
  const url = `http://www.jamasms.com/smsapi/?username=${process.env.SMS_USERNAME}&password=${process.env.SMS_PASS}&sender=${sender}&numbers=${phone}&message=${message}
`
  User.findOne( { phone: phone } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `${ phone } do not have Ojirehprime card. Click on Register below to buy a card` } );
      
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
      const { _id, email, name, networks, cardBought, phone, parentId, refererPhone, role, profileUpdated } = user;
      const refererLink = `${ process.env.API_URL }/api/v1/agent/${ _id }`;
      res.cookie( "token", token, { expire: new Date() + 9999 } );
      res.json( {
        token,
        user: { _id, email, cardBought, networks, phone, refererPhone, parentId, role, name, refererLink, profileUpdated }
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
    .then( (users) => {
      if ( !users ) return res.status( 400 ).json( { error: "User record is empty" } );
      res.json( { users } );
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
 * Searches api
 */
exports.searchUser = ( req, res, next ) => {
  const q = req.query.q;
  if ( !q ) return res.status( 400 ).json( { error: "Search text is required" } );
  User.find( { phone: { $regex: new RegExp( q ) } } )
    .then( users => {
      res.json( { users } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
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
 * Updates the user information
 */
exports.updateUser = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "Invalid parameter" } );
  User.findByIdAndUpdate( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User not found" } );
      if ( req.body.name ) user.name = req.body.name;
      if ( req.body.email ) user.email = req.body.email;
      if ( req.body.phone ) user.phone = req.body.phone;
      if ( req.body.refererPhone ) user.refererPhone = req.body.refererPhone;
      if ( req.body.address ) user.address = req.body.address;
      user.save()
        .then( result => {
          res.json( result );
        } );
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

/**
 * User account signup
 */
exports.adminsignup = ( req, res ) => {
  const name = req.body.name,
    email = req.body.email,
    password = req.body.password;
  
  if ( !email ) return res.status( 400 ).json( { error: "Enter your email address" } );
  if ( !password ) return res.status( 400 ).json( { error: "Enter your password to continue" } );
  if ( !name ) return res.status( 400 ).json( { error: "Name is required" } );

  User.findOne( { email: email } )
    .then( user => {
      if ( user ) return res.status( 400 ).json( { error: `User with the email ${ email } already exists` } );
      return bcrypt.hash( password, 12 )
        .then( hashedPassword => {
          if ( !hashedPassword ) return res.status( 400 ).json( { error: "Request failed. Try again" } );
          let newUser = new User( {
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            role: "admin"
          } );

          newUser.save();
          const token = newUser.generateToken();
          const { _id, email, name, role } = newUser;
          res.cookie( "token", token, { expire: new Date() + 9999 } );
          res.header( "x-auth-token", token ).json( {
            token,
            user: { _id, email, name, role }
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
exports.adminSignIn = ( req, res ) => {
  const email = req.body.email;
  const password = req.body.password;
  if ( !email ) return res.status( 400 ).json( { error: "Enter your email" } );
  if ( !password ) return res.status( 400 ).json( { error: "Password is required" } );
  User.findOne( { email: email } )
    .then( user => {
      // console.log( user.password );
      if ( !user ) return res.status( 400 ).json( { error: `User does not exist` } );
      return bcrypt.compare( password, user.password )
        .then( passwordMatched => {
          if ( !passwordMatched ) return res.status( 400 ).json( { error: "Invalid email or password" } );
          const token = user.generateToken();
          const { _id, email, name, role } = user;
          res.cookie( "token", token, { expire: new Date() + 9999 } );
          res.json( {
            token,
            user: { _id, email, role, name }
          } );
        } )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}

exports.awardBonus = ( req, res ) => {
  const { userId } = req.params;
  if ( !userId ) return res.status( 400 ).json( { error: "Invalid parameters" } );
  User.findById( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: "User not found" } );
      if ( user.hasBonus === true ) return;
      User.findByIdAndUpdate( { _id: userId }, { $inc: { balance: +5000 }, $set: { hasBonus: true } }, { new: true } )
        .then( result => {
          if ( !result ) return res.status( 400 ).json( { error: "Update failed" } );
          res.json( result );
        } );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}
