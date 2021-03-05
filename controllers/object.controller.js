const Models = require("../models/index");

exports.createOne = (req, res) => {
  return new Promise((resolve, reject) => {
    // USe Models to create new post
    Models.object
      .create(req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.getAll = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .find()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
  
};

exports.getOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
    .findById(req)
    .then((data) => resolve(data))
    .catch((err) => reject(err));
  });
};

exports.updateOne = (req, res) => {
  console.log(req.params);

  console.log(req.body);
  return new Promise((resolve, reject) => {
    Models.object
      .updateOne({ _id: req.params.id }, req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.deleteOne = (req, res) => {
  console.log(req);
  return new Promise((resolve, reject) => {
    Models.object
      .findByIdAndDelete({ _id: req })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
