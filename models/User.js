const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  type: {
    type: String,
  },
  salary: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
