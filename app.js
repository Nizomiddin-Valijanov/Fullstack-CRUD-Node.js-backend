const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
require("dotenv").config();
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");
const swaggerDocs = require("./docs/swagger"); 

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(bodyParser.json());

app.use("/user", authRouter);

app.use("/todo", todoRouter);

swaggerDocs(app, PORT);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
