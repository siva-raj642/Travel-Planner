const express = require("express");
const Travel = require("../models/Travel");
const router = express.Router();

// Add Travel Data
router.post("/add", async (req, res) => {
  try {
    const travel = new Travel(req.body);
    await travel.save();
    res.status(201).json({ message: "Travel data added successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Travel Data
router.get("/", async (req, res) => {
  try {
    const data = await Travel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
