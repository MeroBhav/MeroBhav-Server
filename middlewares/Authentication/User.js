/** @models */
const UserAuth = require("../../models/UserAuth");
const VerifiedTokens = require("../../models/VerifiedTokens");

module.exports = {
  /**
   * * middleware: validate user, user auth details
   */
  createNewUserMiddleware: (req, res, next) => {
    /**
     * @dev Algorithm to validate new user
     * * 1. Use Regex for Email, Password
     * * 2. Check if everything is valid and !null
     * * 3. Continue
     */

    const { email, password } = req.body;

    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordHasUpper = password.match(/[A-Z]/);
    const passwordHasLower = password.match(/[a-z]/g);
    const passwordHasNumber = password.match(/[0-9]/g);
    const isValidEmail = regexEmail.test(email);

    if (isValidEmail && passwordHasUpper && passwordHasLower && passwordHasNumber) next();
    else
      res.status(400).json({
        message: "Invalid email or password",
        status: 400,
      });
  },

  /**
   * * middleware: generate registration token for user and send to mail
   */
  generateRegistrationTokenMiddleware: async (req, res) => {
    try {
      /**
       * @dev Algorithm to generate registration token
       * * 1. check if the email is already registered
       * * 2. if registered return error
       * * 3. generate a token
       * * 4. save the token in the database
       * * 5. send the token to the user's email
       * * 6. return success
       * */

      /** @dev check if the email is already registered */
      const { email } = req.body;
      const existingUser = await UserAuth.findOne({ email });

      if (existingUser)
        return res.status(409).json({
          message: "User already exists!",
          status: 409,
        });

      /** @dev generate a token and mail it to the user */
      const crypto = require("crypto");
      const token = await crypto.randomInt(100000, 999999);

      // create 5 minute time
      let currentDate = new Date(),
        expiryDate = new Date(currentDate);
      expiryDate.setMinutes(currentDate.getMinutes() + 5);

      /** @dev response success on mail sent */
      res.status(200).json({
        message: "Success",
        status: 200,
      });

      await VerifiedTokens.create({ token, expires_at: expiryDate });

      const nodemailer = require("nodemailer");

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      /** @dev send generated token to user email */
      await transporter.sendMail({
        from: '"MeroBhav" <support@merobhav.com>',
        to: `${email}`,
        subject: "Email Verification Code ????",
        html: `${token} is your MeroBhav verification code. This code will be valid for 5 minutes. Don't share this code with anyone.`,
      });
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * * middleware: validate registration token
   */
  validateRegistrationTokenMiddleware: async (req, res) => {
    /**
     * @dev Algorithm to validate registration token
     * * 1. findtoken from db
     * * 2. if token exists, check if it is expired
     * * 3. if does not exists, return error to client
     * * 4. else return success
     * * 5. remove token from db
     * */
    try {
      const { token } = req.body;
      console.log(token);

      const tokenExists = await VerifiedTokens.findOne({ token });

      if (!tokenExists)
        return res.status(404).json({
          message: "Token does not exist!",
          status: 404,
        });

      const currentDate = new Date();
      if (currentDate > tokenExists.expires_at) {
        res.status(401).json({
          message: "Token has expired!",
          status: 401,
        });

        return await VerifiedTokens.deleteOne({ token });
      }

      /** @dev response success */
      res.status(200).json({
        message: "Valid",
        status: 200,
      });

      await VerifiedTokens.deleteOne({ token });
    } catch (error) {
      console.log(error);
    }
  },
};
