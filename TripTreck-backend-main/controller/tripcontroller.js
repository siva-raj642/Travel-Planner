const Trip = require("../models/Trip");

exports.saveTrip = async (req, res) => {
  try {
    const { destination, budget, days, members, itinerary } = req.body;
    const newTrip = new Trip({ destination, budget, days, members, itinerary });
    await newTrip.save();
    res.status(201).json({ message: "Trip saved successfully", trip: newTrip });
  } catch (error) {
    console.error("Error saving trip:", error);
    res.status(500).json({ error: "Failed to save trip" });
  }
};

exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({ error: "Failed to retrieve trips" });
  }
};
