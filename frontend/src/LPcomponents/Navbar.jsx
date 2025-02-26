import React, { useState } from "react";
import { Link } from "react-scroll";
import logo from "../assets/JerseyPasal.png";

function Navbar() {
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
    <nav className={nav ? "nav active" : "nav"}>
      <Link to="#" className="logo">
        <img src={logo} alt=""></img>
      </Link>
      <input className="menu-btn" type="checkbox" id="menu-btn" />
      <label className="menu-icon" for="menu-btn">
        <span className="nav-icon"></span>
      </label>
      <ul className="ul">
        <li className="li">
          <Link to="main" smooth={true} duration={1000}>Home</Link>
        </li>
        <li className="li">
          <Link to="features" smooth={true} duration={1000}>Demanded</Link>
        </li>
        <li className="li">
          <Link to="offer" smooth={true} duration={1000}>Join</Link>
        </li>
        <li className="li">
          <Link to="about" smooth={true} duration={1000}>About</Link>
        </li>
        <li className="li">
          <Link to="footer" smooth={true} duration={1000}>Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
export default Navbar;
