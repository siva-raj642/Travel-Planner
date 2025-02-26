import { useState } from "react";

const Collaborations = () => {
    const [destination, setDestination] = useState("");
    const [budget, setBudget] = useState("");
    const [days, setDays] = useState(1);
    const [members, setMembers] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [newMember, setNewMember] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Handle input change
    const handleInputChange = (setter) => (e) => setter(e.target.value);

    // Add members
    const handleAddMember = () => {
        if (newMember && !members.includes(newMember)) {
            setMembers([...members, newMember]);
            setNewMember("");
        }
    };

    // Add itinerary slot
    const handleAddTimeSlot = (dayIndex) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].timeSlots.push({ time: "", place: "" });
        setItinerary(updatedItinerary);
    };

    // Update itinerary slot
    const handleItineraryChange = (dayIndex, slotIndex, field, value) => {
        const updatedItinerary = [...itinerary];
        updatedItinerary[dayIndex].timeSlots[slotIndex][field] = value;
        setItinerary(updatedItinerary);
    };

    // Handle days change
    const handleDaysChange = (e) => {
        const numDays = parseInt(e.target.value, 10) || 1;
        setDays(numDays);
        setItinerary(Array.from({ length: numDays }, () => ({ timeSlots: [] })));
    };

    // Save Trip
    const handleSaveTrip = async () => {
        setError("");
        setSuccess("");

        const tripData = { destination, budget, days, members, itinerary };

        try {
            const response = await fetch("http://localhost:5000/api/trips", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(tripData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to save trip.");
            }

            setSuccess("Trip saved successfully!");
            setDestination("");
            setBudget("");
            setDays(1);
            setMembers([]);
            setItinerary([]);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4">Plan a Collaborative Trip</h1>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            <div className="mb-4">
                <label className="block font-semibold">Destination:</label>
                <input
                    type="text"
                    value={destination}
                    onChange={handleInputChange(setDestination)}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Budget:</label>
                <input
                    type="number"
                    value={budget}
                    onChange={handleInputChange(setBudget)}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Number of Days:</label>
                <input
                    type="number"
                    value={days}
                    onChange={handleDaysChange}
                    className="border p-2 w-full"
                />
            </div>

            <div className="mb-4">
                <label className="block font-semibold">Add Members (by Email):</label>
                <input
                    type="email"
                    value={newMember}
                    onChange={handleInputChange(setNewMember)}
                    className="border p-2 w-full"
                    placeholder="Enter member's email"
                />
                <button onClick={handleAddMember} className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
                    Add
                </button>
                <ul>
                    {members.map((member, index) => (
                        <li key={index} className="text-gray-700">{member}</li>
                    ))}
                </ul>
            </div>

            {itinerary.map((day, dayIndex) => (
                <div key={dayIndex} className="border p-4 mb-4 rounded">
                    <h3 className="font-semibold">Day {dayIndex + 1}</h3>
                    {day.timeSlots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex space-x-2 mt-2">
                            <input
                                type="time"
                                value={slot.time}
                                onChange={(e) => handleItineraryChange(dayIndex, slotIndex, "time", e.target.value)}
                                className="border p-2"
                            />
                            <input
                                type="text"
                                value={slot.place}
                                onChange={(e) => handleItineraryChange(dayIndex, slotIndex, "place", e.target.value)}
                                className="border p-2"
                                placeholder="Enter place"
                            />
                        </div>
                    ))}
                    <button onClick={() => handleAddTimeSlot(dayIndex)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                        + Add Another Time Slot
                    </button>
                </div>
            ))}

            <button onClick={handleSaveTrip} className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
                Save Collaborative Trip
            </button>
        </div>
    );
};

export default Collaborations;

