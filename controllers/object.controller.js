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
      .find(req.query)
      .populate("seller", ["-password"])
      .exec((err, data) => {
        console.log(data);
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
  });
};

exports.getOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .findById(req)
      .populate("seller", ["-password"])
      .exec((err, data) => {
        console.log(data);
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
  });
};

exports.updateOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .updateOne({ _id: req.params.id }, req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.deleteOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .findByIdAndDelete({ _id: req })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
