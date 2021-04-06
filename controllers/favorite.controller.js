const Models = require("../models/index");

exports.createOne = (req, res) => {
  return new Promise((resolve, reject) => {
    // USe Models to create new post
    Models.favorite
      .create(req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.getAll = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.favorite
      .find()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
    
};

exports.getOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.favorite
      .findById(req)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.updateOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.favorite
      .updateOne({ _id: req.params.id }, req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.deleteOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.favorite
      .findByIdAndDelete({ _id: req })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
