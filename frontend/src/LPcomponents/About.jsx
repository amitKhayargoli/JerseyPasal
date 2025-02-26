import React from "react";
import aboutimage from '../assets/LandingPageimg4.jpg'
function About(){
    return(
        <div id='about'>
            <div className="about-image">
            <img src={aboutimage} alt="" />
            </div>
            <div className="about-text">
                <h1>LEARN MORE ABOUT US</h1>
                <p>"At JerseyPasal, we’re passionate about sports and style! We offer high-quality jerseys for teams, fans, and athletes who want to wear their pride. With a wide selection of designs, and top-notch materials, we bring you the best in comfort and performance. Whether you're gearing up for game day or repping your favorite team, we’ve got you covered. Shop with us and wear your passion!"</p>
                <button>READ MORE</button>
            </div>
        </div>
    )
}
export default About;