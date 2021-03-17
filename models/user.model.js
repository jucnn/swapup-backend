/*
Import
*/
const mongoose = require("mongoose");
const { Schema } = mongoose;
const jwt = require("jsonwebtoken");
//

/*
Definition
*/
const MySchema = new Schema({
  // Schema.org
  "@context": { type: String, default: "http://schema.org" },
  "@type": { type: String, default: "Person" },

  // Définir une valeur de propriété unique
  email: { unique: true, type: String },

  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: false,
  },
  telephone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },

  // Définir une valeur par défaut
  creationDate: { type: Date, default: new Date() },
  banished: { type: Boolean, default: false },
});
//

/* 
Methods
*/
MySchema.methods.generateJwt = (user) => {
  // Set expiration
  const expiryToken = new Date();
  expiryToken.setDate(expiryToken.getDate() + 59);

  // Set token
  const jwtObject = {
    _id: user._id,
    email: user.email,
    password: user.password,
    banished: user.banished,

    //Set timeout
    expireIn: "10s",
    exp: parseInt(expiryToken.getTime() / 100, 10),
  };

  return jwt.sign(jwtObject, process.env.JWT_SECRET);
};
//

/* 
Export
*/
module.exports = mongoose.model("user", MySchema);
//
