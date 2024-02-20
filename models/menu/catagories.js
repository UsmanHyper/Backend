const mongoose = require("mongoose");

const catagoriesSchema = new mongoose.Schema({
    catagory_name: { type: String, required: true },
    catagory_description: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CatagoryItem = mongoose.model("CatagoryItem", catagoriesSchema);

module.exports = CatagoryItem;
