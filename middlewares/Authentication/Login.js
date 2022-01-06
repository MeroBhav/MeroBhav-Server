const jwt = require("jsonwebtoken");
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

  /**
   * Middleware: Token Verification
   *
   * Algorithm:
   * 1. Get token from header [token, refresh_token]
   * 2. check if valid
   * 3. if valid return success
   * 4. if invalid token check refresh token
   * 5. if valid refresh token generate new refresh and access token
   * 6. if all invalid return error
   * 7. else return success
   * */
  verifyTokenMiddleware: async (req, res, next) => {
      try {
          let { access_token, refresh_token } = req.headers;
          
          access_token = access_token.split(" ")[1];
          refresh_token = refresh_token.split(" ")[1];
          
          console.log(req.headers)

      jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        // @dev check if access token is expired or invalid
        if (err)
          jwt.verify(
            refresh_token,
            process.env.JWT_SECRET_KEY,
            async (err, decoded) => {
              // @dev if both tokens are invalid or expired return error
              if (err)
                return res.status(401).json({
                  message: "Invalid token",
                  status: 401,
                });
              else {
                next();

                try {
                  const token = await jwt.sign(
                    {
                      data: decoded?.data,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "1140h" }
                  );

                  const refreshToken = await jwt.sign(
                    {
                      data: decoded?.data,
                    },
                    process.env.JWT_SECRET_KEY,
                    { expiresIn: "8760h" }
                  );

                  res.status(200).json({
                    message: "Token verified",
                    status: 200,
                    token,
                    refreshToken,
                  });
                } catch (error) {
                  console.log(error);
                }
              }
            }
          );
        // @dev if access token is valid
        else next();
      });
    } catch (error) {
      console.log(error);
    }
  },
};
