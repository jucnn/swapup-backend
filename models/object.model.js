const mongoose = require("mongoose");
const { Schema } = mongoose;

const ObjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: false,
    default: 'Pas de marque'
  },
  price: {
    type: Number,
    required: true,
  },
  donationPercentage: {
    type: Number,
    required: true,
  },
  association: {
    type: Object,
    required: true,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'user'  
  },
});

module.exports = mongoose.model("object", ObjectSchema);
