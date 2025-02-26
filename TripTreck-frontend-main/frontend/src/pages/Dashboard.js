import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, UserCircleIcon } from "@heroicons/react/outline";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
      fetchDashboardData();
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    setTrips([
      { id: 1, destination: "Paris", date: "2025-04-10" },
      { id: 2, destination: "Bali", date: "2025-06-21" }
    ]);
    setItineraries([{ id: 1, title: "Europe Trip", details: "10-day Europe itinerary" }]);
    setRecommendations([{ id: 1, tip: "Visit Eiffel Tower at night for best views." }]);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6">
      <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-orange-600">TripTreck</h2>
        <div className="flex items-center space-x-4">
          <button className="relative">
            <BellIcon className="h-6 w-6 text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">3</span>
          </button>
          <div className="relative group">
            <UserCircleIcon className="h-8 w-8 text-gray-600 cursor-pointer" />
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg p-2">
              <p className="text-sm px-4 py-2">{user?.name || "Traveler"}</p>
              <hr />
              <button
                onClick={handleLogout}
                className="text-red-500 w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-orange-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition" onClick={() => navigate("/upcoming-trips")}>
          <h3 className="text-xl font-bold">Upcoming Trips</h3>
          <p className="mt-2 text-sm">Plan your future adventures.</p>
        </div>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition" onClick={() => navigate("/saved-itineraries")}>
          <h3 className="text-xl font-bold">Saved Itineraries</h3>
          <p className="mt-2 text-sm">Quickly access and edit trip plans.</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition" onClick={() => navigate("/community-recommendations")}>
          <h3 className="text-xl font-bold">Community Recommendations</h3>
          <p className="mt-2 text-sm">Explore travel tips from fellow explorers.</p>
        </div>

        {/* ✅ Compass Section */}
        <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition" onClick={() => navigate("/compass")}>
          <h3 className="text-xl font-bold">Compass</h3>
          <p className="mt-2 text-sm">Explore travel information & tips.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
