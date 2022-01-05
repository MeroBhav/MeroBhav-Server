const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const returnType = (type, require, requiredMessage) => {
  return {
    type,
    require: require === true ? [require, requiredMessage] : [false],
  };
};

const UserAuthSchema = new Schema({
  _id: ObjectId,

  email: returnType("string", true, "Email is required"),
  password: returnType("string", true, "Password is required"),
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: Date,
});

module.exports = mongoose.model("user_auth", UserAuthSchema);
