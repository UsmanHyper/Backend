const mongoose = require("mongoose");

const vanderSchema = new mongoose.Schema({
    email: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
    number: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true },
    catagory: [{
        services: { type: String, required: true, enum: ['food', 'dj', 'photographer', 'decor'] }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Vander = mongoose.model("Vander", vanderSchema);

module.exports = Vander;
