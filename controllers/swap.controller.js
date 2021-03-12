const Models = require("../models/index");

exports.createOne = (req, res) => {
  return new Promise((resolve, reject) => {
    // USe Models to create new post
    Models.swap
      .create(req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.getAll = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.swap
      .find(req.query)
      .populate("objectWanted")
      .populate("objectToExchange")
      .populate("swap_sender", ["-password"])
      .populate("swap_receiver", ["-password"])
    /*   .then((data) => resolve(data)) */
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

exports.getOne = id => {
  return new Promise((resolve, reject) => {
    Models.swap
      .findById(id)
      .populate("objectWanted")
      .populate("objectToExchange")
      .populate("swap_sender", ["-password"])
      .populate("swap_receiver", ["-password"])
    /*   .then((data) => resolve(data)) */
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
    Models.swap
      .updateOne({ _id: req.params.id }, req.body)
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

exports.deleteOne = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.swap
      .findByIdAndDelete({ _id: req })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
