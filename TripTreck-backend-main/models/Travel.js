const mongoose = require("mongoose");

const TravelSchema = new mongoose.Schema({
  country: { type: String, required: true },
  places: [
    {
      name: { type: String, required: true },
      spots: { type: [String], required: true },
    },
  ],
  route: { type: [String], required: true },
});

module.exports = mongoose.model("Travel", TravelSchema);
