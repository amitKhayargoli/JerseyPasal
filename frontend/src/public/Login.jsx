import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for making HTTP requests

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" }); // Clear errors as user types
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:3000/api/users/login", {
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 200) {
          alert("Login successful");
          console.log("Login successful", response.data);
          // Store user data in localStorage or context
          localStorage.setItem("token", response.data.token); // Store the token here
          // Redirect to CustomerDashboard
          navigate("/CustomerDashboard");
        }
      } catch (error) {
        console.error("Error during login", error.response ? error.response.data : error.message);
        alert("Error during login: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  return (
    <div className="container">
      <div className="main">
      </div>

      <div className="color">
        <form id="form" onSubmit={handleSubmit}>
          <label className="LoginLabel">Welcome back</label>
          <br />

          <div className="form-control">
            <input
              id="email"
              type="email"
              className="LoginInput"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="email_error">{errors.email}</span>}
          </div>

          <div className="form-control">
            <input
              id="password"
              type="password"
              className="LoginInput"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="pass_error">{errors.password}</span>}
          </div>

          <button className="Loginbtn" type="submit">Login</button>
          <div className="last">
            <a>Create an account?</a>{" "}
            <span><Link to="/Signup"> Sign up</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;