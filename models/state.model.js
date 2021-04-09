const mongoose = require("mongoose");
const { Schema } = mongoose;

const StateSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("state", StateSchema);
