const mongoose = require("mongoose");

const {Schema} = mongoose;

const AdminRefreshSchema = new Schema(
  {
    token: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "Admin" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AdminRefresh", AdminRefreshSchema, "AdminTokens");
