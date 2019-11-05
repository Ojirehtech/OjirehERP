const mongoose = require( "mongoose" );
const jwt = require( "jsonwebtoken" );
const { Schema } = mongoose;

/**
 * We create the user schema
 */
const userSchema = new Schema( {
  email: { type: String, required: [ true, "Your email is required for you to continue" ], unique: true },
  password: { type: String, required: [ true, "You must provide a password to create an account" ] },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String,  },
  parentId: { type: String },
  phone: { type: String },
  referPhone: { type: String },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String }
  },
  balance: { type: Number, default: 0 },
  request: [ {
    name: { type: String },
    balance: { type: Number },
    amount: { type: Number },
    date: { type: String },
    time: { type: String },
    status: { type: Boolean }
  } ],
  network: [ { type: String }],
  cardBought: { type: Boolean, default: false },
  photo: { data: Buffer, ContentType: String },
  role: { type: String, enum: [ "admin", "agent", "support" ], default: "agent" },
  profileUpdated: { type: Boolean, default: false },
},{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: ( obj, ret ) => {
      delete ret.password;
    }
  }
});

/**
 * We generate a token for the user
 */
userSchema.methods.generateToken = function() {
  const token = jwt.sign( { _id: this._id, email: this.email, password: this.password, role: this.role }, process.env.JWT_SECRET_KEY );
  return token;
}

const User = mongoose.model( "User", userSchema );

exports.User = User;