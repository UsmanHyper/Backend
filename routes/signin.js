const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
require('dotenv').config();


let token

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    if (email == "" || password == "") {
      res.status(401).json({ status: "401", message: 'Email and Password Should be Entered' });
    }
    else if (!user) {
      res.status(401).json({ status: "401", error: 'Invalid Email' });
      return;
    } else {

      const passwordMatch = await bcrypt.compare(password, user.password);
      const payload = {
        userId: user._id,
        email: user.email,
        name: user.name,
        date: user.date,
      };

      // Generate a JWT token
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });


      if (passwordMatch) {
        res.status(200).json({ status: "200", token: token, userId: user._id, data: payload });
      } else {
        res.status(401).json({ status: "401", error: 'Invalid Password' });
      }
    }
  }
  catch (error) {
    res.status(500).json({ status: "500", error: 'Somthing Went Wrong' });
  }
});

module.exports = router;
