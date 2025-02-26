import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar /> {/* Navigation bar */}

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-4xl font-bold text-gray-900">
          Plan Your Next Adventure with Ease
        </h1>
        <p className="text-gray-600 mt-3 text-lg max-w-2xl">
          Discover destinations, create custom itineraries, and explore user-recommended guides—all in one platform.
        </p>
        <div className="mt-6">
          <Link to="/signup">
            <button className="bg-orange-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-orange-700">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      {/* About Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Why Choose TripTreck?</h2>
        <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
          TripTreck is your ultimate travel companion. We help you plan, organize, and explore 
          destinations with ease. Our platform connects you with other travelers, provides real-time recommendations, 
          and ensures that every trip is unforgettable.
        </p>
      </section>

      {/* Features Section */}
      <section className="py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">Our Features</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-orange-600">Custom Itineraries</h3>
            <p className="text-gray-700 mt-2">
              Plan your trips effortlessly with our itinerary builder, customized to your interests.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-orange-600">Real-Time Collaboration</h3>
            <p className="text-gray-700 mt-2">
              Share plans with friends and collaborate in real time on your trips.
            </p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-orange-600">Crowdsourced Recommendations</h3>
            <p className="text-gray-700 mt-2">
              Explore the best places to visit, recommended by travelers like you.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-12 px-6 text-center">
        <h2 className="text-3xl font-semibold text-gray-900">What Our Users Say</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700">
              "TripTreck made my travel planning so much easier! Highly recommend it to any traveler!"
            </p>
            <span className="block mt-4 font-semibold text-gray-900">- Sarah M.</span>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700">
              "Love how I can collaborate with friends and plan trips together. Such a game-changer!"
            </p>
            <span className="block mt-4 font-semibold text-gray-900">- Jake R.</span>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <p className="text-gray-700">
              "Best travel app I’ve ever used. The recommendations are spot-on!"
            </p>
            <span className="block mt-4 font-semibold text-gray-900">- Priya K.</span>
          </div>
        </div>
      </section>

      <Footer /> {/* Footer Section */}
    </div>
  );
};

export default Home;

