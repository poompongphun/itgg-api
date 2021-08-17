const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    max: 256,
    default: ""
  },
  nickname: {
    type: String,
    required: false,
    max: 256,
    default: ""
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 256,
    unique: true,
    match: /^[a-zA-Z0-9]+@it.kmitl.ac.th+$/,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 128,
  },
  join_date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("users", userSchema);
