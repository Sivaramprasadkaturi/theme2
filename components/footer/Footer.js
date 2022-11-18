import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Container from "../shared-components/Container";
import FinePrint from "./FinePrint";
import Translate from "../../utils/Translate";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
// import { maxWidth } from "tailwindcss/lib/plugins";

const Footer = () => {
  const [activeFooterSection, setActiveFooterSection] = useState("");

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const handleOnClickFooterSection = e => {
    const { target: clickedFooterSectionTarget } = e.target.dataset;
    setActiveFooterSection(
      activeFooterSection !== clickedFooterSectionTarget &&
        clickedFooterSectionTarget
    );
  };

  const handleWhatIconToDisplay = footerSectionName => {
    return activeFooterSection === footerSectionName ? (
      <MdKeyboardArrowUp />
    ) : (
      <MdKeyboardArrowDown />
    );
  };

  return (
    <div>
      <ExternalContentFromCMS
        place="banners"
        position="Bottom"
        renderedBy="Header"
      />
      <Wrapper className="wrapfooter">
        <div className="footer--mobile">
          <Container style={{ marginBottom: "20px" }}>
            <div className="new-footer" style={{ maxWidth: "100%" }}>
              <div className="columns" style={{ maxWidth: "100%" }}>
                <div className="footer_line">
                  <div>
                    <div className="footerLogo pull-left">
                      <div style={{ width: "100%" }}>
                        {/* <Link href="/" passHref>
                          <a>
                            <Image
                              src="/images/Logonew.png"
                              alt="starter marketplace logo"
                              layout="intrinsic"
                              width="228.57px"
                              height="64.85px"
                            />
                          </a>
                        </Link> */}
                        <p className="footer-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <p className="footershop-logo">SHOP LOGO</p>


                <div className="menu-footer1 menu-footer21" id="about1">
                <ul className="footer-list footer-listterms">
                  <li className="footer-email">
                    <Link href="/terms-of-use">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.termsofuse"}
                          // className="footermenuitems"
                        />
                      </a>
                    </Link>
                  </li>
                  <li className="footer-email">
                    <Link href="/shipping-information">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.shippinginfo"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li className="footer-email">
                    <Link href="/return-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.returnpolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li className="footer-email">
                    <Link href="/privacy-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.privacypolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>


              <div className="menu-footer1" id="shop1">
                <ul>
                  <li className="footer-email">
                    <Link href="mailto:bilgi@starter.com">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.email"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li className="footer-email">
                    <a
                      href="https://www.avetticommerce.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Translate
                        translationFileName={"translation"}
                        translateKey={"footer.contact"}
                      />
                    </a>
                  </li>
                </ul>
              </div>


              <div className="menu-footer1" id="network1">
                {/* <div style={{ width: "220px" }}>
                  <Link href="/" passHref>
                    <a>
                      SHOP LOGO
                    </a>
                  </Link>
                </div> */}
                <p className="footer-right footer-rightDetail">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </p>



                <div className="socialMediaIcons">
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/youtube_H_ob8P-xA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666232032050`}
                    // alt={desc}
                    className="socialMediayt"
                  />
                </div>
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/1077042_R__vFtFzY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666231957594`}
                    // alt={desc}
                    className="socialMediainsta"
                  />
                </div>
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/facebook_gXtsyE_t6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666231956870`}
                    // alt={desc}
                    className="socialMediafb"
                  />
                </div>
              </div>

              </div>
                
                
                




                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
              {/* <div className="footer-container">
                <div
                  className="liHead"
                  id="policy-menu"
                  onClick={e => handleOnClickFooterSection(e)}
                  data-target="terms"
                  aria-controls="terms"
                  aria-expanded={activeFooterSection === "terms"}
                  style={
                    activeFooterSection && activeFooterSection === "terms"
                      ? {
                          height: "35px",
                          transition: "all 0.6s linear"
                        }
                      : {
                          height: "25px",
                          transition: "all 0.6s linear"
                        }
                  }
                >
                  Terms Of Use{" "}
                  <span
                    className="material-icons footer-icon"
                    style={{ float: "right" }}
                    data-target="about"
                  >
                    {handleWhatIconToDisplay("terms")}
                  </span>
                </div>
                <div
                  className="menu-footer"
                  id="terms"
                  aria-labelledby="terms-menu"
                  role="region"
                  style={{
                    display: activeFooterSection === "terms" ? "block" : "none"
                  }}
                >
                  <ul className="footer-list">
                    <li>
                      <Link href="/terms-of-use">
                        <a>
                          <Translate
                            translationFileName={"translation"}
                            translateKey={"footer.termsofuse"}
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/shipping-information">
                        <a>
                          <Translate
                            translationFileName={"translation"}
                            translateKey={"footer.shippinginfo"}
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/return-policy">
                        <a>
                          <Translate
                            translationFileName={"translation"}
                            translateKey={"footer.returnpolicy"}
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        <a>
                          <Translate
                            translationFileName={"translation"}
                            translateKey={"footer.privacypolicy"}
                          />
                        </a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="liHead"
                  id="info"
                  onClick={e => handleOnClickFooterSection(e)}
                  data-target="info"
                  aria-controls="info"
                  aria-expanded={activeFooterSection === "info"}
                  style={
                    activeFooterSection && activeFooterSection === "info"
                      ? {
                          height: "35px",
                          transition: "all 0.6s linear"
                        }
                      : {
                          height: "25px",
                          transition: "all 0.6s linear"
                        }
                  }
                >
                  Info{" "}
                  <span
                    style={{ float: "right" }}
                    className="material-icons footer-icon"
                    data-target="info"
                  >
                    {handleWhatIconToDisplay("info")}
                  </span>
                </div>
                <div
                  className="menu-footer"
                  id="info"
                  aria-labelledby="info-menu"
                  role="region"
                  style={{
                    display: activeFooterSection === "info" ? "block" : "none"
                  }}
                >
                  <ul className="footer-list">
                    <li>
                      <Link href="mailto:bilgi@starter.com">
                        <a>
                          <Translate
                            translationFileName={"translation"}
                            translateKey={"footer.email"}
                          />
                        </a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.avetticommerce.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.contact"}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </Container>

          <FinePrint />
        </div>
        




        <div className="footer--desktop">
          <Container style={{ marginBottom: "20px" }}>
            <div className="header"></div>
            <div className="links-container">
              <div className="menu-footer menu-footer1" id="about">
                {/* <ul className="footer-list">
                  <li>
                    <Link href="/terms-of-use">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.termsofuse"}
                        />
                      </a>
                    </Link>
                    
                  </li>
                  <li>
                    <Link href="/shipping-information">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.shippinginfo"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.returnpolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.privacypolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                </ul> */}
                <p className="footer-details">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <br />
                <br />
                <p className="footershop-logo">SHOP LOGO</p>
              </div>

              <div className="menu-footer menu-footer2" id="about">
                <ul className="footer-list footer-listterms">
                  <li>
                    <Link href="/terms-of-use">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.termsofuse"}
                          // className="footermenuitems"
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-information">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.shippinginfo"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.returnpolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.privacypolicy"}
                        />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="menu-footer" id="shop">
                <ul>
                  <li>
                    <Link href="mailto:bilgi@starter.com">
                      <a>
                        <Translate
                          translationFileName={"translation"}
                          translateKey={"footer.email"}
                        />
                      </a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.avetticommerce.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Translate
                        translationFileName={"translation"}
                        translateKey={"footer.contact"}
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="menu-footer" id="network">
                {/* <div style={{ width: "220px" }}>
                  <Link href="/" passHref>
                    <a>
                      SHOP LOGO
                    </a>
                  </Link>
                </div> */}
                <p className="footer-right">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </p>



                <div className="socialMediaIcons">
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/youtube_H_ob8P-xA.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666232032050`}
                    // alt={desc}
                    className="socialMediayt"
                  />
                </div>
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/1077042_R__vFtFzY.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666231957594`}
                    // alt={desc}
                    className="socialMediainsta"
                  />
                </div>
                <div>
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/facebook_gXtsyE_t6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666231956870`}
                    // alt={desc}
                    className="socialMediafb"
                  />
                </div>
              </div>

              </div>

              
            </div>
          </Container>
          <FinePrint />
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.footer`
  padding: 2% 0 0% 0;
  background: #fff4f2;
  margin-top: 30px;
  padding-top: 30px;
  /* border-top: 1px solid #c8c8c8; */

  .header {
    display: flex;

    img {
      margin-top: 10px;
    }
  }

  .links-container {
    margin-top: 1%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  li {
    margin-bottom: 5px;
    line-height: 24px;
  }

  a {
    font-size: 14px;
    color: var(--text-color);
    text-decoration: none;
  }

  @media only screen and (max-width: 1023px) {
    .footer--desktop {
      display: none;
    }
  }

  @media only screen and (min-width: 1024px) {
    .footer--mobile {
      display: none;
    }
  }


  .cozzbt a {
    font-size: 14px;
    color: #FAFAFA !important;
    -webkit-text-decoration: none;
    text-decoration: none;
}

.menu-footer a{
  color: #FAFAFA !important;
}
.footer-right{
  color: #FAFAFA !important;
}
`;

export default Footer;
