const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

router.post("/", async (req, res) => {
  try {
    const { userEmail, userPwd } = req.body;

    // Find the user in the database
    const user = await User.findOne({ userEmail });

    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    const passwordMatch = await bcrypt.compare(userPwd, user.userPwd);

    if (passwordMatch) {
      res.status(200).json({ userId: user._id });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Signin Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
