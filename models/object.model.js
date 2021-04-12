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
    required: false,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  state: {
    type: Schema.Types.ObjectId,
    ref: "state",
  },
  brand: {
    type: String,
    required: false,
    default: "Pas de marque",
  },
  price: {
    type: String,
    required: true,
  },
  association: {
    type: Schema.Types.ObjectId,
    ref: "association",
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("object", ObjectSchema);
