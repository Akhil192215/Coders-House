const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const liveChatSchema = new Schema(
  {
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("liveChats", liveChatSchema, "liveChat");
