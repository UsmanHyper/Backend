const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { authenticateToken } = require("../middleware/jwtValidator.js");


router.patch("/:userId", authenticateToken, async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUserData = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      updatedUserData,
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
