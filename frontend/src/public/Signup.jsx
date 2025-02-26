import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Import axios for making HTTP requests

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
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

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
      valid = false;
    }
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
        const response = await axios.post("http://localhost:3000/api/users/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });

        if (response.status === 201) {
          alert("Signup successful");
          console.log("Signup successful", response.data);
          // Store user data in localStorage or context
          localStorage.setItem("token", response.data.token); // Store the token here
          // Redirect to CustomerDashboard
          navigate("/Login");
        }
      } catch (error) {
        console.error("Error during signup", error.response ? error.response.data : error.message);
        alert("Error during signup: " + (error.response ? error.response.data.message : error.message));
      }
    }
  };

  return (
    <div className="container">
      <div className="main">
      </div>

      <div className="color">
        <form id="form" onSubmit={handleSubmit}>
          <label className="SignupLabel">Create an account</label>
          <br />

          <div className="form-control">
            <input
              id="name"
              type="text"
              className="SignupInput"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="name_error">{errors.name}</span>}
          </div>

          <div className="form-control">
            <input
              id="email"
              type="email"
              className="SignupInput"
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
              className="SignupInput"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <span className="pass_error">{errors.password}</span>}
          </div>

          <button className="Signupbtn" type="submit">Sign Up</button>
          <div className="last">
            <a>Already have an account?</a>{" "}
            <span className="spanLogin"><Link to="/Login"> Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;