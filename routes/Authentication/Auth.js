const express = require("express");
const AuthRouter = express.Router();

/** controllers */
const { 
    createNewUser 
} = require("../../controllers/Authentication/User");

/** middlewares */
const {
  createNewUserMiddleware,
} = require("../../middlewares/Authentication/User");

AuthRouter.post("/new_user", createNewUserMiddleware, createNewUser);

module.exports = AuthRouter;
