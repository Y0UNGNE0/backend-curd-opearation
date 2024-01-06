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
    type: String, // Assuming the profile image will be stored as a file path
  },
});

module.exports = mongoose.model("User", UserSchema);
