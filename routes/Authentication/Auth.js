const express = require("express");
const AuthRouter = express.Router();

/** controllers */
const { createNewUser } = require("../../controllers/Authentication/User");

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
  .post("/new_user", createNewUserMiddleware, createNewUser);

module.exports = AuthRouter;
