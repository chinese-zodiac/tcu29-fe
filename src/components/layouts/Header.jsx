import React from 'react';
import ConnectWallet from './../elements/ConnectWallet';

export default function Header({ children }) {
  return (
    <div className="tempestas-header">
      <div className="tempestas-header-container">
        <div className="tempestas-header-logo">
          <img
            src="https://www.tcu29.io/ext-resources/tempestas-logo.png"
            alt="Tempestas Tokens Logo"
            title="Tempestas Tokens Logo"
            className="header-logo"
          />
        </div>

        <div className="tempestas-header-navigation">
          <ul className="tempestas-header-navigation--links">
            <li className="thn-links">
              <a href="https://www.tcu29.io/#about-tcu29" target="_blank">
                About Us
              </a>
            </li>
            <li></li>
            <li className="thn-links">
              <a href="https://www.tcu29.io/#why-copper" target="_blank">
                Why Copper?
              </a>
            </li>
            <li></li>
            <li className="thn-links">
              <a href="#faq">FAQ's</a>
            </li>
            <li></li>
            <li>
              <ConnectWallet />
            </li>
            <li>
              <a
                href="https://www.tcu29.io"
                target="_blank"
                className="secondary-btn"
                style={{
                  display: 'inline',
                }}
              >
                <i
                  className="fa-solid fa-arrow-up-right-from-square"
                  aria-hidden="true"
                ></i>{' '}
                Learn More
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
