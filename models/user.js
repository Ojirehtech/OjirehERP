const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );
const { Schema } = mongoose;

/**
 * We create the user schema
 */
const userSchema = new Schema( {
  email: { type: String, unique: true },
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
  otp: { type: String, expires: "3m"},
  network: [ { type: String }],
  cardBought: { type: Boolean, default: false },
  photo: { data: Buffer, ContentType: String },
  role: { type: String, enum: [ "admin", "agent", "support" ], default: "agent" },
  profileUpdated: { type: Boolean, default: false },
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
    // transform: ( obj, ret ) => {
    //   delete ret.password;
    // }
  }
});

/**
 * We generate a token for the user
 */
userSchema.methods.generateToken = function() {
  const token = jwt.sign( { _id: this._id, email: this.email, role: this.role }, process.env.JWT_SECRET_KEY );
  return token;
}

const User = mongoose.model( "User", userSchema );

exports.User = User;