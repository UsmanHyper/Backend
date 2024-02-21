const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/vander/add_vander");
require('dotenv').config();

let token
let payload
let user
let dt
let passwordMatch

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the database
    user = await User.findOne({
      $or: [
        { email: vendorData.email },
        { number: vendorData.number },
      ]
    });

    if (email == "" || password == "") {
      res.status(401).json({ status: "401", message: 'Email and Password Should be Entered' });
    }
    else {

      passwordMatch = await bcrypt.compare(password, user?.password);
      if (user) {
        payload = {
          userId: date?._id,
          email: date?.email,
          date: date?.date,
        };

      } else {
        return
      }

      // Generate a JWT token
      token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

      if (passwordMatch) {
        res.status(200).json({ status: "200", token: token, userId: dt._id, data: payload });
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
