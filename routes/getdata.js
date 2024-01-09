// const express = require("express");
// const router = express.Router();
// const User = require("../models/user.js");

// const { authenticateToken } = require("../middleware/jwtValidator.js")
// const authenticateMiddleware = authenticateToken(process.env.JWT_SECRET);
// console.log("==============", authenticateMiddleware)
require('dotenv').config();



// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     console.error('Error fetching all user data:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const {authenticateToken} = require("../middleware/jwtValidator.js");  

router.get("/", authenticateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching all user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
