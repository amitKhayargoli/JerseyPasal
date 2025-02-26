import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/JerseyPasal.png";


function CustomerNavbar() {
    const [showPopup, setShowPopup] = useState(false);
  const [nav, setnav] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setnav(true);
    } else {
      setnav(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  return (
    <nav className="Cnav">
      
        <img className="logo" src={logo} alt=""></img>
    
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon"></span>
      </label>
      <ul className="ul">
        <li className="li">
          <Link to="main" smooth={true} duration={1000}>Home</Link>
        </li>
        <li className="li">
          <Link to="jersey" smooth={true} duration={1000}>Jersey</Link>
        </li>
        <li className="li">
          <Link to="cart" smooth={true} duration={1000}>Cart</Link>
        </li>
      </ul>
      <div className="userIconContainer">
      <div className="icon" onClick={() => setShowPopup(!showPopup)}>
        <i className="ri-account-circle-fill"></i>
      </div>

      {/* Pop-out Menu */}
      {showPopup && (
        <div className="popupMenu">
          <p>Profile</p>
          <p>Settings</p>
          <hr />
          <p className="logout" onClick={() => alert("Logged out!")}>Logout</p>
        </div>
      )}
    </div>
    </nav>
  );
}
export default CustomerNavbar;
