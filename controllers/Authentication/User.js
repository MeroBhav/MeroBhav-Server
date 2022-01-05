/** Inbuilt packages */
const crypto = require("crypto");

/**
 * @dev NPM/YARN registry package
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

/**
 * @models
 */
const User = require("../../models/User");
const UserAuth = require("../../models/UserAuth");

module.exports = {
  /**
   * * controller: create new documnet on mongo db collection
   * */
  createNewUser: (req, res) => {
    const { email, full_name, date_of_birth, password } = req.body;

    /** @dev Generate the value with a cryptographically
     * strong random number generator and do not hardcode it in source code.
     * * Recommended from Snyk Vulnerability Scanner
     * */
    crypto.randomInt(3, (err, cryptographicallySecuredRandomNumber) => {
      if (err) throw err;

      const _id = new mongoose.Types.ObjectId();

      const createUserModel = User.create({
        _id,
        full_name,
        date_of_birth,
      });

      const createUserAuthModel = UserAuth.create({
        _id,
        email,
        password: bcrypt.hashSync(
          password,
          cryptographicallySecuredRandomNumber
        ),
      });

      /** @dev handle promise synchronously at once with error handling */
      Promise.all([createUserModel, createUserAuthModel])
        .then(() => {
          res.status(200).json({
            sytatus: 200,
            message: "User created successfully",
          });
        })
        .catch((err) => console.log(err));
    });
  },

  /**
   * * controller: get user details
   * */
  getUserDetails: (req, res) => {},

  /**
   * * controller: get user auth details
   * */
  getUserAuthDetails: (req, res) => {},

  /**
   * * controller: update user details
   * */
  updateUserDetails: (req, res) => {},

  /**
   * * controller: update user auth details
   * */
  updateUserAuthDetails: (req, res) => {},

  /**
   * * controller: delete user details
   * 1. Delete Users Table
   * 2. Delete UserAuth Table
   * */
  deleteUser: (req, res) => {},
};
