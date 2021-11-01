const ExampleModel = require("../models/ExampleModel");

/**
 * @dev NPM/YARN registry package
 */
const mongoose = require("mongoose");

/**
 * @dev Get Controller is not defined below since it's done inline in Route i.e. ExampleRoute
 */

module.exports = {
  /**
   * * POST Controller
   */
  /**
   * @param {*} req => all the client request like payloads, authorization data are passed
   * through {req} i.e. request naming is custom so it could be simply {request} rather than {req}
   *
   * @param {*} res => after all the processing been done response data like message,
   * status codes are transferred back to client from res i.e. response. Again naming is custom
   *
   * @dev NOTE: controller is asynchronous and is assigned using {async} keyword before function
   * below the function is arrow function introduced in EcmaScript 6 simple es6.
   */
  postController: async (req, res) => {
    try {
      /**
       * * Generating {_id} for document, remember we planned to add custom {_id} in schema
       */
      const _id = new mongoose.Types.ObjectId();

      /**
       * @dev method to create new document i MongoDB
       * @param On parameter we simply post the same JSON like data defined in schema model
       */
      await ExampleModel.create({
        /**
         * @dev if key and value of object in js is same i.e. _id(key) = _id(value) then simply we can
         * put keyname and value will be assigned auto
         * {
         *    _id: _id
         * } or
         * {
         *    _id
         * }
         * @dev they are same.
         */
        _id,
        /**
         * @dev since we sent post request with payload {message} from client side. {req} holds
         * all the payload data from the client.
         */
        message: req.body.message,
      });

      /**
       * @dev Finally response is transferred through {res} to the client
       * here res.status holds the response status where 200 stands for OK
       * simply read the documentation code to know about more 3**,4**,5** status codes
       * and as we sent simplt res.send() in get controller we can send json data in response as
       * well since we're using body-parser package
       */
      res.status(200).json({
        message: "New data saved to database sucessfully!",
      });
    } catch (error) {
      /**
       * @dev on any database or asynchronous error it's handled in catch method
       */
      console.log(error);
    }
  },
  /**
   * * PATCH Controller
   */
  patchController: async (req, res) => {
    try {
      /**
       * @dev payloads can be destructered for better usability
       * it's a feature of JS
       */
      const { _id, newMessage } = req.body;

      /**
       * @dev method to update document
       * @param: 1st param is used to select exact document
       * it can be {_id} or any unique identifier
       *
       * @param: 2nd paramter holds the json data that needs to be updated and
       * should be structured like schema model i.e. the key should exist in schema
       *
       * @dev On updating database there might be different error so it can be handled as well using
       * conditionals by assigning response to a vailable
       *
       * i.e. const updateResponse = await ExampleModel.updateOne({...}, {...})
       * * if(updateResponse.error && updateResponse.error.details){
       * *    return res.status(400).json({message: updateResponse.error.details})
       * * } else{
       * *   ...Success response
       * * }
       */
      await ExampleModel.updateOne(
        { _id },
        {
          $set: {
            message: newMessage,
          },
        }
      );

      res.status(200).send("Updated Successfully!");
    } catch (error) {
      console.log(error);
    }
  },
  /**
   * * DELETE Controller
   */
  deleteController: async (req, res) => {
    const { _id } = req.body;

    try {
      /**
       * @dev again error can be handled using conditionals
       */
      await ExampleModel.deleteOne({ _id });

      res.status(200).send("Delete Successfully!");
    } catch (error) {
      console.log(error);
    }
  },
};

/**
 * * exporting controllers can be done in different way
 * i.e.
 * ! const getController = function (req, res) {
 * ! ...
 * ! }
 *
 * ! module.exports = {getController}
 * @dev if only getController then
 * ! module.exports = getController;
 * * but for multiple controllers
 * * module.exports = {getController, postController,.,.}
 */
