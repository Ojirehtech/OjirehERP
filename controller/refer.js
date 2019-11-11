const { User } = require( "../models/user" );
const smsalert = require("../service/sms")
require( "dotenv" ).config();

/**
 * Refers 
 */
exports.refer = ( req, res ) => {
  const { userId } = req.params;
  var date = new Date();
  date.setMinutes( date.getMinutes() + 5 );
  console.log(date)
  User.findOne( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `Referer with the ID ${ userId } not found` } )
      res.cookie( "refererId", userId, { expires: date } );
      res.redirect( process.env.FRONTEND_APP_URL )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
  
}

/**
 * Referers settlement
*/
exports.refererSettlement = ( req, res ) => {
  const { refererPhone } = req.params;
  // const { refererId } = req.cookies;
  console.log("the entry point")
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  // if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
  User.findOneAndUpdate( { phone: refererPhone }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      if ( !user ) return;
      const phone = user.phone;
      console.log(phone, " first phone to recieve alert of 200")
exports.refer = ( req, res ) => {
  const { userId } = req.params;
  var date = new Date();
  date.setMinutes( date.getMinutes() + 5 );
  console.log(date)
  User.findOne( { _id: userId } )
    .then( user => {
      if ( !user ) return res.status( 400 ).json( { error: `Referer with the ID ${ userId } not found` } )
      res.cookie( "refererId", userId, { expires: date } );
      res.redirect( process.env.FRONTEND_APP_URL )
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
  
}

/**
 * Referers settlement
*/
exports.refererSettlement = ( req, res ) => {
  const { refererPhone } = req.params;
  // const { refererId } = req.cookies;
  console.log("the entry point")
  if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
  // if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
  User.findOneAndUpdate( { phone: refererPhone }, { $inc: { balance: +200 } }, { new: true } )
    .then( user => {
      if ( !user ) return;
      const phone = user.phone;
      console.log(phone, " first phone to recieve alert of 200")
      smsalert( res, phone, 200 );
      const grandReferer = user.parentId;
      console.log(user, "this. the first user to get reward")
      User.findByIdAndUpdate( { _id: grandReferer }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          if ( !resp ) return;
          const ancestralParentId = resp.parentId;
          const phone = resp.phone;
          smsalert( res, phone, 50 );
          console.log(resp, " this is resp")
          User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              const phone = response.phone;
              smsalert( res, phone, 8 );
              exports.refer = ( req, res ) => {
                const { userId } = req.params;
                var date = new Date();
                date.setMinutes( date.getMinutes() + 5 );
                console.log( date )
                User.findOne( { _id: userId } )
                  .then( user => {
                    if ( !user ) return res.status( 400 ).json( { error: `Referer with the ID ${ userId } not found` } )
                    res.cookie( "refererId", userId, { expires: date } );
                    res.redirect( process.env.FRONTEND_APP_URL )
                  } )
                  .catch( err => {
                    res.status( 400 ).json( { error: err.message } );
                  } );

              }

              /**
               * Referers settlement
              */
              exports.refererSettlement = ( req, res ) => {
                const { refererPhone } = req.params;
                // const { refererId } = req.cookies;
                console.log( "the entry point" )
                if ( !refererPhone ) return res.status( 400 ).json( { error: "Unknown referer. You must have a refer to complete this operation" } );
                // if ( !refererId ) return res.status( 400 ).json( { error: "You do not have a referer" } );
                User.findOneAndUpdate( { phone: refererPhone }, { $inc: { balance: +200 } }, { new: true } )
                  .then( user => {
                    if ( !user ) return;
                    const phone = user.phone;
                    const totalBal = user.balance;
                    console.log( phone, " first phone to recieve alert of 200" )
                    smsalert( res, phone, 200, totalBal );
                    const grandReferer = user.parentId;
                    if ( !grandReferer ) return;
                    console.log( user, "this. the first user to get reward" )
                    User.findByIdAndUpdate( { _id: grandReferer }, { $inc: { balance: +50 } }, { new: true } )
                      .then( resp => {
                        if ( !resp ) return;
                        const ancestralParentId = resp.parentId;
                        if ( !ancestralParentId ) return;
                        const phone = resp.phone; 
                        const total = resp.balance;
                        smsalert( res, phone, 50, total );
                        console.log( resp, " this is resp" )
                        User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
                          .then( response => {
                            const phone = response.phone;
                            const balance = response.balance;
                            smsalert( res, phone, 8, balance );
                            console.log( response, "" )
                            if ( !response ) return;
                          } )
                      } )
                    console.log( user, " user with the reward" )
                    res.json( user );
                  } )
                  .catch( err => {
                    res.status( 400 ).json( { error: err.message } );
                  } );
              }
              console.log(response, "")
              if ( !response ) return;
            } )
        } )
      console.log(user, " user with the reward")
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}
      smsalert( res, phone, 200 );
      const grandReferer = user.parentId;
      console.log(user, "this. the first user to get reward")
      User.findByIdAndUpdate( { _id: grandReferer }, { $inc: { balance: +50 } }, { new: true } )
        .then( resp => {
          if ( !resp ) return;
          const ancestralParentId = resp.parentId;
          const phone = resp.phone;
          smsalert( res, phone, 50 );
          console.log(resp, " this is resp")
          User.findByIdAndUpdate( { _id: ancestralParentId }, { $inc: { balance: +8 } }, { new: true } )
            .then( response => {
              const phone = response.phone;
              smsalert( res, phone, 8 );
              console.log(response, "")
              if ( !response ) return;
            } )
        } )
      console.log(user, " user with the reward")
      res.json( user );
    } )
    .catch( err => {
      res.status( 400 ).json( { error: err.message } );
    } );
}