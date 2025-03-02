import React from "react";
function Footer(){
  return (
    <footer className="footer" id='footer'>
      <div className="footer-container">
        
        <div className="footer-section">
          <h2 className="footer-logo">JerseyPasal</h2>
          <p>Best quality jersey.</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-social">
            <a href="#"><i class="ri-facebook-line"></i></a>
            <a href="#"><i class="ri-twitter-line"></i></a>
            <a href="#"><i class="ri-instagram-line"></i></a>
            <a href="#"><i class="ri-linkedin-box-fill"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} JerseyPasal. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer;
