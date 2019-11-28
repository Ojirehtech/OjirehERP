const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const loanSchema = new Schema( {
  userId: { type: ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: [ true, "Amount is required" ] },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date().now }
} );

const Loan = mongoose.model( "Loan", loanSchema );

exports.Loan = Loan;