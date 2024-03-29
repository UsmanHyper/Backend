const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema({


    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    user_contact: { type: String, required: true },
    user_address: { type: String, required: true },
    user_gender: { type: String, required: true },
    user_catagory: { type: String, required: true },
    email: {
        type: String, required: true, index: {
            unique: true
        },
        match: /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },

    password: { type: String, required: true },
    user_salary: { type: String,  required: true },
    user_image: { type: String,  required: true },
    write: { type: String, required: false },
    date: {
        type: Date,
        default: Date.now
    }
});
const UserModel = mongoose.model("UserModel", userModelSchema);

module.exports = UserModel;
