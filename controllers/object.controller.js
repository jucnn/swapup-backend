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
  let { title, description, category, price, state, brand } = req.body;
  queryCond = {
    ...(category && { category }),
    ...(price && { price }),
    ...(state && { state }),
    ...(brand && { brand }),
    ...(title && { title }),
    ...(description && { description }),
  };
  return new Promise((resolve, reject) => {
    Models.object
      .find(queryCond)
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

exports.getAllByUser = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .find({ seller: req.params._id })
      .populate("seller", ["-password"])
      .populate("category")
      .populate("state")
      .populate("association")
      .exec((err, data) => {
        if (err) {
          return reject(res.json(err));
        } else {
          return resolve(res.json(data));
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
    Models.swap
      .deleteMany({
        $or: [{ objectWanted: req }, { objectToExchange: req }],
      })
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
