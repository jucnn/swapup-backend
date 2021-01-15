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
//

//Controllers
const objectController = require("../controllers/object.controller")

/*
Routes definition
*/
class ApiRouter {
  constructor({ passport }) {
    this.router = express.Router();
    this.passport = passport
  }

  routes() {
    
    this.router.post("/objects", this.passport.authenticate('jwt', { session: false }), objectController.createObject);
    this.router.get("/objects", objectController.getAllObjects);
    this.router.get("/objects/:_id", objectController.getOneObject);
    this.router.put("/objects/:_id", objectController.updateObject);
    this.router.delete("/objects/:_id", objectController.deleteObject);
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
