import { useEffect, useState } from "react";

const SavedItineraries = () => {
    const [itineraries, setItineraries] = useState([]);
    const [error, setError] = useState("");
    const [editing, setEditing] = useState(null); // Track which itinerary is being edited
    const [formData, setFormData] = useState({ destination: "", budget: "", days: "" });

    // Fetch saved itineraries from the backend
    useEffect(() => {
        const fetchItineraries = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries`);
                if (!response.ok) {
                    throw new Error("Failed to load saved itineraries.");
                }
                const data = await response.json();
                console.log(data)
                setItineraries(data);
            } catch (error) {
                console.error("Error fetching itineraries:", error);
                setError(error.message);
            }
        };

        fetchItineraries();
    }, []);

    // Handle Edit
    const handleEdit = (itinerary) => {
        setEditing(itinerary._id);
        setFormData({ destination: itinerary.destination, budget: itinerary.budget, days: itinerary.days });
    };

    // Handle Save Edit
    const handleSave = async (id) => {
        setError("");
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to update itinerary.");
            }

            setItineraries(itineraries.map(it => (it._id === id ? { ...it, ...formData } : it)));
            setEditing(null);
        } catch (error) {
            console.error("Error updating itinerary:", error);
            setError(error.message);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this itinerary?")) return;

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/itineraries/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete itinerary.");
            }

            setItineraries(itineraries.filter(it => it._id !== id));
        } catch (error) {
            console.error("Error deleting itinerary:", error);
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold text-blue-600">Saved Itineraries</h2>
            {error && <p className="text-red-500">{error}</p>}
            {itineraries.length === 0 ? (
                <p className="text-gray-500">No saved itineraries found.</p>
            ) : (
                <ul>
                    {itineraries.map((trip) => (
                        <li key={trip._id} className="p-4 bg-gray-100 shadow-lg my-2 rounded-md">
                            {editing === trip._id ? (
                                <>
                                    <input
                                        type="text"
                                        value={formData.destination}
                                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                        className="p-2 border rounded w-full"
                                    />
                                    <input
                                        type="number"
                                        value={formData.budget}
                                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        className="p-2 border rounded w-full"
                                    />
                                    <input
                                        type="number"
                                        value={formData.days}
                                        onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                        className="p-2 border rounded w-full"
                                    />
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
                                        onClick={() => handleSave(trip._id)}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 mt-2 rounded ml-2"
                                        onClick={() => setEditing(null)}
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <h3 className="text-lg font-bold">{trip.destination}</h3>
                                    <p>Budget: ${trip.budget}</p>
                                    <p>Days: {trip.days}</p>
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
                                        onClick={() => handleEdit(trip)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 mt-2 rounded ml-2"
                                        onClick={() => handleDelete(trip._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedItineraries;
