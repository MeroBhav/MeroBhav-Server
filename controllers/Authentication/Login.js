const UserAuth = require("../../models/UserAuth");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  /**
   * Controller: User Auhtentication
   *
   * Algorithm:
   * 1. compare password
   * 2. generate jwt token & refreshToken
   * 3. Return success
   * */
  userAuthentication: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserAuth.findOne({ email });

      const isPasswordMatch = bcrypt.compareSync(password, user?.password);

      if (!isPasswordMatch)
        return res.status(401).json({
          message: "Invalid password",
          status: 401,
        });

      /**
       * @dev Access token normally should last 60 days & Refresh Token for a year
       * * Reference: https://docs.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens
       */
      const token = await jwt.sign(
        {
          data: user?._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1140h" }
      );

      const refreshToken = await jwt.sign(
        {
          data: user?._id,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "8760h" }
      );

      return res.status(200).json({
        message: "User authenticated",
        status: 200,
        token,
        refreshToken,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
