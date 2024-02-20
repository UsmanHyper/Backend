const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branch_name: { type: String, required: true },
    branch_description: { type: String, required: false },
    branch_contact: { type: String, required: true },
    branch_city: { type: String, required: false },
    branch_area: { type: String, required: false },
    branch_address: { type: String, required: true },
    branch_geocordinate: { type: String, required: true },
    branch_type: { type: String, required: true, enum: ['hall', 'marquee'] },
    parking_capacity: { type: String, required: true },
    image: { type: String, required: [true, "Please Upload an Image"] },
    outdoor: { type: Boolean, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
