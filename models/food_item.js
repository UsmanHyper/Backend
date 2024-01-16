const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({

    item_name: { type: String, required: true },
    item_catagory: { type: String, required: true },
    item_price: { type: String, required: true },
    item_image: { type: String, required: [true, "Please Upload an Image"] },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const FoodItem = mongoose.model("Branch", foodItemSchema);

module.exports = FoodItem;
