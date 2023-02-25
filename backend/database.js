const mongoose = require("mongoose");
function dbConnect() {
  const DB_URL = "mongodb://mongodb:27017/codershouse";
  // Database connection
  mongoose.connect(DB_URL, {});
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });
}

module.exports = dbConnect;
