const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  std_id: {
    type: String,
    required: true,
    min: 8,
    max: 8,
    index: true,
    unique: true,
    match: /^[0-9]+$/,
  },
  discord_id: {
    type: String,
    required: false,
    min: 18,
    max: 18,
    match: /^[0-9]+$/,
    default: "",
  },
  name: {
    type: String,
    required: true,
    max: 256,
  },
  house: {
    type: String,
    required: true,
    max: 16,
  },
  coin: {
    type: Number,
    required: false,
    default: 0,
  },
  coinlog: [
    {
      _id: false,
      event: {
        type: String,
        required: false,
        default: "",
      },
      coin: {
        type: Number,
        required: false,
        default: 0,
      },
      giver: {
        type: String,
        required: false,
        default: "",
      },
    },
  ],
  year: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("player", userSchema);
