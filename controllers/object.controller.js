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
      .populate("seller", ["-password"])
      .populate("category")
      .populate("state")
      .populate("association")
      .exec((err, data) => {
        if (err) {
          return reject(err);
        } else {
          return resolve(data);
        }
      });
  });
};

exports.getAllBySearching = (req, res) => {
  console.log(req.body);
  let { title, description, category, price, state, brand } = req.body;
  queryCond = {
    ...(category && { category }),
    ...(price && { price }),
    ...(state && { state }),
    ...(brand && { brand }),
    ...(title && { title }),
    ...(description && { description }),
  };
  console.log(queryCond);
  return new Promise((resolve, reject) => {
    Models.object
      .find(queryCond)
      .populate("seller", ["-password"])
      .exec((err, data) => {
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
      .populate("category")
      .populate("state")
      .populate("association")
      .exec((err, data) => {
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
