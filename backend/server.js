require("dotenv").config();
const express = require("express");
const router = require('./routes')
const app = express();
const dbConnect = require('./database')
app.use(express.json())
dbConnect()



app.get("/", (req, res) => {
  res.send("hello from express ");
});
const PORT = process.env.PORT || 4000;
app.use(router)
app.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
