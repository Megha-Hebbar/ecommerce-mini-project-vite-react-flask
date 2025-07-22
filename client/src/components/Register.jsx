




import { useState } from "react";
import axios from "axios";
import "./Login.css"; // reuse same styling as Login

const Register = () => {
  const [userData, setUserData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/register", userData);
      if (res.data.success) {
        setMessage("✅ Registration successful! You can now log in.");
      } else {
        setMessage("❌ Registration failed.");
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setMessage("❌ User already exists.");
      } else {
        setMessage("❌ Server error or invalid input.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>

      
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
};

export default Register;
