import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./components/Auth";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import UpcomingTrips from "./pages/UpcomingTrips";
import SavedItineraries from "./pages/SavedItineraries";
import CommunityRecommendations from "./pages/CommunityRecommendations";
import Collaborations from "./pages/Collaborations"; // ✅ New Page
import SoloTrip from "./pages/SoloTrip"; // ✅ New Page
import Compass from './pages/Compass'

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth type="login" />} />
          <Route path="/signup" element={<Auth type="signup" />} />
          <Route path="/compass" element={<Compass />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/upcoming-trips" element={<PrivateRoute element={<UpcomingTrips />} />} />
          <Route path="/saved-itineraries" element={<PrivateRoute element={<SavedItineraries />} />} />
          <Route path="/community-recommendations" element={<PrivateRoute element={<CommunityRecommendations />} />} />
          <Route path="/collaborations" element={<PrivateRoute element={<Collaborations />} />} />
          <Route path="/solo-trip" element={<PrivateRoute element={<SoloTrip />} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;









