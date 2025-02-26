import React, { useState } from "react";
import "./Landingpage.css";
import Navbar from "../LPcomponents/Navbar";
import Header from "../LPcomponents/Header";
import Feature from "../LPcomponents/Feature";
import Offer from "../LPcomponents/Offer";
import About from "../LPcomponents/About";
import Footer from "../LPcomponents/Footer";

const Landingpage = () => {
  return (
    <div className="LpConrainer">
      <Navbar />
      <Header />
      <Feature />
      <Offer />
      <About />
      <Footer />
    </div>
  );
};
export default Landingpage;
