const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema({
  discord_id: {
    type: String,
    required: true,
    min: 18,
    max: 18,
    match: /^[0-9]+$/,
    default: "",
  },
  bet: {
    type: Number,
    required: true,
    default: 0,
  },
  profit: {
    type: Number,
    required: true,
    default: 0,
  },
  result: {
    type: String,
    required: false,
    default: "",
  },
  emoji: [
    {
      _id: false,
      icon: {
        type: String,
        required: false,
        default: "",
      },
      member: {
        type: Array,
        required: false,
        default: [],
      },
    },
  ],
});

module.exports = mongoose.model("table", tableSchema);
