const UserAuth = require("../../models/UserAuth");

module.exports = {
  /**
   * Middleware: User Exists on Auhtentication
   *
   * Algorithm:
   * 1. check if user exists
   * 2. if not return error
   * 3. if exists return success
   * */
  userExistsOnAuthenticationMiddleware: async (req, res, next) => {
    const { email } = req.body;

    try {
      const user = await UserAuth.findOne({ email });

      if (!user)
        return res.status(404).json({
          message: "User not found",
          status: 404,
        });

      req.user = user;

      next();
    } catch (error) {
      console.log(error);
    }
  },
};
