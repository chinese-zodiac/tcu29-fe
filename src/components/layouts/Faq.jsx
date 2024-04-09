import React from 'react';

export default function Faq({ children }) {
  return (
    <div className="tempestas-contentblock--white" id="faq">
      <div className="tempestas-contentblock--white-wrapper">
        <div className="tempestas-contentblock--content-left">
          <h3 className="tempestas-contentblock--white-title">
            Frequently Asked Questions
          </h3>
          <p className="no-space--top-bottom">
            Aren't able to find answers you're looking for?
          </p>
          <p className="no-space--top-bottom">
            Reach out to our customer support team.
          </p>
        </div>

        <div className="tempestas-contentblock--content-right">
          <div className="accordion">
            <input
              id="toggle1"
              type="radio"
              className="accordion-toggle"
              name="toggle"
            />
            <label for="toggle1">What is TCu29 - Tempestas copper?</label>
            <section>
              <p>
                TCu29 is an asset backed digital coin with one pound of copper
                for every token. The TCu29 asset backed token grows as copper
                value increases, copper is quickly becoming the ESG asset of the
                future.
              </p>
            </section>
          </div>

          <div className="accordion">
            <input
              id="toggle2"
              type="radio"
              className="accordion-toggle"
              name="toggle"
            />
            <label for="toggle2">
              How can I redeem a token for physical copper?
            </label>
            <section>
              <p>
                A new platform is being developed which will allow holders to
                forward book their copper redemption. They will enter a smart
                contract with TCOP where they will lodge the respective TCu29 in
                the contract and the coins will be burned once delivery has been
                completed. Delivery will always be at the cost of the redeeming
                party (TCu29 holder). This platform will be available by the end
                of 2025.
              </p>
            </section>
          </div>

          <div className="accordion">
            <input
              id="toggle3"
              type="radio"
              className="accordion-toggle"
              name="toggle"
            />
            <label for="toggle3">What is a multi-chain token?</label>
            <section>
              <p>
                This means that a token is not limited to one smart chain. TCu29
                is minted across different blockchains - Binance, Ethereum and
                Polygon.
              </p>
            </section>
          </div>

          <div className="accordion">
            <input
              id="toggle4"
              type="radio"
              className="accordion-toggle"
              name="toggle"
            />
            <label for="toggle4">Will I be able to sell TCu29?</label>
            <section>
              <p>
                TCu29 is in the process of being admitted to multiple exchanges
                - both centralised and decentralise - during the course of 2024
                these will be communicated to holders and interested investors
                through our own channels and social media channels. Selling or
                trading TCu29 will be subject to any block period, if
                applicable, that holders contracted to.
              </p>
            </section>
          </div>

          <div className="accordion">
            <input
              id="toggle5"
              type="radio"
              className="accordion-toggle"
              name="toggle"
            />
            <label for="toggle5">Who is Tempestas Copper Inc.?</label>
            <section>
              <p>
                Tempestas Copper Inc. is a mining company with mines in Arizona,
                USA. Their website is www.tempestas-copper.com. The company is
                registered in Wyoming, USA. Under company registration number
                EIN# 85-3975628 with registered address: 41 University Drive,
                Suite 401, Newtown, PA 18940, USA and is also registered as
                Foreign For-Profit Corporation in the state of Arizona with ID
                number 23217229 and with Registered Address: 1087 S OAK CT,
                GILBERT, ARIZONA, 85233, USA.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
