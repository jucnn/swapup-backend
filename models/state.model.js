const mongoose = require("mongoose");
const { Schema } = mongoose;

const StateSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("state", StateSchema);
