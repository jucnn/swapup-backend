const Models = require("../models/index");
const {
  sendBodyError,
  sendFieldsError,
  sendApiSuccessResponse,
  sendApiErrorResponse,
} = require("../services/response.service");

exports.createObject = (req, res) => {
  return new Promise(async (resolve, reject) => {
    Models.object
      .create(req.body)
      .then((data) =>
        sendApiSuccessResponse(
          "/objects",
          "POST",
          res,
          "Request succeed : Object created",
          data
        )
      )
      .catch((err) =>
        sendApiErrorResponse(
          "/objects",
          "POST",
          res,
          "Request failed : Object not created",
          err
        )
      );
  });
};

exports.getAllObjects = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object.find((err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.getOneObject = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object.findById(req.params._id, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.updateObject = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object.update({ _id: req.params._id }, req.body, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.deleteObject = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object.findByIdAndDelete(req.params._id, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};
