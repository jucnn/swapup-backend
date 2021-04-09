const mongoose = require("mongoose");
const { Schema } = mongoose;

const BrandSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("brand", BrandSchema);
