const mongoose = require("mongoose");
const { user } = require("../services/mandatory.service");
const { Schema } = mongoose;
const Models = require("../models/index");

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
  favoritesCount: { type: Number, default: 0 },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  creationDate: { type: Date, default: new Date() },
});

/* Methods */
//TODO : use this methods when favorite is added
ObjectSchema.methods.updateFavoriteCount = () => {
  let object = this;
  return Models.user
    .count({ favorites: { $in: [object._id] } })
    .then(function (count) {
      object.favoritesCount = count;
      return object.save();
    });
};



module.exports = mongoose.model("object", ObjectSchema);
