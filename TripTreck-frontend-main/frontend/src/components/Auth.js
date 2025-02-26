import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isLogin ? "http://localhost:5000/api/login" : "http://localhost:5000/api/signup";

    try {
      console.log("Entered ")
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLogin ? "login" : "sign up"}`);
      }

      const data = await response.json();
      console.log("Response received:", data);

      // Handle the response message and navigate if successful
      if (response.status === 201) {
        const user = { email: formData.email, name: formData.name };
        // alert(data.message);  // Show the success message from the server
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(user));

        navigate("/dashboard"); // Navigate to the dashboard
      } else {
        setError(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold">{isLogin ? "Login" : "Sign Up"}</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-2 border rounded w-full"
            onChange={handleChange}
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded w-full"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded w-full"
          onChange={handleChange}
        />
        <button className="bg-orange-500 text-white p-2 rounded w-full" type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="text-blue-500 mt-2">
        {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;




