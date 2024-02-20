const mongoose = require("mongoose");

const branchSchema = new mongoose.Schema({
    branch_name: { type: String, required: true },
    branch_description: { type: String, required: false },
    branch_contact: { type: String, required: true },
    branch_address: { type: String, required: true },
    parking_capacity: { type: String, required: true },
    branch_geocordinate: { type: String, required: true },
    branch_type: { type: String, required: true, enum: ['hall', 'marquee'] },
    people_capacity: { type: String, required: true },
    add_floor: { type: String, required: false },
    no_of_halls: { type: String, required: false },
    halls: [{
        name: { type: String, required: true },
        people_capacity: { type: String, required: true },
    }],
    no_of_partitions: { type: String, required: false },
    partitions: [{
        name: { type: String, required: true },
        people_capacity: { type: String, required: true },
    }],
    image: { type: String, required: [true, "Please Upload an Image"] },
    outdoor: { type: Boolean, required: true },
    rent: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Branch = mongoose.model("Branch", branchSchema);

module.exports = Branch;
