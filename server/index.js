"use strict";

const express = require("express");
var cors = require("cors");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var allowlist = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://nurlightllc.com",
  "https://www.nurlightllc.com",
];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate));

app.get("/", (req, res) => {
  res.send("Hello!");
});

//database
const sequelize = require("./database");

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Routes
const productRouter = require("./routers/product");
const categoryRouter = require("./routers/category");
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const orderRouter = require("./routers/order");

app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/order",orderRouter)

app.listen(process.env.PORT, () => {
  console.log(
    process.env.NODE_ENV && process.env.NODE_ENV === "development"
      ? `Started: http://localhost:${process.env.PORT}`
      : "Started: https://nurlightapi.herokuapp.com/"
  );
});
