require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connection");
const cors = require("cors");
const router = require("./routes/router");
const cookieParser = require("cookie-parser");

const Products = require("./models/productSchema");

const DefaultData = require("./defaultData");

app.use(cookieParser(""));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(router);

const port = 8004;

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});

DefaultData();
