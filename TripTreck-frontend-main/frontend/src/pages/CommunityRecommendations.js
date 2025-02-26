import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const CommunityRecommendations = () => {
  const [place, setPlace] = useState("");
  const [weatherCity, setWeatherCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [placeInfo, setPlaceInfo] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([20, 78], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }
  }, []);

  const findLocation = async () => {
    if (!place.trim()) {
      alert("Please enter a valid place!");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];

        mapRef.current.setView([lat, lon], 12);
        L.marker([lat, lon]).addTo(mapRef.current)
          .bindPopup(`<b>${place}</b>`)
          .openPopup();
      } else {
        alert("Location not found. Please try another place.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch location data.");
    }
  };

  const getWeather = async () => {
    if (!weatherCity.trim()) {
      alert("Please enter a city for weather information.");
      return;
    }

    const apiKey = "5bd772d9da713f43620d48a22dd3cab1"; // Replace with your Weatherstack API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(weatherCity)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.success === false) {
        alert(`Error: ${data.error.info}`);
      } else {
        setWeatherData(data);
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
    }
  };

  const fetchPlaceInfo = async () => {
    if (!place.trim()) {
      alert("Please enter a place name!");
      return;
    }

    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.title && data.extract) {
        setPlaceInfo(data);
      } else {
        alert("No information found for this place.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching place information. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Community Recommendations</h2>

      {/* 🔹 SEARCH FOR PLACE & WEATHER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        {/* Place Info Search */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">Find Place Info</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter place name (e.g., Eiffel Tower)"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="border p-2 w-full rounded-l-md"
            />
            <button onClick={fetchPlaceInfo} className="bg-blue-500 text-white px-4 rounded-r-md">
              Search
            </button>
          </div>
        </div>

        {/* Weather Search */}
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">Check Weather</h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter city name"
              value={weatherCity}
              onChange={(e) => setWeatherCity(e.target.value)}
              className="border p-2 w-full rounded-l-md"
            />
            <button onClick={getWeather} className="bg-green-500 text-white px-4 rounded-r-md">
              Get Weather
            </button>
          </div>
        </div>
      </div>

      {/* 🔹 DISPLAY SEARCH RESULTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Place Info Result */}
        {placeInfo && (
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-bold">{placeInfo.title}</h3>
            <p>{placeInfo.extract}</p>
            {placeInfo.thumbnail && (
              <img src={placeInfo.thumbnail.source} alt="Place" className="w-32 h-32 rounded mt-2 mx-auto" />
            )}
            <a href={placeInfo.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              Read More on Wikipedia
            </a>
          </div>
        )}

        {/* Weather Info Result */}
        {weatherData && (
          <div className="bg-white shadow-md p-4 rounded">
            <h3 className="text-lg font-bold">Weather in {weatherData.location.name}</h3>
            <p><b>Temperature:</b> {weatherData.current.temperature}°C</p>
            <p><b>Condition:</b> {weatherData.current.weather_descriptions[0]}</p>
          </div>
        )}
      </div>

      {/* 🔹 MAP SEARCH */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold">Find on Map</h3>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter city or place"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="border p-2 w-full rounded-l-md"
          />
          <button onClick={findLocation} className="bg-orange-500 text-white px-4 rounded-r-md">
            Search
          </button>
        </div>
      </div>

      {/* 🔹 MAP CONTAINER */}
      <div id="map" className="w-full h-96 mt-6 rounded-lg shadow-md"></div>
    </div>
  );
};

export default CommunityRecommendations;
