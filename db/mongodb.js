// // const express = require("express");
// const mongoose = require("mongoose");
// // const bodyParser = require("body-parser");
// // const cors = require("cors");
// // const bcrypt = require("bcrypt");
// // const jwt = require("jsonwebtoken");
// // const app = express();
// // const PORT = 3000;

// // // Middleware
// // app.use(cors());
// // app.use(bodyParser.json());



// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/admin', {
// // mongoose.connect('mongodb+srv://usmanDb:Allahis1..@demo.kzo4w7r.mongodb.net/', {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// });

const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/admin', {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

module.exports = mongoose.connection;