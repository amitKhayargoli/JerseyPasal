import React from "react";
import intro from "../assets/videos/intro.mp4";

function VideoBackground() {
  return (
    <div className="videoContainer" id="main">
      <video autoPlay loop muted playsInline className="backgroundVideo">
        <source src={intro} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="content">
        <h1>Welcome to Jersey Pasal</h1>
        <p>Experience the future with us</p>
        <button className="exploreButton">Explore More</button>
      </div>
    </div>
  );
}

export default VideoBackground;
