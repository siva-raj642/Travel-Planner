const express = require("express");
const Itinerary = require("../models/Itinerary"); // Import the model

const router = express.Router();

// ✅ Save a new trip itinerary
router.post("/", async (req, res) => {
    try {
        const newTrip = new Itinerary(req.body);
        await newTrip.save();
        res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
    } catch (error) {
        console.error("Error saving trip:", error);
        res.status(500).json({ error: "Failed to save trip" });
    }
});

// ✅ Get all saved itineraries
router.get("/", async (req, res) => {
    try {
        const itineraries = await Itinerary.find();
        res.json(itineraries);
    } catch (error) {
        console.error("Error fetching itineraries:", error);
        res.status(500).json({ error: "Failed to load itineraries" });
    }
});

module.exports = router;


