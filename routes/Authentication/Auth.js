const express = require("express");
const {
  userAuthentication,
} = require("../../controllers/Authentication/Login");
const AuthRouter = express.Router();

/** controllers */
const { createNewUser } = require("../../controllers/Authentication/User");
const {
  userExistsOnAuthenticationMiddleware,
} = require("../../middlewares/Authentication/Login");

/** middlewares */
const {
  createNewUserMiddleware,
  generateRegistrationTokenMiddleware,
  validateRegistrationTokenMiddleware,
} = require("../../middlewares/Authentication/User");

AuthRouter.post(
  "/generate_registration_token",
  generateRegistrationTokenMiddleware
)
  .post("/validate_registration_token", validateRegistrationTokenMiddleware)
  .post("/new_user", createNewUserMiddleware, createNewUser)
  .post(
    "/authentication",
    userExistsOnAuthenticationMiddleware,
    userAuthentication
  );

module.exports = AuthRouter;
