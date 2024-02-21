const express = require('express');
const router = express.Router();
const Branch = require('../../models/branch/myBranch.js');

router.get('/branches', async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const search = req.query.search || "";

        const order = req.query.orderby || "asc";
        const sort = req.query.sortby || "branch_name";

        let orderby = {};
        if (order.toLowerCase() === "asc") {
            orderby[sort] = 1; // 1 for ascending order, -1 for descending order
        } else {
            orderby[sort] = -1; // Assuming ascending order by default, modify as needed
        }

        const location = req.query.location || "";
        const startDate = req.query.startDate ? new Date(req.query.startDate) : null;
        const endDate = req.query.endDate ? new Date(req.query.endDate) : null;
        const peopleCapacity = req.query.peopleCapacity ? parseInt(req.query.peopleCapacity) : null;

        const match = {
            $and: [
                { branch_name: { $regex: search, $options: "i" } },
                location ? { branch_address: { $regex: new RegExp(location, 'i') } } : {},
                startDate ? { startDate: { $gte: startDate } } : {},
                endDate ? { endDate: { $lte: endDate } } : {},
                peopleCapacity ? { people_capacity: { $gte: peopleCapacity } } : {},
            ],
        };

        const total = await Branch.countDocuments(); // Count all branches

        const branches = await Branch.find(match).skip(skip).limit(limit).sort(orderby);



        if (branches.length > 0) {
            res.status(200).json({
                status: "Success",
                data: { branches },
                message: "Branches fetched successfully",
                currentPage: page,
                totalDatainData: branches.length,
                totalData: total,
                nextPage: total > skip + limit,
                prevPage: page !== 1,
            });
        } else {
            res.status(404).json({ status: 404, error: "No branches found" });
        }
    } catch (error) {
        console.error("Error fetching branch data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;
