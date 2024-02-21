// const mongoose = require("mongoose");

// const vanderSchema = new mongoose.Schema({
//     // email: { type: String, unique: true, sparse: true, trim: true, lowercase: true },
//     email: {
//         type: String, index: {
//             unique: true, sparse: true, trim: true, lowercase: true,
//         },
//         match: /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
//     },
//     name: { type: String, required: true },
//     address: { type: String, required: true },

//     number: { type: String, unique: true, sparse: true, trim: true },
//     password: { type: String, required: true },
//     catagory: [{
//         services: { type: String, required: true, enum: ['food', 'dj', 'photographer', 'decor'] }
//     }],
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     services: [{}],
// });

// const Vander = mongoose.model("Vander", vanderSchema);

// module.exports = Vander;


const mongoose = require("mongoose");

const featuredServicesSchema = new mongoose.Schema({
    feature_name: { type: String, required: true },
    // Add other properties for featured services as needed
});

const serviceSchema = new mongoose.Schema({
    service_name: { type: String, required: true },
    featured_services: [featuredServicesSchema], // Nested array for featured services
    // Add other properties for services as needed
});

const categorySchema = new mongoose.Schema({
    category_name: { type: String, required: true },
    services: [serviceSchema], // Nested array for services
    // Add other properties for categories as needed
});

const vanderSchema = new mongoose.Schema({
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true,
            trim: true,
            lowercase: true,
        },
        match: /[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    name: { type: String, required: true },
    address: { type: String, required: true },
    number: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true },
    catagory: [{
        category_name: { type: String, required: true, enum: ['food', 'dj', 'photographer', 'decor'] },
        services: [serviceSchema], // Nested array for services within each category
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    services: [{}],
});

const Vander = mongoose.model("Vander", vanderSchema);

module.exports = Vander;
