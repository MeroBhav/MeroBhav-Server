const express = require("express");
const {
  postController,
  patchController,
  deleteController,
} = require("../controllers/ExampleController");
const { exampleMiddleware } = require("../middlewares/ExampleMiddleware");
const ExampleRouter = express.Router();

/**
 * * Example GET Request
 * * No data is changed i.e. READ Only Access
 * @param (path for request, controller)
 * @dev there can be multiple controllers or middlewares
 * e.g. ...get("/abc", controllerOne, controllerTwo, ...)
 */

/**
 * @dev here conventional function is used rather than es6 arrow function
 * which is defined in controllers i.e {ExampleController.js}
 */
ExampleRouter.get("/get-example", function controller(req, res) {
  res.status(200).send("Welcome to my Server, Cheers 🥂");
});

/**
 * * Example POST Request
 * * New Data is inserted i.e. READ and WRITE Access
 */
ExampleRouter.post("/post-example", postController);

/**
 * * Example PATCH Request
 * * Existing data is updated, PATCH === Update i.e. READ and UPDATE Access
 */
ExampleRouter.patch("/patch-example", patchController);

/**
 * * Example DELETE Request
 */
ExampleRouter.delete("/delete-example", deleteController);

/**
 * @dev using middleware on request
 * * NOTE: middleware are simply controllers
 */
ExampleRouter.get("/example-middleware", exampleMiddleware , (req, res) => res.send("I'm unable to reach if condition is unfulfilled!"))

module.exports = ExampleRouter;
