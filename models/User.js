const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const returnType = (type, require, requiredMessage) => {
  return {
    type,
    require: require === true ? [require, requiredMessage] : [false],
  };
};

const UserSchema = new Schema({
  _id: ObjectId,

  full_name: returnType("string", true, "Full Name is required"),
  date_of_birth: returnType("string", true, "Date of Birth is required"),
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: Date,
});

module.exports = mongoose.model("user", UserSchema);
