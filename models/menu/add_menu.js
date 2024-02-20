const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({

    food_name: { type: String, required: true },
    food_description: { type: String, required: true },
    food_per_head: { type: String, required: true },
    food_per_head: { type: String, required: true },
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch' },
    catagoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'CatagoryItem' },
    image: { type: String, required: [true, "Please Upload an Image"] },

    createdAt: {
        type: Date,
        default: Date.now
    }
});
const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
