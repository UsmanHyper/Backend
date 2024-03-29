const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    // name: String,
    // email: { type: String, unique: true },
    // password: String,

    name: { type: String, required: true },
    email: {
        type: String, required: true, index: {
            unique: true
        },
        match: /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password: { type: String, required: true },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model("User", userSchema);

module.exports = User;
