const mongoose = require("mongoose");

const hallSchema = new mongoose.Schema({

    hall_title: { type: String, required: true },
    hall_building: { type: String, required: true },
    building_floor: { type: String, required: true },
    building_washroom: { type: String, required: true },
    no_of_partition: { type: String, required: true },
    image: { type: String, required: [true, "Please Upload an Image"] },
    hall_bridal_room: { type: String, required: true },
    branch_geocordinate: { type: String, required: true },
    no_of_building: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Halls = mongoose.model("Branch", hallSchema);

module.exports = Halls;
