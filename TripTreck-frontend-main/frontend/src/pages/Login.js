import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated authentication
    if (email === "test@gmail.com" && password === "password") {
      alert("Login Successful");
      navigate("/dashboard");
    } else {
      alert("Login Failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-900">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded-lg mb-4" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 border rounded-lg mb-4" required />
        <button type="submit" className="w-full bg-orange-600 text-white p-2 rounded-lg">Login</button>
      </form>
    </div>
  );
};

export default Login;