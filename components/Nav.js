import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { setHTMLElementFixedPosition } from "../utils/functions";
// import "../styles/NavMenu.css";
{/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}

const Wrapper = styled.div`
  background-color: var(--primary);
  color: var(--white);

  //nav,
  //.navContainLeft {
  //  display: flex;
  //}

  .navLink {
    flex-grow: 1;
    color: var(--white);
  }

  .navContainLeft {
    background: none;
    display: flex;
    //justify-content: center;
    height: 63px;
    //display: flex;
    width: 100%;
    //margin-left: 0%;
    justify-content: space-between;
  }

  .navContainRight {
    width: 40%;
  }

  .navAddStore {
    float: right;
    background-color: var(--primary-minus-1);
    padding: 15px 60px;
  }

  .navLink a,
  .navAddStore a {
    color: var(--text1);
    text-decoration: none;
    font-size: 14px;
    font-weight:500;
  }
`;

const Navlink = styled.a`
  .navlink-sublinks-container a {
    padding: 5px;
    width: 100%;
  }

  .navlink-sublinks-container {
    display: none;
  }
`;

const Nav = ({ menu: { childs } }) => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  useEffect(() => {
    setHTMLElementFixedPosition(navMenuOpen);
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, [navMenuOpen]);

  const handleCategoryChange = (cid, cat, parents, longdesc) => {
    // let catName = cat;
    setNavMenuOpen(!navMenuOpen);
  };

  return (
    
      <ul className="all-productslist0">
        {/* <i className="fa fa-angle-right" style="font-size:48px;color:red"></i> */}
              {childs.map(child => {
                let url = child.URL;
                if (url.includes("stores")) {
                  url = "stores";
                }
                return (
                  <li
                    key={child.cid}
                    className="productsCategores"
                  >
                    <Link
                      className="menuCat category-menu"
                      style={{ color: "#fff" }}
                      href={`/${url}`}
                      onClick={() => handleCategoryChange()}
                    >
                      <a>{child.name}</a>
                    </Link>
                    {child.childs.length > 0 ? (
                      <ul className="sub-menu megamenu-wrapper flex">
                        {child.childs.map(subcat => {
                          <li className="hvr-col">
                            <Link
                              href="/"
                              onClick={() => handleCategoryChange()}
                            >
                              <a>{subcat.description}</a>
                            </Link>
                            <ul className="megamenu-child">
                              {subcat.childs.map((subsubcat, index) => (
                                <li className="subchilds" key={index}>
                                  <Link
                                    href="/"
                                    onClick={() => handleCategoryChange()}
                                  >
                                    <a>{subsubcat.description}</a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>;
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
              <li className="productsCategores">
                <Link href={"/news"}>
                  <a>News</a>
                </Link>
              </li>
            </ul>
          
    
  );
};

export default Nav;
