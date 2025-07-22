


import { useState } from "react";
import axios from "axios";
import "./Login.css"; 

const Login = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending:", userData); 
      const res = await axios.post("http://127.0.0.1:5000/login", userData);
      console.log("Response:", res.data); 

      if (res.data.success) {
        setMessage("✅ Login successful!");
      } else {
        setMessage("❌ Login failed.");
      }
    } catch (err) {
      setMessage("❌ Invalid credentials or server error.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>

      
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default Login;
