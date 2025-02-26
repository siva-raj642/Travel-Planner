import React, { useState } from "react";

const SoloTrip = () => {
  const [trip, setTrip] = useState({
    destination: "",
    budget: "",
    days: "",
    itinerary: {},
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  // Handle days input (dynamically creates itinerary slots)
  const handleDaysChange = (e) => {
    const days = e.target.value;
    setTrip({ ...trip, days, itinerary: generateEmptyItinerary(days) });
  };

  // Generate an empty itinerary based on the number of days
  const generateEmptyItinerary = (days) => {
    let itinerary = {};
    for (let i = 1; i <= days; i++) {
      itinerary[`Day ${i}`] = [{ time: "", place: "" }];
    }
    return itinerary;
  };

  // Handle itinerary updates
  const handleItineraryChange = (day, index, field, value) => {
    const updatedItinerary = { ...trip.itinerary };
    updatedItinerary[day][index][field] = value;
    setTrip({ ...trip, itinerary: updatedItinerary });
  };

  // Add a new time slot for a specific day
  const addTimeSlot = (day) => {
    setTrip((prevState) => ({
      ...prevState,
      itinerary: {
        ...prevState.itinerary,
        [day]: [...prevState.itinerary[day], { time: "", place: "" }],
      },
    }));
  };

  // Handle trip submission
  const handleSave = async () => {
    try {

        console.log(trip);
        const response = await fetch("http://localhost:5000/api/itineraries", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trip),
        });

        if (!response.ok) {
            throw new Error("Failed to save trip.");
        }

        alert("Trip saved successfully!");
    } catch (error) {
        console.error("Save Error:", error);
        alert("Failed to save trip. Please check your server connection.");
    }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Plan Your Solo Trip</h1>
      <p className="text-gray-600 text-center mb-6">
        Customize your journey by adding budget, duration, and a detailed itinerary.
      </p>

      {error && <p className="text-red-500 text-center">{error}</p>}
      {success && <p className="text-green-500 text-center">{success}</p>}

      <div className="bg-white shadow-md p-6 rounded-lg">
        {/* Destination Input */}
        <input
          type="text"
          name="destination"
          placeholder="Enter Destination"
          className="w-full mb-4 p-2 border rounded"
          value={trip.destination}
          onChange={handleChange}
        />

        {/* Budget Input */}
        <input
          type="number"
          name="budget"
          placeholder="Enter Overall Budget"
          className="w-full mb-4 p-2 border rounded"
          value={trip.budget}
          onChange={handleChange}
        />

        {/* Number of Days Input */}
        <input
          type="number"
          name="days"
          placeholder="Enter Number of Days"
          className="w-full mb-4 p-2 border rounded"
          value={trip.days}
          onChange={handleDaysChange}
          min="1"
        />

        {/* Itinerary Planning Section */}
        {trip.days && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Plan Your Itinerary</h3>
            {Object.keys(trip.itinerary).map((day) => (
              <div key={day} className="mb-6 p-4 border rounded-lg shadow-sm">
                <h4 className="text-lg font-semibold">{day}</h4>
                {trip.itinerary[day].map((slot, index) => (
                  <div key={index} className="flex items-center gap-4 mt-2">
                    {/* Time Slot Selection */}
                    <select
                      value={slot.time}
                      onChange={(e) => handleItineraryChange(day, index, "time", e.target.value)}
                      className="p-2 border rounded w-1/3"
                    >
                      <option value="">Select Time</option>
                      <option value="Morning">Morning</option>
                      <option value="Afternoon">Afternoon</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>

                    {/* Place Input */}
                    <input
                      type="text"
                      placeholder="Enter Place"
                      className="p-2 border rounded w-2/3"
                      value={slot.place}
                      onChange={(e) => handleItineraryChange(day, index, "place", e.target.value)}
                    />
                  </div>
                ))}
                {/* Add New Time Slot */}
                <button
                  onClick={() => addTimeSlot(day)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  + Add Time Slot
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Save Trip Button */}
        <button onClick={handleSave} className="w-full bg-orange-500 text-white p-2 rounded mt-4">
          Save Trip
        </button>
      </div>
    </div>
  );
};

export default SoloTrip;


