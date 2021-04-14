/*
Imports
*/
// Node
const express = require("express");
//

//Inner
const Models = require("../models/index");
const {
  sendBodyError,
  sendFieldsError,
  sendApiSuccessResponse,
  sendApiErrorResponse,
} = require("../services/response.service");
const { checkFields } = require("../services/request.service");
const Mandatory = require("../services/mandatory.service");

//

//Controllers
const objectController = require("../controllers/object.controller");
const Controllers = require("../controllers/index");

/*
Routes definition
*/
class ApiRouter {
  constructor({ passport }) {
    this.router = express.Router();
    this.passport = passport;
  }

  routes() {
    // CRUD: define route to create object
    this.router.post(
      "/:endpoint",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        // Check body data
        if (
          typeof req.body === "undefined" ||
          req.body === null ||
          Object.keys(req.body).length === 0
        ) {
          return sendBodyError(
            `/api/${req.params.endpoint}`,
            "POST",
            res,
            "No data provided in the reqest body"
          );
        } else {
          // Check body data
          const { ok, extra, miss } = checkFields(
            Mandatory[req.params.endpoint],
            req.body
          );

          // Error: bad fields provided
          if (!ok) {
            return sendFieldsError(
              `/api/${req.params.endpoint}`,
              "POST",
              res,
              "Bad fields provided",
              miss,
              extra
            );
          } else {
            // Add author _id
            req.body.seller = req.user._id;
           /*  req.body.swap_sender = req.user._id; */

            // Use the controller to create nex object
            Controllers[req.params.endpoint]
              .createOne(req)
              .then((apiResponse) =>
                sendApiSuccessResponse(
                  `/api/${req.params.endpoint}`,
                  "POST",
                  res,
                  "Request succeed",
                  apiResponse
                )
              )
              .catch((apiError) =>
                sendApiErrorResponse(
                  `/api/${req.params.endpoint}`,
                  "POST",
                  res,
                  "Request failed",
                  apiError
                )
              );
          }
        }
      }
    );

    this.router.post("/object/search", (req, res) => {
      // Use the controller to create nex object
      console.log("go there");
      Controllers["object"]
        .getAllBySearching(req)
        .then((apiResponse) =>
          sendApiSuccessResponse(
            `/api/object`,
            "POST",
            res,
            "Request succeed",
            apiResponse
          )
        )
        .catch((apiError) => {
          console.log(apiError);

          sendApiErrorResponse(
            `/api/${req.params.endpoint}`,
            "POST",
            res,
            "Request failed",
            apiError
          );
        });
    });

    this.router.get("/:endpoint", (req, res) => {
      console.log(req.user);
      // Use the controller to create nex object
      Controllers[req.params.endpoint]
        .getAll(req)
        .then((apiResponse) =>
          sendApiSuccessResponse(
            `/api/${req.params.endpoint}`,
            "GET",
            res,
            "Request succeed",
            apiResponse
          )
        )
        .catch((apiError) =>
          sendApiErrorResponse(
            `/api/${req.params.endpoint}`,
            "GET",
            res,
            "Request failed",
            apiError
          )
        );
    });

    this.router.get("/:endpoint/:id", (req, res) => {
      Controllers[req.params.endpoint]
        .getOne(req.params.id)
        .then((apiResponse) =>
          sendApiSuccessResponse(
            `/api/${req.params.endpoint}/${req.params.id}`,
            "GET",
            res,
            "Request succeed",
            apiResponse
          )
        )
        .catch((apiError) =>
          sendApiErrorResponse(
            `/api/${req.params.endpoint}`,
            "GET",
            res,
            "Request failed",
            apiError
          )
        );
    });

    this.router.patch(
      "/:endpoint/:id",
      this.passport.authenticate("jwt", { session: false }),
      (req, res) => {
        // Check body data
        if (
          typeof req.body === "undefined" ||
          req.body === null ||
          Object.keys(req.body).length === 0
        ) {
          return sendBodyError(
            `/api/${req.params.endpoint}`,
            "PATCH",
            res,
            "No data provided in the reqest body"
          );
        } else {
          // Check body data
          /*    const { ok, extra, miss } = checkFields(
            Mandatory[req.params.endpoint],
            req.body
          ); */
          /* 
          // Error: bad fields provided
          if (!ok) {
            return sendFieldsError(
              `/api/${req.params.endpoint}`,
              "PUT",
              res,
              "Bad fields provided",
              miss,
              extra
            );
          } else { */
          // Add author _id
          /*    req.body.seller_id = req.user._id; */
          // Use the controller to create nex object
          Controllers[req.params.endpoint]
            .updateOne(req)
            .then((apiResponse) =>
              sendApiSuccessResponse(
                `/api/${req.params.endpoint}`,
                "PATCH",
                res,
                "Request succeed",
                apiResponse
              )
            )
            .catch((apiError) =>
              sendApiErrorResponse(
                `/api/${req.params.endpoint}`,
                "PATCH",
                res,
                "Request failed",
                apiError
              )
            );
          /*           }
           */
        }
      }
    );

    this.router.delete("/:endpoint/:id", (req, res) => {
      // Use the controller to create nex object
      Controllers[req.params.endpoint]
        .deleteOne(req.params.id)
        .then((apiResponse) =>
          sendApiSuccessResponse(
            `/api/${req.params.endpoint}`,
            "DELETE",
            res,
            "Request succeed",
            apiResponse
          )
        )
        .catch((apiError) =>
          sendApiErrorResponse(
            `/api/${req.params.endpoint}`,
            "DELETE",
            res,
            "Request failed",
            apiError
          )
        );
    });
    /*  this.router.post("/objects", this.passport.authenticate('jwt', { session: false }), objectController.createObject); */
    /* this.router.get("/objects", objectController.getAllObjects); */
    /*  this.router.get("/objects/:_id", objectController.getOneObject); */
    /*   this.router.put("/objects/:_id", objectController.updateObject); */
    /* this.router.delete("/objects/:_id", objectController.deleteObject); */
  }

  init() {
    // Get route fonctions
    this.routes();

    // Sendback router
    return this.router;
  }
}
//

/*
Export
*/
module.exports = ApiRouter;
//
