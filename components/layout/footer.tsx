import React from "react";
import "./footer.css"; // Ensure your styling remains

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section with Logo and Jargon */}
        <div className="left-section">
          <div className="logo-section">
            {/* <img src="/logo2.png" alt="Sahabat Modal Logo" className="footer-logo" /> */}
            <p className="jargon-text">#LangkahPertamamu</p>
          </div>
        </div>

        {/* Right Section with Navigation */}
        <div className="right-section">
          <nav className="footer-nav">
            <a href="/">Home</a>
            <a href="/forum">Forum</a>
            <a href="/artikel">Artikel</a>
          </nav>
        </div>
      </div>

      {/* Line Separator */}
      <hr className="footer-line" />

      {/* Social Icons and Copyright */}
      <div className="footer-bottom">
        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook">
            {/* <img src="/icons/facebook.png" alt="Facebook" className="social-icon" /> */}
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            {/* <img src="/icons/instagram.png" alt="Instagram" className="social-icon" /> */}
          </a>
          <a href="https://x.com" aria-label="X (Twitter)">
            {/* <img src="/icons/twitter.png" alt="Twitter" className="social-icon" /> */}
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            {/* <img src="/icons/linkedin.png" alt="LinkedIn" className="social-icon" /> */}
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            {/* <img src="/icons/youtube.png" alt="YouTube" className="social-icon" /> */}
          </a>
        </div>
        <p>© 2024 Sahabat Modal. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
