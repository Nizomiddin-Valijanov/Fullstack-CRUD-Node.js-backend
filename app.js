const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());

app.use("/api/", require("./routes/router"));

app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
