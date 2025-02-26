const express = require("express");
const router = express.Router();
const Collaboration = require("../models/Collaboration");

// Create a new collaboration trip
router.post("/", async (req, res) => {
  try {
    const { destination, budget, days, timeSlots, members } = req.body;

    if (!destination || !budget || !days) {
      return res.status(400).json({ error: "Please provide all required fields." });
    }

    const newTrip = new Collaboration({
      destination,
      budget,
      days,
      timeSlots,
      members,
    });

    await newTrip.save();
    res.json({ message: "Trip saved successfully!", trip: newTrip });
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({ error: "Server error. Please try again." });
  }
});

module.exports = router;
