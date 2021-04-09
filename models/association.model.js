const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssociationSchema = mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("association", AssociationSchema);
