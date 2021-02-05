/*
Imports
*/
// Node
const express = require("express");
const passport = require('passport');


//Controllers
const userController = require("../controllers/user.controller")

/* //Import Models
const Models = require("../models/index");
//

//Token
const auth = require('../middlewares/auth') */

/*
Routes definition
*/
class AuthRouter {
  constructor() {
    this.router = express.Router();
    this.passport = passport;

  }

  routes() {

    this.router.post("/register", userController.register);
    this.router.post("/login", userController.login)
    this.router.get("/", userController.getAllUsers);
    this.router.get("/me", passport.authenticate('jwt', { session: false }), userController.getInfoUser);
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
