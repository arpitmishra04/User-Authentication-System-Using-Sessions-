const mongoose = require("mongoose");
const MongooseSchema = mongoose.Schema;

const UserSchema = new MongooseSchema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
