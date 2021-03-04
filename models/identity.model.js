const mongoose = require("mongoose");

const IdentitySchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  givenName: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  telephone: Number,
  address: String,
});

module.exports = mongoose.model("identity", IdentitySchema);
