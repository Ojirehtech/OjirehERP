const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const transferSchema = new Schema( {
  sender: { type: ObjectId, ref: "User", required: [ true, "Account holder name is required" ] },
  receiver: { type: String, required: [ true, "Reciever name is required" ] },
  receiverPhone: {  type: String, required: [ true, "Reciever's phone number is required"]},
  amount: { type: Number, required: [ true, "You haven't specified the amount" ] },
  cardNo: { type: Number, required: [true, "The receiver's card no is not provided"]},
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
} )

const Transfer = mongoose.model( "Transfer", transferSchema );

exports.Transfer = Transfer;