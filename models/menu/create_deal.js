const mongoose = require("mongoose");

const dealItemSchema = new mongoose.Schema({

    deal_name: { type: String, required: true },
    description: { type: String, required: true },
    featured_image: [{
        image: { type: String, required: [true, "Please Upload an Image"] },
    }],
    add_item: [{
        item: { type: String, required: false },
    }],
    price: { type: String, required: true },
    discounted_price: { type: String, required: false },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const MenuDeal = mongoose.model("MenuDeal", dealItemSchema);

module.exports = MenuDeal;
