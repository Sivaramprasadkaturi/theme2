import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./ShopByCollection.module.css";

const HomeBanner = () => {
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      <div className={classes.ShopByCollection}>
        <div className={classes.ShopByCollectionInner}>
          <h1 className={classes.ShopByCollectionHeading}>Shop by Collection</h1>
          <div className={classes.ShopByCollectionUl}>
            <ul>
              <li>
                <div className={classes.ShopByCollectionImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_287036617_oZZpiub8o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052307122" /></div>
                <div className={classes.ShopByCollectionContent}>
                  <h1>Seasons Collection</h1>
                  <h6>121 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByCollectionImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_235181771_R6SF4u88uw.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052300028" /></div>
                <div className={classes.ShopByCollectionContent}>
                  <h1>Prints</h1>
                  <h6>158 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByCollectionImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_284343355_OPkPH2p8P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052305123" /></div>
                <div className={classes.ShopByCollectionContent}>
                  <h1>Formal Wear</h1>
                  <h6>450 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByCollectionImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_352896872_MWF3WiYN0.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052313903" /></div>
                <div className={classes.ShopByCollectionContent}>
                  <h1>Party Wear</h1>
                  <h6>121 Items</h6>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>


    </>
  );
};

export default HomeBanner;
