import { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Search from "./Search";
import Nav from "../Nav"

const Wrapper = styled.div``;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 0;
  z-index: 9999;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 1023px) {
    flex-flow: column nowrap;
    // background-color: #333;
    background-color: #fff;
    width: 100%;
    padding-top: 1.5rem;

    li {
      color: #fff;
      padding-left: 5%;
    }
  }
`;

const MobileNavMenu = ({ open, toggle, close, menu }) => {
  const [showZoomModal, setShowZoomModal] = useState(false);

  // const [open, setOpen] = useState(false);


  useEffect(() => {
    if (open) document.body.classList.add("active-modal");
    else document.body.classList.remove("active-modal");

    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [open]);

  return (
    <Wrapper className="mobile-nav-bar-container" open={open}>
      <div
        id="nav-menu-drawer"
        className="nav-wrapper actual-nav scroll-bar-thin-style"
      >
        <div className="nav-content-wrapper">
          {/* <Search closeMobileNav={close} /> */}
          <div className="navmenu-logo-wrapper">
            <h2 className="storeslogo">STORE LOGO</h2>
            <span className="nav-close-btn"
            // open={open}
            // close={() => setOpen(false)}
            // toggle={() => setOpen(!open)}
            // menu={menu}
            >X</span>
          </div>
          <div className="navmenu-profile-wrapper"><p>Hi, Guest</p><button>Sign In</button></div>
          <Ul open={open} style={{ overflowY: "auto" }} onClick={toggle}>
            {/* {menu.childs.map(child => {
              let url = child.URL;
              if (url.includes("stores")) {
                url = "stores";
              }

              return (
                <li key={child.cid} className="navlink-">
                  <Link href={`/${url}`}>
                    <a className="menuCat">{child.name} </a>
                  </Link>
                </li>
              );
            })} */}



                <li className="nav_submenu nav_submenuproduct">
                <img src="https://ik.imagekit.io/ofb/market/Layer_2_cR8qStpWvOP.svg" alt="Icon" className="home-iconz"/>
                  <span className="home-nav"><a href="#home">Home</a></span>
                </li>

                <div className="allCateg">
        <div className="all-cate">
          <div
            className="all-products0"
            onMouseMove={() => {
              setShowZoomModal(!showZoomModal);
            }}
          >

            <h2 className="all_itemprod1">
            <img src="https://ik.imagekit.io/ofb/market/category_2x_ZlfVlSWab.png" alt="Icon" style={{width: "6%", marginRight: "9px",
          marginLeft: "8%"}}/>

              All Products
              <span className="rightDownexpandicon">
                <i className={showZoomModal ? "arrow down" : "arrow right"}>
                  {showZoomModal ? (
                    <img src="https://ik.imagekit.io/ofb/themes/down-arrow_EWBmEWAYW.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667376253356" />
                  ) : (
                    <img src="https://ik.imagekit.io/ofb/themes/next_mNDdU4zh-.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667376253375" />
                  )}
                </i>
              </span>
            </h2>
            <Nav menu={menu} />
</div>



          {/* <div className="navLink99">
            <div className="freeShippingDetails">
              <ul className="nav_link1">
                <li className="nav_submenu">
                  <a href="#home">Home</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#product">Product Theme</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#sale">Sale</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#brands">Brands</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#lorem">Lorem</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#ipsum">Ipsum</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu">
                  <a href="#dolor">Dolor</a>
                </li>
              </ul>
            </div>
            <div>
              <ul className="shippingDiscount">
                <li className="nav_submenu nav_submenus">
                  <a href="#dolor">Free Shipping on Orders above $500</a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>

                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                {/* <img src="https://ik.imagekit.io/ofb/market/about_2x_BuXYbr_XL4M.png" alt="Icon" className="home-iconz"/> */}
                  <a href="#product">Product Theme</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                  <a href="#sale">Sale</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                  <a href="#brands">Brands</a>
                </li>



                


                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                  <a href="#lorem">Lorem</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                  <a href="#ipsum">Ipsum</a>
                </li>
                <li className="nav_submenu"></li>
                <li className="nav_submenu nav_submenuproduct">
                  <a href="#dolor">Dolor</a>
                </li>
          </Ul>
        </div>
      </div>
    </Wrapper>
  );
};

export default MobileNavMenu;
