import React, { useState } from "react";

const Compass = () => {
  // Hotel Finder States
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Travel Guide States
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [result, setResult] = useState("");

  const API_KEY = "CPgq7uFa7vj2FuGw3GBOvHpJ0zUkQwTc";
  const API_SECRET = "N6ZegwAMc2XUFx5Q";
  let accessToken = "";

  // Fetch Access Token for Hotels API
  const getAccessToken = async () => {
    try {
      const response = await fetch("https://test.api.amadeus.com/v1/security/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: API_KEY,
          client_secret: API_SECRET,
        }),
      });

      const data = await response.json();
      accessToken = data.access_token;
    } catch (err) {
      console.error("Error fetching access token:", err);
      setError("Failed to authenticate API");
    }
  };

  // Search Hotels
  const searchHotels = async () => {
    if (!city.trim()) {
      setError("Please enter a valid city.");
      return;
    }

    setError("");
    setLoading(true);

    await getAccessToken();

    try {
      const cityResponse = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY&keyword=${city}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const cityData = await cityResponse.json();

      if (!cityData.data || cityData.data.length === 0) {
        setError("City not found. Try another location.");
        setLoading(false);
        return;
      }

      let cityCode = cityData.data[0].iataCode;

      const hotelsResponse = await fetch(
        `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=5&radiusUnit=KM&hotelSource=ALL`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      const hotelsData = await hotelsResponse.json();

      if (!hotelsData.data || hotelsData.data.length === 0) {
        setError("No hotels found.");
        setHotels([]);
      } else {
        setHotels(hotelsData.data.slice(0, 5));
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching hotels:", err);
      setError("Error retrieving hotel data.");
      setLoading(false);
    }
  };

  // Search Place Info (Travel Guide)
  const searchPlace = async () => {
    if (!place.trim()) {
      alert("Please enter a place name.");
      return;
    }

    const apiUrl = `https://en.wikivoyage.org/w/api.php?action=parse&format=json&page=${encodeURIComponent(
      place
    )}&prop=text&origin=*`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (!data.parse) {
        setResult(`<p>No tourist information found for "${place}". Try another place.</p>`);
        return;
      }

      setPageContent(data.parse.text["*"]);
      setCategoriesVisible(true);
      setResult("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setResult("<p>Failed to load data. Try again.</p>");
    }
  };

  // Show Category Details
  const showDetails = () => {
    if (!category) {
      setResult("");
      return;
    }

    const sectionMap = {
      "Transport": "Get in",
      "Tourist Places": "See",
      "Sports": "Do",
      "Arts & Music": "Buy|Eat|Drink|Sleep",
    };

    const sectionTitle = sectionMap[category];

    if (!sectionTitle) {
      setResult(`<p>No information available for this category.</p>`);
      return;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(pageContent, "text/html");
    let extractedContent = "";

    doc.querySelectorAll("h2").forEach((heading) => {
      if (heading.textContent.includes(sectionTitle)) {
        let content = "";
        let sibling = heading.nextElementSibling;

        while (sibling && sibling.tagName !== "H2") {
          content += sibling.outerHTML;
          sibling = sibling.nextElementSibling;
        }

        extractedContent = content;
      }
    });

    setResult(
      extractedContent
        ? `<h3 class="text-lg font-bold">${category}</h3>${extractedContent}`
        : `<p>No details found for this category.</p>`
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center">🏨 Hotel Finder</h2>

      {/* Hotel Search */}
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Enter a city (e.g., Paris)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 w-2/3 rounded-l-md"
        />
        <button onClick={searchHotels} className="bg-blue-500 text-white px-4 rounded-r-md">
          Search Hotels
        </button>
      </div>

      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {loading && <p className="text-center mt-4">Fetching hotel data...</p>}

      {/* Display Hotels */}
      {hotels.length > 0 && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold">🏨 Available Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {hotels.map((hotel, index) => (
              <div key={index} className="border rounded-lg shadow-md p-4">
                <img
                  src="https://via.placeholder.com/300"
                  alt={hotel.name || "Hotel Image"}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h4 className="font-bold mt-2">{hotel.name || "Hotel Name Not Available"}</h4>
                <p>📍 {hotel.geoCode.latitude}, {hotel.geoCode.longitude}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Travel Guide Section */}
      <h2 className="text-3xl font-bold text-center mt-10">🌍 Travel Guide</h2>
      <div className="flex justify-center mt-4">
        <input
          type="text"
          placeholder="Enter a city (e.g., Paris)"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border p-2 w-2/3 rounded-l-md"
        />
        <button onClick={searchPlace} className="bg-green-500 text-white px-4 rounded-r-md">
          Search
        </button>
      </div>

      {categoriesVisible && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Select a category:</h3>
          <select onChange={(e) => { setCategory(e.target.value); showDetails(); }} className="border p-2 mt-2 w-full">
            <option value="">-- Choose an option --</option>
            <option value="Transport">🚇 Transport</option>
            <option value="Tourist Places">🏛 Tourist Places</option>
            <option value="Sports">⚽ Sports</option>
            <option value="Arts & Music">🎭 Arts & Music</option>
          </select>
        </div>
      )}

      {result && <div className="mt-6 p-4 bg-gray-100 rounded shadow" dangerouslySetInnerHTML={{ __html: result }} />}
    </div>
  );
};

export default Compass;
