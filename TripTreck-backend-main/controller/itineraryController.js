const Itinerary = require("../models/Itinerary");

exports.saveItinerary = async (req, res) => {
  try {
    const { tripId, activities, dates } = req.body;
    const newItinerary = new Itinerary({ tripId, activities, dates });
    await newItinerary.save();
    res.status(201).json({ message: "Itinerary saved successfully", itinerary: newItinerary });
  } catch (error) {
    console.error("Error saving itinerary:", error);
    res.status(500).json({ error: "Failed to save itinerary" });
  }
};

exports.getItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find().populate("tripId");
    res.json(itineraries);
  } catch (error) {
    console.error("Error fetching itineraries:", error);
    res.status(500).json({ error: "Failed to retrieve itineraries" });
  }
};
