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

        // Register user
        Models.user
          .create(req.body)
          .then((data) => {
            // Generate user JWT
            const token = data.generateJwt(data);
            // Set response cookie
           
            return sendApiSuccessResponse(
              "/auth/register",
              "POST",
              res,
              "Request succeed : User created",
              token
            );
          })
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
exports.login = (req, res) => {
  // Check body data
  if (
    typeof req.body === "undefined" ||
    req.body === null ||
    Object.keys(req.body).length === 0
  ) {
    return sendBodyError(
      "/auth/login",
      "POST",
      res,
      "No data provided in the reqest body"
    );
  } else {
    const { ok, extra, miss } = checkFields(Mandatory.login, req.body);

    // Error: bad fields provided
    if (!ok) {
      return sendFieldsError(
        "/auth/login",
        "POST",
        res,
        "Bad fields provided",
        miss,
        extra
      );
    } else {
      // Find user from email
      Models.user.findOne({ email: req.body.email }, (err, data) => {
        if (err || data === null) {
          return sendApiErrorResponse(
            "/auth/login",
            "POST",
            res,
            "Email not found",
            err
          );
        } else {
          // Check user password
          const validatedPassword = bcrypt.compareSync(
            req.body.password,
            data.password
          );
          if (!validatedPassword) {
            return sendApiErrorResponse(
              "/auth/login",
              "POST",
              res,
              "Invalid password",
              err
            );
          } else {
            // Generate user JWT
            const token = data.generateJwt(data);
            // Set response cookie
         

            // Send user data
            return sendApiSuccessResponse(
              "/auth/login",
              "POST",
              res,
              "User login",
              token
            );
          }
        }
      });
    }
  }
};

exports.logout = async (req, res) => {
  await req.logout();
  req.session = null;
  await res.clearCookie(process.env.COOKIE_NAME);
  return sendApiSuccessResponse(
    "/auth/login",
    "POST",
    res,
    "User logout",
    null
  );
};

exports.getInfoUser = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.user.findById(req.user._id, (err, data) => {
      err ? reject(res.json(err)) : resolve(res.json(data));
    });
  });
};

exports.getUserSwapSent = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.swap
      .find({ swap_sender: req.user._id })
      .populate({ path: "objectWanted", populate: { path: "state" } })
      .populate({ path: "objectWanted", populate: { path: "association" } })
      .populate({ path: "objectWanted", populate: { path: "category" } })
      .populate({ path: "objectToExchange", populate: { path: "state" } })
      .populate({ path: "objectToExchange", populate: { path: "association" } })
      .populate({ path: "objectToExchange", populate: { path: "category" } })
      .populate("swap_receiver", ["-password"])
      .populate("swap_state")
      .exec((err, data) => {
        if (err) {
          return reject(res.json(err));
        } else {
          return resolve(res.json(data));
        }
      });
  });
};

exports.getUserSwapReceived = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.swap
      .find({ swap_receiver: req.user._id })
      .populate({ path: "objectWanted", populate: { path: "state" } })
      .populate({ path: "objectWanted", populate: { path: "association" } })
      .populate({ path: "objectWanted", populate: { path: "category" } })
      .populate({ path: "objectToExchange", populate: { path: "state" } })
      .populate({ path: "objectToExchange", populate: { path: "association" } })
      .populate({ path: "objectToExchange", populate: { path: "category" } })

      .populate("swap_sender", ["-password"])
      .populate("swap_state")
      .exec((err, data) => {
        if (err) {
          return reject(res.json(err));
        } else {
          return resolve(res.json(data));
        }
      });
  });
};

exports.getUserObjects = (req, res) => {
  return new Promise((resolve, reject) => {
    Models.object
      .find({ seller: req.user._id })
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
