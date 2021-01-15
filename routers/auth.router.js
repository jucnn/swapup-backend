/*
Imports
*/
// Node
const express = require("express");

//Controllers
const userController = require("../controllers/user.controller")

//Import Models
const Models = require("../models/index");
//

/*
Routes definition
*/
class AuthRouter {
  constructor() {
    this.router = express.Router();
  }

  routes() {

    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login)
    this.router.get("/", userController.getAllUsers);
    this.router.get("/:_id", userController.getOneUser);
    this.router.put("/:_id", userController.updateUser);
    this.router.delete("/:_id", userController.deleteUser);
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
module.exports = AuthRouter;
//
