const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrandSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("brand", BrandSchema);
