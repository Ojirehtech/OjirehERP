const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );
const { Schema, ObjectId } = mongoose;

/**
 * We create the user schema
 */
const userSchema = new Schema( {
  email: { type: String, unique: [ true, "Email address already in use by another user"] },
  name: { type: String },
  parentId: { type: String },
  phone: { type: String },
  password: { type: String },
  refererPhone: { type: String },
  address: { type: String },
  balance: { type: Number, default: 0 },
  loanRequestCount: { type: Number, default: 0 },
  loan: [ {
    amount: { type: Number, default: 0 },
    status: { type: Boolean, default: false },
    requestBy: { type: ObjectId },
    createdAt: { type: Date, default: Date().now }
  } ],
  hasBonus: { type: Boolean, default: false},
  loanPaid: { type: Boolean, default: true },
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