require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const dbConnect = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json({ strict: false, limit: "8mb" }));
app.use(express.urlencoded());
app.use(cookieParser());
app.use("/storage", express.static("storage"));
dbConnect();
const corsOption = {
  credentials: true,
  origin: ["http://localhost:3000"],
};
app.use(cors(corsOption));

app.get("/", (req, res) => {
  res.send("hello from express ");
});
const PORT = process.env.PORT || 4000;
app.use(router);
app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
