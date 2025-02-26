import React from "react";
import { useNavigate } from "react-router-dom";

const UpcomingTrips = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Upcoming Trips</h1>
      <p className="text-gray-600 text-center mb-6">
        Choose how you want to explore your next adventure!
      </p>

      {/* Clickable Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Join Collaborations */}
        <div
          onClick={() => navigate("/collaborations")}
          className="bg-blue-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition duration-200"
        >
          <h3 className="text-xl font-bold">Join Collaborations</h3>
          <p className="mt-2 text-sm">
            Travel with like-minded explorers and create shared experiences.
          </p>
        </div>

        {/* Solo Trip */}
        <div
          onClick={() => navigate("/solo-trip")}
          className="bg-orange-500 text-white p-6 rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition duration-200"
        >
          <h3 className="text-xl font-bold">Solo Trip</h3>
          <p className="mt-2 text-sm">
            Plan your own journey and enjoy a personalized experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTrips;

