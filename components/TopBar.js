import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineShoppingCart,
  MdPersonOutline,
  MdClose,
  MdDelete
} from "react-icons/md";
import Image from "next/image";
import Nav from "./Nav";
import Link from "next/link";
import {
  addFunctionWishList,
  toggleWishListAction
} from "../redux/actions/wishlistActions.js";
import Search from "./header/Search.js";
import { handleMobileOrDesktop } from "../redux/actions/mainActions";
// import HamburgerMenu from "./header/HamburgerMenu";
// import Auth from "./elements/Auth/Auth";
// import Drawer from "./elements/Drawer/Drawer.jsx";
// import MiniCart from "./elements/MiniCart/MiniCart.jsx";
import { setAuthModal } from "../redux/actions/app";
import dynamic from "next/dynamic";
import WishListAddToCart from "./product/WishListAddToCart";
import {
  addToCartModalClose,
  addToLocalMiniCart,
  changeProductAttributesAction,
  unMountProductPageAction
} from "../redux/actions/productActions";
import { useRouter } from "next/router";
import Internationalization from "./Internationalization/Internationalization.jsx";
import { useTranslation } from "next-i18next";

const DynamicHamburgerMenu = dynamic(() => import("./header/HamburgerMenu"));
const DynamicAuth = dynamic(() => import("./elements/Auth/Auth"));
const DynamicDrawer = dynamic(() => import("./elements/Drawer/Drawer.jsx"));
const DynamicMiniCart = dynamic(() =>
  import("./elements/MiniCart/MiniCart.jsx")
);

const Wrapper = styled.div`
  height: auto;
  width: 100%;

  .topBar,
  .locationLink,
  .search {
    display: flex;
  }
  @media (max-width: 767px) {
    .search {
      display: none;
    }
  }
  .logo a {
    letter-spacing: 1.11px;
    color: #212b36;
    opacity: 1;
    font-weight: bold;
    font-size: 24px;
    line-height: 51px;
  }
  .Internationalization_display__AxDjv {
    color: var(--text1);
  }

  .basket-count-badge {
    position: absolute;
    padding: 3px;
    border-radius: 9999px;
    background-color: #e21a23;
    color: #fff;
    top: -4px;
    right: -8px;
    min-width: 20px;
  }

  .icons a svg,
  .locationLink svg {
    color: var(--secondary);
  }

  .topBar {
    padding: 15px 0px;
    background-color: var(--bg-topmenu);
    //padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // width: 90%;
    width: 88%;
    margin: 0 auto;

    .topbar--desktop,
    .topbar--mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .topbar--mobile {
      display: none;
    }
  }

  .topBar .logo img {
    max-height: 40px;
    margin-top: 5px;
    margin-left: 80px;
  }

  .topBar > div {
    flex-grow: 1;
  }

  .locationLink {
    padding-top: 3px;
  }

  .locationLink a {
    font-weight: 500;
    color: var(--black);
  }

  .locationLink svg,
  .icons svg {
    margin-top: 7px;
    font-size: 2em;
  }

  .locationLink svg {
    margin-right: 5px;
  }

  .locationLink p {
    font-size: 1em;
  }

  .topBar > div.search {
    flex-grow: 2;
  }

  .search input {
    border: 1px solid var(--black);
    border-right: 0px;
    //padding-left: 10px;
    width: 70%;
    min-width: 200px;
    padding: 12px 10px;
    border-radius: 5px;
  }

  .search button {
    padding: 12px 10px;
    border: 1px solid var(--black);
    border-left: 0px;
    background-color: var(--white);
    color: var(--black);
    font-size: 1.4em;
  }

  .icons {
    text-align: right;
    // border-left: 1px solid #fff;
  }
  .text-secondary img {
    width: 27px;
    height: 23px;
    object-fit: contain;
    margin-right: 15px;
    margin-top: 7px;
  }

  // .cursor-pointer {
  //   border-right: 1px solid #ffffff !important;
  // }

  @media only screen and (min-width: 431px) {
    .cursor-pointer {
      border-right: 1px solid #ffffff !important;
    }

    .icons {
      text-align: right;
      border-left: 1px solid #fff;
    }

  }
  @media only screen and (max-width: 1024px) {
    .wg-default,
    .wg-default .country-selector {
      right: 20% !important;
    }

    .topbar--desktop {
      display: none !important;
    }

    .topbar--mobile {
      display: flex !important;
    }
  }

  .arrow {
    box-sizing: border-box;
    height: 5vw;
    width: 5vw;
    border-style: solid;
    border-color: white;
    border-width: 0px 1px 1px 0px;
    transform: rotate(45deg);
    transition: border-width 150ms ease-in-out;
  }

  .arrow:hover {
    border-bottom-width: 4px;
    border-right-width: 4px;
  }

  .container-category {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0e242d;
    height: 100vh;
  }

  .cursor-pointer {
    color: #ffffff;
  }
  .icons {
    text-align: left !important;
  }
  .my-accountshop1 {
    // margin-right: -87px;
    // margin-bottom: -32px;
    font-size: 13px;
    padding-bottom: 6px;
    color: #fff;
  }
  .my-accountshop {
    color: #fdda06;
    margin-top: auto;
    margin-left: auto;
    margin-right: -94px;
    display: none;
  }
  // .cursor-pointer5{
  //   padding-right: 40px;
  // }
  .countryRegion {
    // margin-left: auto;
    // margin-left: 237px
  }
  .country-region {
    color: #fdda06;
    background-color: #37455e;
  }

  .countryName {
    background-color: #37455e;
    color: #ffffff;
    margin-left: 4px;
  }

  .itembasketTop {
    margintop: 0px !important;
  }

  .nav_submenus {
    marginleft: 67px !important;
  }

  @media screen and (max-width: 431px) {
    .navLink99{
      display: none !important;
    }
  }
`;

const WishList = ({ showWishList, setWishlist, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const { t } = useTranslation("translation");

  const handleWishItemClicked = (url, hasAttributes) => {
    if (isBrowser() && window.location.pathname != url.replace("product", "")) {
      console.log("FARUK1234");
      dispatch(unMountProductPageAction());
    }
    dispatch(changeProductAttributesAction({ ...hasAttributes }));
    onClose();
    router.push(url);
  };

  const toggleWish = (
    id,
    title,
    desc,
    currency_sign,
    image,
    price,
    allPrices,
    properties,
    url
  ) => {
    // e.preventDefault();
    dispatch(
      toggleWishListAction(
        // e,
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        allPrices,
        properties,
        url,
        wishListState
      )
    );
  };

  useEffect(() => {
    let storedWishListString = localStorage.getItem("wishList");
    let storedWishListObject = JSON.parse(storedWishListString);
    if (storedWishListObject != null)
      dispatch(addFunctionWishList([...storedWishListObject]));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListState));
  }, [wishListState]);

  return (
    <div className="h-full bg-white">
      <div
        style={{ top: 0 }}
        className="absolute mx-auto my-0 w-full p-5 flex items-center justify-between font-semibold text-xl bg-black text-white"
      >
        <h2>{t("wishlist.title")}</h2>
        <i
          tabIndex="0"
          onKeyDown={e => {
            if (e.code === "Enter") e.target.click();
          }}
          className="focusAbleWhite text-white text-3xl cursor-pointer"
          onClick={onClose}
        >
          <MdClose />
        </i>
      </div>

      <div
        className="h-full flex flex-col w-full p-5"
        style={{ overflow: "auto", marginTop: "70px", paddingBottom: "80px" }}
      >
        {wishListState.length > 0 ? (
          wishListState.map(item => {
            console.log("item123", item);
            return (
              <div
                className="p-6 my-3 bg-white border shadow flex justify-between items-start relative"
                key={item.id}
              >
                <div className=" w-4/12">
                  <Link href={`${item.url}`}>
                    <a onClick={onClose}>
                      <Image
                        layout="intrinsic"
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.title}
                      />{" "}
                    </a>
                  </Link>
                </div>
                <div className="w-8/12 flex flex-col px-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs font-semibold mt-3">
                    <span className="font-light">{t("items.code")}:</span>{" "}
                    {item.code}
                  </p>
                  <p
                    className="text-sm font-semibold mt-3"
                    style={{ color: "rgb(254, 79, 0)" }}
                  >
                    ${item.price}
                  </p>
                  {/* <p>  <span>$ </span>
                    {item?.price}</p> */}
                </div>
                <div
                  className="absolute bottom-5 right-5 cursor-pointer text-2xl text-gray-400"
                  onClick={e => {
                    toggleWish(
                      item.id,
                      item.title,
                      item.desc,
                      item.currency_sign,
                      item.image,
                      item.price,
                      item.allPrices,
                      // item.properties,
                      item.url,
                      wishListState,
                      false
                    );
                    setWishlist(
                      wishListState.filter(wish => wish.id !== item.id)
                    );
                    localStorage.setItem(
                      "wishList",
                      JSON.stringify([
                        ...JSON.parse(localStorage.getItem("wishList")).filter(
                          w => w.id !== item.id
                        )
                      ])
                    );
                  }}
                >
                  <MdDelete
                    style={{
                      height: "30px",
                      width: "30px"
                    }}
                  />
                </div>
                <WishListAddToCart
                  onClose={() => onClose()}
                  handleWishItemClicked={() =>
                    handleWishItemClicked(item.url, "hasAttributes")
                  }
                  products={{
                    ...item,
                    vid: process.env.NEXT_PUBLIC_VID,
                    qty: 1
                  }}
                />
              </div>
            );
          })
        ) : (
          <div style={{ height: "200px" }}>
            <h1
              style={{
                color: "#10601f",
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "600"
              }}
            >
              No item in the wishlist
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const TopBar = ({ menu, locale }) => {
  console.log("locale33", menu);
  const [showWishList, setShowWishList] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  const [showZoomModal, setShowZoomModal] = useState(false);

  const addToCartSuccess = useSelector(
    state => state.productReducer.addToCartSuccess,
    shallowEqual
  );
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const dispatch = useDispatch();

  const authModalState = useSelector(
    state => state.appReducer.authModal,
    shallowEqual
  );

  const mobileSize = 1023;
  const [currentScreenWidth, setCurrentScreenWidth] = useState(undefined);

  useEffect(() => {
    if (currentScreenWidth !== undefined) {
      let isMobile = currentScreenWidth <= mobileSize;
      dispatch(handleMobileOrDesktop({ isMobile, currentScreenWidth }));
    }
  }, [currentScreenWidth]);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const basketState = useSelector(
    state => state.sessionReducer.basket,
    shallowEqual
  );

  const loginState = useSelector(state => state.loginReducer, shallowEqual);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setCurrentScreenWidth(window.innerWidth);
      };

      if (currentScreenWidth === undefined)
        setCurrentScreenWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [wishlist, setWishlist] = useState([]);

  return (
    <>
      <Wrapper className="topbar-wrap">
        <div className="topBar">
          <div className="topbar--desktop">
            <div className="logo">
              <Link href="/">
                <a>STORE LOGO</a>
              </Link>
            </div>
            {/* <Nav menu={menu} /> */}

            <div className="search">
              <Search />
            </div>

            <div className="countryRegion">
              <h3 className="countryName">Country / Region</h3>
              <select className="country-region">
                <option>United States (USD $)</option>
              </select>
            </div>


            <div className="flex icons">
              {loginState.firstName && (
                <a
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.target.click();
                    }
                  }}
                  className="cursor-pointer"
                  style={{ color: "#fff", margin: "auto 0" }}
                  onClick={() => dispatch(setAuthModal(!authModalState))}
                >
                  {loginState.firstName}
                </a>
              )}
              <a
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                tabIndex={"0"}
                className="cursor-pointer text-secondary mx-1 cursor-pointer5 cursor-pointer00006"
                style={{ fontSize: "13px", paddingTop: "0px" }}
                onClick={() => dispatch(setAuthModal(!authModalState))}
              >
                Login <br />
                <span style={{ color: "#FDDA06" }}>My Account</span>
                {/* <small className="my-accountshop">My Account</small> */}
                {/* <img src="https://ik.imagekit.io/ofb/themes/user__account__people__man_244vfHzVp.png" className="categories-search0"/> */}
                {/* <img src="https://ik.imagekit.io/ofb/themes/Group_57_KRIvlEH3P.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318585" /> */}
              </a>

              <a className="cursor-pointer text-secondary mx-1 relative cursor-pointershare">
                <img
                  src="https://ik.imagekit.io/ofb/themes/Group_189_JFROre1NM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666932243404"
                  className="cursor-pointer00006 cursor-pointershare"
                />
              </a>
              <a
                tabIndex={"0"}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                className="cursor-pointer text-secondary mx-1 relative"
                onClick={() => setShowWishList(!showWishList)}
              >
                {wishListState.length > 0 ? (
                  <>
                    <div className=" absolute w-5 h-5 text-xs flex justify-center items-center -top-1 -right-1 bg-red-600 text-white rounded-full">
                      {wishListState.length}
                    </div>
                    <img src="https://ik.imagekit.io/ofb/themes/Component_76___2_tpoNNbp25.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666771406025" />
                  </>
                ) : (
                  <img src="https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950" />
                )}
              </a>
              <button
                tabIndex={"0"}
                id="basket-icon-btn"
                type="button"
                aria-label="basket"
                className="text-secondary mx-1 relative cartSaveLater"
                onClick={() => dispatch(addToLocalMiniCart())}
              >
                <img
                  src="https://ik.imagekit.io/ofb/cart_Ux9tRMq1F.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666255880085"
                  className="itembasketTop"
                />
                {basketState.itemsCount > 0 ? (
                  <span className="basket-count-badge">
                    {basketState?.itemsCount}
                  </span>
                ) : null}
              </button>
            </div>
          </div>

          <div className="topbar--mobile">
            <DynamicHamburgerMenu menu={menu} className="ham-menu"/>

            <div className="logo">
              <Link href="/">
                STORE LOGO
              </Link>
            </div>
            <div
              className="flex icons"
              style={{ display: "flex" }}
            >
              {/* <a
              className="cursor-pointer text-secondary mx-1"
              onClick={() => dispatch(setAuthModal(!authModalState))}

            > */}
              {/* <img src="https://ik.imagekit.io/ofb/themes/user__account__people__man_244vfHzVp.png" className="categories-search"/> */}
              {/* </a> */}


              {/* login */}

              {/* <a
                className="cursor-pointer text-secondary mx-1"
                onClick={() => dispatch(setAuthModal(!authModalState))}
              >
                <img src="https://ik.imagekit.io/ofb/themes/Group_57_KRIvlEH3P.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318585" />
              </a> */}



              <a className="cursor-pointer text-secondary mx-1 relative cursor-pointershare">
                <img
                  src="https://ik.imagekit.io/ofb/themes/Group_189_JFROre1NM.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666932243404"
                  className="cursor-pointer00006"
                />
              </a>

              <a
                tabIndex={"0"}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                className="cursor-pointer text-secondary mx-1 relative"
                onClick={() => setShowWishList(!showWishList)}
              >
                {wishListState.length > 0 ? (
                  <>
                    <div className=" absolute w-5 h-5 text-xs flex justify-center items-center -top-1 -right-1 bg-red-600 text-white rounded-full">
                      {wishListState.length}
                    </div>
                    <img src="https://ik.imagekit.io/ofb/themes/Component_76___2_tpoNNbp25.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666771406025" />
                  </>
                ) : (
                  <img src="https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950" />
                )}
              </a>

              <button
                id="basket-icon-btn"
                aria-label="basket"
                type="button"
                className="text-secondary mx-1 relative cartSaveLater"
                onClick={() => setCartModalOpen(true)}
              >
                <img src="https://ik.imagekit.io/ofb/cart_Ux9tRMq1F.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666255880085" className="group57-img"/>
                {basketState.itemsCount > 0 ? (
                  <span className="basket-count-badge">
                    {basketState?.itemsCount}
                  </span>
                ) : null}
              </button>

              <a
                className="cursor-pointer text-secondary mx-1 group57Top"
                onClick={() => dispatch(setAuthModal(!authModalState))}
              >
                <img src="https://ik.imagekit.io/ofb/themes/Group_57_KRIvlEH3P.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318585" 
                className="group57-img"/>
              </a>



            </div>
          </div>
        </div>
        {/* <div>hi</div> */}

        <DynamicDrawer
          open={authModalState}
          onClose={() => dispatch(setAuthModal(false))}
        >
          <DynamicAuth
            authModalState={authModalState}
            setAuthModal={() => dispatch(setAuthModal(false))}
          />
        </DynamicDrawer>
        <DynamicDrawer
          open={showWishList}
          onClose={() => setShowWishList(false)}
        >
          <WishList
            show={showWishList}
            wishlist={wishListState}
            setWishlist={setWishlist}
            onClose={() => setShowWishList(false)}
          />
        </DynamicDrawer>
        <DynamicDrawer
          style={{ width: isMobileState ? "90%" : "768px" }}
          open={addToCartSuccess}
          onClose={() => dispatch(addToCartModalClose())}
        >
          <DynamicMiniCart close={() => dispatch(addToCartModalClose())} />
        </DynamicDrawer>
      </Wrapper>

      <div className="allCateg">
        <div className="all-cate">
          
          <div
            className="all-products0"
            onMouseMove={() => {
              setShowZoomModal(!showZoomModal);
            }}
          >
            <h2 className="all_itemprod1">
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



          <div className="navLink99">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default TopBar;
