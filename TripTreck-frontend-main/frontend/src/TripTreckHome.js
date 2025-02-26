import React from "react";
import { Link } from "react-router-dom";

const TripTreckHome = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center">
      <header className="w-full bg-white shadow-md p-5 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/images/triptreck-logo.png" alt="TripTreck Logo" className="w-10 h-10" />
          <h1 className="text-3xl font-bold text-orange-600">TripTreck</h1>
        </div>
        <div className="flex gap-4">
          <Link to="/login">
            <button className="text-gray-800 bg-white border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-200">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700">
              Sign up
            </button>
          </Link>
        </div>
      </header>

      <section className="mt-12 max-w-4xl text-center">
        <h2 className="text-5xl font-bold text-gray-900">Plan Your Next Adventure with Ease</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Discover destinations, create custom itineraries, and explore user-recommended guides—all in one platform.
        </p>
        <div className="flex gap-6 justify-center mt-8">
          <button className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700">
            Start Planning
          </button>
          <button className="text-gray-800 bg-white border border-gray-400 px-6 py-3 rounded-lg text-lg hover:bg-gray-200">
            Explore Features
          </button>
        </div>
      </section>
    </div>
  );
};

export default TripTreckHome;
