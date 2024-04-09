import React from 'react';
import { Box, Container, Stack, useTheme } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import {
  LINK_DISCORD,
  LINK_PRIVACY_POLICY,
  LINK_TELEGRAM,
  LINK_TERMS_OF_USE,
} from '../../constants/links';

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
      <Container>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={3}
          columnSpacing={3}
          maxWidth={1440}
        >
          <Grid2 xs={12}>
            <h1>Terms of Use</h1>
          </Grid2>
          <Grid2 xs={12}>
            <p>
              By accessing any CZODIAC website, including but not limited to
              CZODIAC's decentralized applications and services, and engaging in
              any activities related to the CZODIAC ecosystem, including buying,
              selling, trading, holding CZODIAC tokens, or participating in the
              CZODIAC community, users acknowledge that they have read,
              understood, and agreed to be bound by the terms and conditions set
              forth in CZODIAC's Terms of Use. The Terms of Use, available at{' '}
              <a css={{ color: '#adedea' }} href={LINK_TERMS_OF_USE}>
                {LINK_TERMS_OF_USE}
              </a>
              , constitute a legally binding agreement between users and
              CZODIAC, and users should review them carefully before engaging in
              any activities related to the CZODIAC ecosystem. If users do not
              agree to the terms and conditions set forth in the Terms of Use,
              they should not access or use CZODIAC's websites, dapps, tokens,
              or other offerings. By using any CZODIAC website, users represent
              and warrant that they have the legal capacity to enter into a
              binding agreement with CZODIAC and that they comply with all
              applicable laws and regulations.
              <br />
              <br />
              <a css={{ color: '#adedea' }} href={LINK_TERMS_OF_USE}>
                LINK TO TERMS OF USE
              </a>
            </p>
          </Grid2>
          <Grid2 xs={12}>
            <h1>Privacy Policy</h1>
          </Grid2>
          <Grid2 xs={12}>
            <p>
              At CZODIAC, we are committed to protecting the privacy and
              personal information of our users. We encourage you to read our
              Privacy Policy, which can be found at{' '}
              <a css={{ color: '#adedea' }} href={LINK_PRIVACY_POLICY}>
                {LINK_PRIVACY_POLICY}
              </a>
              . This policy outlines the types of personal information that
              CZODIAC may collect, the purposes for which this information is
              used, and the steps taken to ensure the security and
              confidentiality of your personal data. By using CZODIAC's websites
              or services, you acknowledge that you have read and understood our
              Privacy Policy and consent to the collection, use, and disclosure
              of your personal information as described therein. If you have any
              questions or concerns about our privacy practices, please contact
              us at team@czodiac.com.
              <br />
              <br />
              <a css={{ color: '#adedea' }} href={LINK_PRIVACY_POLICY}>
                LINK TO PRIVACY POLICY
              </a>
            </p>
          </Grid2>
        </Grid2>
      </Container>
    </div>
  );
}
