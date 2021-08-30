const mongoose = require("mongoose");

const buffSchema = new mongoose.Schema({
  discord_id: {
    type: String,
    required: false,
    min: 18,
    max: 18,
    match: /^[0-9]+$/,
    default: "",
  },
  buff_name: {
    type: String,
    required: true,
    min: 1,
    max: 512,
    default: "",
  },
  createdAt: { type: Date, default: Date.now },
  expireAt: { type: Date, default: undefined },
});

buffSchema.index({ "expireAt": 1 }, { expireAfterSeconds: 0 });
module.exports = mongoose.model("buff", buffSchema);
