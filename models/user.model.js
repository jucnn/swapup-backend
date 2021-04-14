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
const UserSchema = new Schema({
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
    unique: true,
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
/*   favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "object" }],
  swapSended: [{ type: mongoose.Schema.Types.ObjectId, ref: "swap" }],
  swapReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: "swap" }], */
  // Définir une valeur par défaut
  creationDate: { type: Date, default: new Date() },
  banished: { type: Boolean, default: false },
});
//

/* 
Methods
*/
UserSchema.methods.generateJwt = (user) => {
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

UserSchema.methods.favorite = function (id) {
  if (this.favorites.indexOf(id) === -1) {
    this.favorites.push(id);
  }
  return this.save();
};
UserSchema.methods.unfavorite = function (id) {
  this.favorites.remove(id);
  return this.save();
};
UserSchema.methods.isFavorite = function (id) {
  return this.favorites.some(function (favoriteId) {
    return id.toString() === favoriteId.toString();
  });
};
//

/* 
Export
*/
module.exports = mongoose.model("user", UserSchema);
//
