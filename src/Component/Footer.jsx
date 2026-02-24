import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand Section */}
        <div className="footer-col">
          <h2 className="footer-logo">LA COLLECTION</h2>
          <p>
            Premium fashion destination delivering style,
            comfort and trust worldwide.
          </p>
        </div>

        {/* Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/product">Products</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/cart">Cart</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <ul>
            <li><a href="">FAQ</a></li>
            <li><a href="">Shipping</a></li>
            <li><a href="">Returns</a></li>
            <li><a href="">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer-col">
          <h3>Subscribe</h3>
          <div className="newsletter">
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>

          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaYoutube />
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} LA COLLECTION | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;