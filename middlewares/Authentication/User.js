module.exports = {
  /**
   * * middleware: validate user, user auth details
   */
  createNewUserMiddleware: (req, res, next) => {
    /**
     * @dev check if all the required fields are present except email
     */
    next();
  },

  /**
   * * middleware: generate registration token for user and send to mail
   */
  generateRegistrationTokenMiddleware: (req, res) => {
    /**
     * * 1. check if the email is already registered
     * * 2. generate a token and mail it to the user
     * */
  },

  validateRegistrationTokenMiddleware: (req, res) => {
    /**
     * * 1. check if the token is valid
     * * 2. if valid, go to next step to create user
     * */
  },
};
