import React from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import { useTranslation } from "next-i18next";

const ItemCateory = () => {
  const { t } = useTranslation("translation");
  return (
    <Wrapper>
      <Head>
        <title>Item Cateory</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta property="og:url" content={LINK_DISTRIBUTION} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      



      {/* <div id="homeBanner">
        <div className="all_categories">
          <select name="cars" id="cars1">
            <option value="volvo">All Categories</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <div>
          <ul className="nav_link1">
            <li className="nav_submenu">
              <a href="#home">Home</a>
            </li>
            <li className="nav_submenu">
              <a href="#product">Product Theme</a>
            </li>
            <li className="nav_submenu">
              <a href="#sale">Sale</a>
            </li>
            <li className="nav_submenu">
              <a href="#brands">Brands</a>
            </li>
            <li className="nav_submenu">
              <a href="#lorem">Lorem</a>
            </li>
            <li className="nav_submenu">
              <a href="#ipsum">Ipsum</a>
            </li>
            <li className="nav_submenu">
              <a href="#dolor">Dolor</a>
            </li>
          </ul>
          </div>
          <div className="shipping_charges">
          Free Shipping on Orders above $500
          </div>

        </div>

        <div className="homebanner-image-wrapper">
          <h1>Shop the Hottest Products</h1>
          <h6>Discover our extensive collection of all things electronics</h6>
          <button>Explore</button>
        </div>
      </div> */}

      <div className="allCateg">
        <div className="all-cate">
        <select name="cars" id="cars1">
            <option value="volvo">All Categories</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <div className="navLink99">
            <div className="header-menuLists">
        <ul className="nav_link1">
            <li className="nav_submenu">
              <a href="#home">Home</a>
            </li>
            <li className="nav_submenu">
              <a href="#product">Product Theme</a>
            </li>
            <li className="nav_submenu">
              <a href="#sale">Sale</a>
            </li>
            <li className="nav_submenu">
              <a href="#brands">Brands</a>
            </li>
            <li className="nav_submenu">
              <a href="#lorem">Lorem</a>
            </li>
            <li className="nav_submenu">
              <a href="#ipsum">Ipsum</a>
            </li>
            <li className="nav_submenu">
              <a href="#dolor">Dolor</a>
            </li>
            </ul>
            </div>
            <div className="shipping-right1">
              <ul className="shippingDiscount">
            <li className="nav_submenu nav_submenus">
              <a href="#dolor">Free Shipping on Orders above $500</a>
            </li>
          </ul>
          </div>
          </div>


        </div>



      <div className="row staticContent">
        <img src="https://ik.imagekit.io/ofb/themes/Group_34_jN0Kf4tCa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666243091153"/>
      </div>

      <div className="products-featured">
  <div className="hr-lines screen-size">Shop by Screen Size</div>
  {/* <div className="prev-nexticons">
  <a href="#" className="previous9 previous8">&#8249;</a>
    <a href="#" className="next9 previous8">&#8250;</a>
  </div> */}
</div>

      </div>
    </Wrapper>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      ))
    }
  };
};

const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;

  .staticContent h1 {
    font-size: 24px;
    text-transform: uppercase;
    text-align: center;
    margin: 20px 0px;
  }
  .staticContent p {
    font-size: 14px;
    margin: 20px 0px;
    line-height: 21px;
    font-weight: 500;
    text-align: justify;
  }

  .row.staticContent {
    width: 70%;
    min-height: calc(100vh - 390px);
  }

  .row.staticContent h1 {
    margin-bottom: 40px;
  }

  .row.staticContent ul li {
    list-style-type: disc;
    margin-left: 40px;
    line-height: 1.8em;
    font-weight: 500;
  }

  .row.staticContent ol li {
    list-style-type: number;
    margin-left: 40px;
    line-height: 1.8em;
    font-weight: 500;
  }

  .row.staticContent{
    width: 100% !important;
  }

  .all-cate{
    display: flex;
    justify-content: space-around;
  }
  .nav_link1{
    padding: 14px 113px;
  }
 
  .nav_submenu a{
    color: #37455E;
    font-weight: 500;
  }
  .nav_submenus{
    font-size: 13px;
  }
  .navLink99{
    display: flex;
  }
  .shippingDiscount{
    margin-top: 13px;
  }
  .screen-size{
    margin-left: 105px;
  }
`;

export default ItemCateory;
