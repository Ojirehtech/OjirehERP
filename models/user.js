const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );
const { Schema } = mongoose;

/**
 * We create the user schema
 */
const userSchema = new Schema( {
  email: { type: String, unique: [ true, "Email address already in use by another user"] },
  name: { type: String },
  parentId: { type: String },
  phone: { type: String, required: [ true, "Your phone number is required"] },
  refererPhone: { type: String },
  address: { type: String, required: [ true, "Address is not provided"]},
  balance: { type: Number, default: 0 },
  request: [ {
    name: { type: String },
    balance: { type: Number },
    amount: { type: Number },
    date: { type: String },
    time: { type: String },
    status: { type: Boolean }
  } ],
  loanRequestCount: { type: Number, default: 0 },
  loan: { type: Number, default: 0 },
  earnings: [ {
    amount: Number,
    date: { type: Date, default: Date().now }
  }],
  otp: { type: String, expires: "3m"},
  networks: { type: Number, default: 0 },
  cardBought: { type: Boolean, default: false },
  photo: { data: Buffer, ContentType: String },
  role: { type: String, enum: [ "admin", "agent", "support" ], default: "agent" },
  profileUpdated: { type: Boolean, default: false },
},{
  timestamps: true,
});

/**
 * Expires the otp after 5 minutes
 */
userSchema.index( { otp: 1 }, { expireAfterSeconds: 300 } );

/**
 * We generate a token for the user
 */
userSchema.methods.generateToken = function() {
  const token = jwt.sign( { _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET_KEY );
  return token;
}

const User = mongoose.model( "User", userSchema );

exports.User = User;