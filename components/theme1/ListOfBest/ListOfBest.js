import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./NewListOfBest.module.css";

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

      <div className={classes.ListOfBest}>
        <div className={classes.ListOfBestInner}>
          <div className={classes.fond}>
            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_50_ojaMPEBW7.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666094016778)" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>Lorem Ipsum Dolor <br/> <span>Lorem Ipsum Dolor sit</span></div>
                <div className={classes.deroul_soustitre}>
                  {/* <span>Shop Now</span> */}
                  </div>
              </div>
            </div>
            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_52_6hVw2JAXL.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666093914799)" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>Lorem Ipsum Dolor <br/><span>Lorem Ipsum Dolor sit</span></div>
                <div className={classes.deroul_soustitre}>
                  {/* <span>Shop Now</span> */}
                  </div>
              </div>
            </div>
            {/* <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/AdobeStock_265897134_e0OGAMMPJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052305248)" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>Accessories in Style <br/><span>Find your look in our carefully curated collection</span></div>
                <div className={classes.deroul_soustitre}><span>Shop Now</span></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>


    </>
  );
};

export default HomeBanner;
