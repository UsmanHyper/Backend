const mongoose = require("mongoose");

const catagoryItemSchema = new mongoose.Schema({

    catagory_name: { type: String, required: true },
    catagory_description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const CatagoryItem = mongoose.model("Branch", catagoryItemSchema);

module.exports = CatagoryItem;
