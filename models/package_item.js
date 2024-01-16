const mongoose = require("mongoose");

const packageItemSchema = new mongoose.Schema({

    package_name: { type: String, required: true },
    package_description: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const PackageItem = mongoose.model("Branch", packageItemSchema);

module.exports = PackageItem;
