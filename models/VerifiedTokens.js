const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const returnType = (type, require, requiredMessage) => {
  return {
    type,
    require: require === true ? [require, requiredMessage] : [false],
  };
};

const VerifyTokenSchema = new Schema({
  token: returnType("string", true, "Token is required"),
  created_at: {
    type: Date,
    default: Date.now(),
  },
  expires_at: Date,
});

module.exports = mongoose.model("verified_token", VerifyTokenSchema);
