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

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/auth/login`, JSON.stringify(formData), {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        console.log("Login Response:", response.data);

        if (response.data.data.access_token) {
          localStorage.setItem("token", response.data.data.access_token);
          localStorage.setItem("role", response.data.data.role);

          let userRole = response.data.data.role;
          console.log("User Role:", userRole);
          if (userRole === "admin") {
            navigate("/adminDashboard");
          } else {
            navigate("/CustomerDashboard");
          }
        } else {
          alert("Login failed! Check credentials.");
        }
      })
      .catch((error) => {
        console.error(
          "Error logging in:",
          error.response?.data || error.message
        ); // Log the detailed error response
        alert("Error logging in. Please try again.");
      });
  };

  return (
    <div className="container">
      <div className="main"></div>

      <div className="color">
        <form id="form" onSubmit={onSubmit}>
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
            {errors.email && (
              <span className="email_error">{errors.email}</span>
            )}
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
            {errors.password && (
              <span className="pass_error">{errors.password}</span>
            )}
          </div>

          <button className="Loginbtn" type="submit">
            Login
          </button>
          <div className="last">
            <a>Create an account?</a>{" "}
            <span>
              <Link to="/Signup"> Sign up</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
