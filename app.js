const express = require("express");
const helmet = require("helmet");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cron = require("node-cron");

const app = express();

/**
 * @dev Using Helmet middleware, because it exposes
 * information about the used framework to potential attackers.
 * * Resource: https://helmetjs.github.io/
 */
app.use(helmet());

/**
 * @dev using csurf middleware for your Express app t
 * o protect against CSRF attacks
 * * Reference: https://medium.com/dataseries/prevent-cross-site-request-forgery-in-express-apps-with-csurf-16025a980457
 * */
const csrfProtection = csrf({ cookie: true });
/**
 * @dev we need this because "cookie" is true in csrfProtection
 */
app.use(cookieParser());

/**
 * @dev allow cross origin resource sharing
 */
app.use(cors());

/**
 * @dev log server request and response
 */
app.use(morgan("dev"));

/**
 * @dev parse request and response data e.g. urlencoded and json data
 */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * @dev mongo db configuration
 * * Cloud setup since Mac OSX M1 Processor does not support MongoDB Compass
 * * Make sure the DB_URI is set in environment variable
 */
mongoose.connect(
  process.env.MONGO_DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    /**
     * @param error on databse connection
     */
    if (err) return console.log(err);
    else console.log("Database Connected => MeroBhav Core...");
  }
);

/**
 * @dev Routers Configuration
 */
const AuthRouter = require("./routes/Authentication/Auth");
/** 
 * @dev For Production
 * REST API has been designed to be used in a browser
 * security feature that ensures that external websites cannot call this endpoint
 */

// app.use("/api/auth", csrfProtection, AuthRouter);
// @dev development
app.use("/api/auth", AuthRouter);

/**
 * @dev handling 404 api request from client
 */
app.use((req, res) => {
  res.status(404).json({ message: "404 API not found!" });
});

/**
 * @dev remove expired email registration tokens
 * * Exectued every 5 minutes
 */
const VerifiedTokens = require("./models/VerifiedTokens");
cron.schedule('*/5 * * * *', () => {
  // const tokens = await VerifiedTokens.find();
  // console.log(tokens);

  /** filter expired tokens and remove it */
});

module.exports = app;
