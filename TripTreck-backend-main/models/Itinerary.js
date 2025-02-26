const mongoose = require("mongoose");

const ItinerarySchema = new mongoose.Schema({
    destination: { type: String, required: true },
    budget: { type: Number, required: true },
    days: { type: Number, required: true },
    itinerary: { type: Object, required: true },
});

module.exports = mongoose.model("Itinerary", ItinerarySchema);
