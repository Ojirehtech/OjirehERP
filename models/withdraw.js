const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const withdrawSchema = new Schema( {
  userId: { type: ObjectId, ref: "User", required: [ true, "User Id is not supplied" ] },
  amount: { type: Number, required: [ true, "How much do you want to withdraw" ] },
  balance: { type: Number },
  cardNo: { type: Number, required: [ true, "The receiver's card no is not provided" ] },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
} );

const Withdraw = mongoose.model( "Withdraw", withdrawSchema );

exports.Withdraw = Withdraw;