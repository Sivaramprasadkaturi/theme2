import Link from "next/link";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
import Image from "next/image";
import Head from "next/head";
import Translate from "../../utils/Translate";
// import Nav from "./Nav";
// import Nav from "../Nav";


const HomeBanner = ({menu}) => {
  console.log("menu", menu);
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      <div id="homeBanner">
        {/* <div className="allCateg">
        <div className="all-cate">
        <select name="cars" id="cars1">
            <option value="volvo">All Categories</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
          <div className="navLink99">
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
            <div>
              <ul className="shippingDiscount">
            <li className="nav_submenu nav_submenus">
              <a href="#dolor">Free Shipping on Orders above $500</a>
            </li>
          </ul>
          </div>
          </div>


        </div>



    

      </div> */}

        <div className="homebanner-image-wrapper">
          <h1>Shop the Hottest Products</h1>
          <h6>Discover our extensive collection of all things electronics</h6>
          <button>Explore</button>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
