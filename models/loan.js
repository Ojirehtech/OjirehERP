const mongoose = require( "mongoose" );
const { Schema, ObjectId } = mongoose;

const loanSchema = new Schema( {
  userId: { type: ObjectId, ref: "User", required: [ true, "User ID is required" ] },
  amount: { type: Number, required: [ true, "You did not tell us the amount you want to take" ] },
  loanCount: { type: Number, default: 0 },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date().now }
} );

const Loan = mongoose.model( "Loan", loanSchema );

exports.Loan = Loan;