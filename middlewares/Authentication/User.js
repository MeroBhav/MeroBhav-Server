const UserAuth = require("../../models/UserAuth");
const VerifiedTokens = require("../../models/VerifiedTokens");

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
  generateRegistrationTokenMiddleware: async (req, res) => {
    try {
      /**
       * * 1. check if the email is already registered
       * * 2. generate a token and mail it to the user
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
      const token = await crypto.randomInt(9999, 99999);

      // create 5 minute time
      let currentDate = new Date(),
        expiryDate = new Date(currentDate);
      expiryDate.setMinutes(currentDate.getMinutes() + 5);
      
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
        subject: "Email Verification Code 🔥",
        html: `${token} is your MeroBhav verification code. This code will be valid for 5 minutes. Don't share this code with anyone.`,
      });

      /** @dev response success on mail sent */
      res.status(200).json({
        message: "Success",
        status: 200,
      });
    } catch (error) {
      console.log(error);
    }
  },

  validateRegistrationTokenMiddleware: (req, res) => {
    /**
     * * 1. check if token exists
     * * 2. if valid, go to next step to create user
     * */
  },
};
