import React from 'react';

export default function Footer({ children }) {
  return (
    <div className="tempestas-footer">
      <div className="tempestas-footer-wrapper">
        <div className="footer-col--1">
          <div className="tempestas-footer-logo">
            <img
              src="https://www.tcu29.io/ext-resources/tempestas-logo-footer.png"
              alt="Tempestas Tokens Logo Footer"
              title="Tempestas Tokens Logo Footer"
              className="footer-logo"
            />
            <p>
              © Copyright {new Date().getFullYear()} Tempestas Copper.
              <br />
              All rights reserved.
            </p>
          </div>
        </div>

        <div className="footer-col--2">
          <h4 className="footer-titles">Company</h4>
          <ul className="footer-stacked-links">
            <li className="ftr-links">
              <a href="https://www.tcu29.io/#about-tcu29" target="_blank">
                About Us
              </a>
            </li>
            <li className="ftr-links">
              <a href="https://www.tcu29.io/#why-copper" target="_blank">
                Why Copper?
              </a>
            </li>
            <li className="ftr-links">
              <a href="https://www.tcu29.io" target="_blank">
                Learn More
              </a>
            </li>
            <li className="ftr-links">Purchase Tokens</li>
          </ul>
        </div>

        <div className="footer-col--3">
          <h4 className="footer-titles">Legal</h4>
          <ul className="footer-stacked-links">
            <li className="ftr-links">Legal Notice</li>
            <li className="ftr-links">Privacy Policy</li>
            <li className="ftr-links">Terms of Use</li>
            <li className="ftr-links">
              <a href="https://www.tcu29.io/#whitepaper" target="_blank">
                Whitepaper
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col--4">
          <h4 className="footer-titles">Follow Us</h4>
          <ul className="footer-row-links">
            <li className="ftr-links-social">
              <a href="#" target="_blank">
                <i className="fa-brands fa-instagram"></i>
              </a>
            </li>
            <li className="ftr-links-social">
              <a href="#" target="_blank">
                <i className="fa-brands fa-facebook"></i>
              </a>
            </li>
            <li className="ftr-links-social">
              <a href="#" target="_blank">
                <i className="fa-brands fa-linkedin"></i>
              </a>
            </li>
            <li className="ftr-links-social">
              <a href="#" target="_blank">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
