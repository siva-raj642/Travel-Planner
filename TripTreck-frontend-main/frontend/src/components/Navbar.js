import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    localStorage.removeItem("user"); // Remove user data
    setUser(null); // Update UI
    navigate("/"); // Redirect to Home
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
        {/* Logo */}
        <Link to="/" className="text-orange-500 text-2xl font-bold">
          TripTreck
        </Link>

        {/* User Info OR Login/Signup */}
        <div className="flex gap-4 items-center">
          {user ? (
            <>
          <button
                onClick={() => navigate("/dashboard")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
               Dashboard
            </button>
              <span className="text-gray-700">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            window.location.pathname === "/" && (
              <>
                <Link to="/login" className="text-blue-500">Login</Link>
                <Link to="/signup" className="bg-orange-500 text-white px-4 py-2 rounded">Sign Up</Link>
              </>
            )
          )}
        </div>
      </nav>

      {/* Prevent Content from Being Hidden Behind Navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;




