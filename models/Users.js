const mongoose = require("mongoose");

// Schema
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  passWord: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
