const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const requestSchema = new Schema( {
  userId: { type: ObjectId, ref: "User", required: [ true, "User Id is not supplied" ] },
  amount: { type: Number, required: [ true, "How much do you want to withdraw" ] },
  balance: { type: Number },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
} );

const Request = mongoose.model( "Request", requestSchema );

exports.Request = Request;