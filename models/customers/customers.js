const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: Date, required: true },
    image: { type: String, required: true },
    email: {
        type: String, required: true, index: {
            unique: true
        },
        match: /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    phone: { type: String, required: true },
    alter_phone: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    notification: { type: Boolean, required: false }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
