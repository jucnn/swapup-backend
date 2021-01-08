const { checkFields } = require("../services/request.service");
const Mandatory = require("../services/mandatory.service");
const {
  sendBodyError,
  sendFieldsError,
  sendApiSuccessResponse,
  sendApiErrorResponse,
} = require("../services/response.service");

const bcrypt = require("bcrypt");
const Models = require("../models");

exports.register = (req, res) => {
  return new Promise(async (resolve, reject) => {
    // Check user request
    if (
      typeof req.body === "undefined" ||
      req.body === null ||
      Object.keys(req.body).length === 0
    ) {
      return sendBodyError(
        "/auth/register",
        "POST",
        res,
        "No datas provided in the request body"
      );
    } else {
      // Check body datas
      const { ok, extra, miss } = checkFields(Mandatory.user, req.body);

      //Check error bad fields
      if (!ok) {
        sendFieldsError(
          "/auth/register",
          "POST",
          res,
          "Bad fields provided",
          miss,
          extra
        );
      } else {
        // Encrypt user pwd
        req.body.password = await bcrypt.hash(req.body.password, 10);

        //TODO : encrypt RGPD data => cryptojs

        // Register user
        Models.user
          .create(req.body)
          .then((data) =>
            sendApiSuccessResponse(
              "/auth/register",
              "POST",
              res,
              "Request succeed : User created",
              data
            )
          )
          .catch((err) =>
            sendApiErrorResponse(
              "/auth/register",
              "POST",
              res,
              "Request failed : User not created",
              err
            )
          );
      }
    }
  });
};
//TODO : use response service in login
exports.login = (req, res) => {
  Models.user
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return sendBodyError(
          "/auth/login",
          "POST",
          res,
          "No user matching"
        );
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return sendBodyError("/auth/login", "POST", res, "Wrong password");
          }
          sendApiSuccessResponse(
            "/auth/login",
            "POST",
            res,
            "Request succeed : User found",
            user
          );
        })
        .catch((error) =>
          sendApiErrorResponse(
            "/auth/login",
            "POST",
            res,
            "Request failed : No user",
            err
          )
        );
    })
    .catch((error) =>
      sendApiErrorResponse(
        "/auth/login",
        "POST",
        res,
        "Request failed : No user",
        err
      )
    );
};

exports.getAllUsers = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.user.find((err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.getOneUser = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.user.findById(req.params._id, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.updateUser = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.user.update({ _id: req.params._id }, req.body, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.deleteUser = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.user.findByIdAndDelete(req.params._id, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};
