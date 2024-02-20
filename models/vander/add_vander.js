const mongoose = require("mongoose");

const vanderSchema = new mongoose.Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    catagory: { type: String, required: true },
    featured: [{
        services: { type: String, required: true }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Vander = mongoose.model("Vander", vanderSchema);

module.exports = Vander;
