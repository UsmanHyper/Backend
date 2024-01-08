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