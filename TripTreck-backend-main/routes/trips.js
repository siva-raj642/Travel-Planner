const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip"); // Trip model

// Save Solo Trip
router.post("/save-trip", async (req, res) => {
  try {
    const newTrip = new Trip(req.body);
    await newTrip.save();
    res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
  } catch (error) {
    res.status(500).json({ error: "Error saving trip" });
  }
});

module.exports = router;
