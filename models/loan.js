const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const loanSchema = new Schema( {
  userId: { type: ObjectId, required: true, ref: "User" },
  amount: { type: Number, required: [ true, "Amount is required" ] },
  paid: { type: Boolean, default: false },
  expiryDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date().now }
}, {
  timestamps: true
});

const Loan = mongoose.model( "Loan", loanSchema );

exports.Loan = Loan;