import React from "react";
import image1 from "../assets/acmilan.png";
import image2 from "../assets/barcelona.png";
import image3 from "../assets/realmadrid.png";
import image4 from "../assets/liverpool.png";
function Feature() {
  return (
    <div id="features">
      <h1>Top Selling Jerseys</h1>
      <div className="a-container">
        {/* box1 */}
        <div className="a-box">
          <div className="a-b-img">
            <img src={image1} alt="" />
          </div>
          <div className="a-b-text">
            <h2>Ac Milan</h2>
          </div>
        </div>

        {/* box2 */}
        <div className="a-box">
          <div className="a-b-img">
            <img src={image2} alt="" />
          </div>
          <div className="a-b-text">
            <h2>Barcelona</h2>
          </div>
        </div>

        {/* box3 */}
        <div className="a-box">
          <div className="a-b-img">
            <img src={image3} alt="" />
          </div>
          <div className="a-b-text">
            <h2>Real Madrid</h2>
          </div>
        </div>

        {/* box4 */}
        <div className="a-box">
          <div className="a-b-img">
            <img src={image4} alt="" />
          </div>
          <div className="a-b-text">
            <h2>Liverpool</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Feature;
