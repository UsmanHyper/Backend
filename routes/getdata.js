const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const { authenticateToken } = require("../middleware/jwtValidator.js");

router.get("/", authenticateToken, async (req, res) => {


  try {
    console.log("----------", req.query)
    const page = Number(req.query.page) || 1;
    const limit =Number(req.query.limit) || 10;
    const skip = (page - 1) * limit
    const sort = req.query.sortby || "name"
    const order = req.query.orderby || "asc"
    const search = req.query.search || ""

    let orderby = {};
    if (order[1]) {
      orderby[order[0]] = order[1];
    } else {
      orderby[sort[0]] = "asc"
    }

    // User = User.skip(skip).limit(limit)
    const total = await User.find();
    const users = await User.find({ name: { $regex: search, $options: "i" } }).skip(skip).limit(limit).sort(order);
    res.status(200).json({
      status: "Sucess",
      data: { users },
      message: "Users fetched successfully",
      currentPage: page,
      totalDatainData: users.length,
      totalData: total.length,
      nextPage: (total.length > 10 ? true : false),
      prevPage: (page !== 1 && total.length > 10 ? true : false),
    });
  } catch (error) {
    console.error('Error fetching all user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
