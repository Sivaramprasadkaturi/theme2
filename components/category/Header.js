import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { PROJECT_LINK } from "../../preScripts/links";
import { useRouter } from "next/router";

import classes from "./Header.module.css";

const Header = ({ title, subcats }) => {
  const { asPath } = useRouter();
  const dispatch = useDispatch();
  const catsExpanded = useSelector(
    state => state.menuReducer.bannerViewMore,
    shallowEqual
  );
  const [bgClass, setBgClass] = useState("simpleBG");
  // let bgClass = "pendantsBG";

  useEffect(() => {
    // console.warn(asPath);
    const catUrl = asPath;
    if (catUrl.includes("/shop/pendants")) {
      setBgClass("pendantsBG");
    } else if (catUrl.includes("/shop/ceiling")) {
      setBgClass("ceilingBG");
    } else if (catUrl.includes("/shop/chandeliers")) {
      setBgClass("chandeliersBG");
    } else if (catUrl.includes("/shop/wall-vanity")) {
      setBgClass("wallAndVanityBG");
    } else if (catUrl.includes("/shop/lamps-decor")) {
      setBgClass("lampsBG");
    } else if (catUrl.includes("/shop/accessories")) {
      setBgClass("accessoriesBG");
    } else if (catUrl.includes("/shop/outlet")) {
      setBgClass("outletBG");
    } else {
    }
  }, [asPath]);

  const renderImageBanner = (item, brand, imgName, alt) => {
    return (
      <div className={classes.imgDiv}>
        <div className={classes.linkDiv}>
          <Link className="text-link" href="/">
            {item}
          </Link>
          {"  "}by{"  "}
          <Link className="text-link" href="/">
            {brand}
          </Link>
        </div>
        <div className={classes.imgWrapper}>
          <img
            src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/Category/${imgName}`}
            alt={alt}
          />
        </div>
      </div>
    );
  };

  const renderVideoBanner = (item, brand, imgName) => {
    return (
      <div className={classes.imgDiv}>
        <div className={classes.linkDiv}>
          <Link className="text-link" href="/">
            {item}
          </Link>
          {"  "}by{"  "}
          <Link className="text-link" href="/">
            {brand}
          </Link>
        </div>
        <div className={classes.imgWrapper}>
          <video
            width="100%"
            style={{ background: "#eee" }}
            autoPlay
            muted
            loop
            controls={false}
          >
            <source
              src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/Category/${imgName}`}
              type="video/webm"
            ></source>
          </video>
        </div>
      </div>
    );
  };

  const renderPromoBanner = () => {
    if (bgClass === "pendantsBG") {
      return renderImageBanner(
        "Gravity - PP121412-PW",
        "PageOne",
        "bannerMenu-Pendants-Tier1_OpbbLJ0DA.png",
        "Pendant Image - Gravity - PP121412-PW by PageOne Lighting"
      );
    } else if (bgClass === "ceilingBG") {
      return renderImageBanner(
        "Skylight - PC111150-SDG",
        "PageOne",
        "bannerMenu-Ceiling-Tier1_2L_sbD9iuo7.png",
        "Ceiling Image - Skylight - PC111150-SDG by PageOne Lighting"
      );
    } else if (bgClass === "chandeliersBG") {
      return renderImageBanner(
        "Enchanted - 5635P20C",
        "CWI Lighting",
        "bannerMenu-Chandelier-Tier1_kXgQTYt755O.png",
        "Chandelier Image - Enchanted - 5635P20C by CWI Lighting"
      );
    } else if (bgClass === "wallAndVanityBG") {
      return renderVideoBanner(
        "Pandora - PW131011-SDG",
        "PageOne",
        "WallAndVanity-Pandora_fseEjSWQm.webm"
      );
    } else if (bgClass === "lampsBG") {
      return renderImageBanner(
        "Old Days - T140004",
        "Tubicen",
        "bannerMenu-Lamps-Tier1_AgzXSFo2T.png",
        "Lamp image - Old Days - T140004 by Tubicen"
      );
    } else if (bgClass === "accessoriesBG") {
      return renderImageBanner(
        "Aurora - PW131325-SBB",
        "PageOne",
        "bannerMenu-Accessories-Tier1_Y7yADafafS.png",
        "Aurora - PW131325-SBB by PageOne Lighting"
      );
    } else if (bgClass === "outletBG") {
      return renderImageBanner(
        "Stardust - 10121044002",
        "PageOne",
        "bannerMenu-Outlet-Tier1_KdRvs_5u7.png",
        "Stardust - 10121044002 by PageOne Lighting"
      );
    } else return null;
  };
  return (
    <div
      id="subcatBack"
      className={classes.catBg}
      style={
        catsExpanded
          ? {
              height: "100px",
              transition: "height 0.7s"
            }
          : {
              height: "432px",
              transition: "height 0.7s"
            }
      }
    >
      <div className={classes.categoryTitleNew}>
        <h1>
          <span dangerouslySetInnerHTML={{ __html: title }}>
            {/*   {title == "Wall &amp; Vanity" || title == "LAMPS & D&Eacute;COR"
              ? title.replace(" &amp; ", " & ").replace("&Eacute;", "é")
              : title} */}
          </span>
        </h1>
        <div className={classes.expand}>
          <button onClick={() => dispatch({ type: "SWITCH_BANNER_STATE" })}>
            View {catsExpanded ? `More` : `Less`}
            <br />
            <div
              style={catsExpanded ? null : { transform: "rotate(180deg)" }}
              className={classes.viewMoreCatBtn}
            >
              {/* <FaAngleDoubleDown
                preserveAspectRatio="none"
                style={{ height: "13px", width: "20px", margin: "4px 0" }}
              /> */}
            </div>
          </button>
        </div>
      </div>

      <div className={classes.navWrapper}>
        <ul
          className={
            subcats.length > 39
              ? classes.categoryNavLarge
              : classes.categoryNavNew
          }
        >
          {Object.keys(subcats).length > 0 &&
            subcats.map(
              (
                { name, description, URL, cid, longdesc, num_of_items },
                index
              ) => {
                URL = URL.replace("SLighting/", "");
                let catName = description
                  .replace("&amp;", "&")
                  .replace("&Eacute;", "é");

                if (
                  typeof num_of_items !== "undefined" &&
                  Number(num_of_items) > 0
                ) {
                  return (
                    <li key={cid}>
                      {" "}
                      <Link
                        href={`/shop/[...slug]`}
                        as={`/${URL.toLowerCase().replace(/\/\s*$/, "")}`}
                        prefetch={false}
                      >
                        {catName
                          .replace(" Pendants", "")
                          .replace(" of Pendant", "")
                          .replace("by Shape of", "by Shape")
                          .replace("by Tier Total of", "by Number of Tiers")
                          .replace(
                            "by Pendant Total of Multi-Pendants",
                            "by Number of Pendants"
                          )
                          .replace(" Chandeliers", "")
                          .replace(" of Chandelier", "")
                          .replace(
                            "by Pendant Total Multi-Chandeliers",
                            "by Number of Pendants"
                          )
                          .replace(" Ceiling Lights", "")
                          .replace(" of Ceiling Lights", "")
                          .replace(" of Ceiling Light", "")
                          .replace(" Wall & Vanity Lights", "")
                          .replace(" Wall & Vanity", "")
                          .replace(" Scone", " Sconce")}
                      </Link>
                    </li>
                  );
                } else if (typeof num_of_items === "undefined") {
                  return (
                    <li key={cid}>
                      {" "}
                      <Link
                        href={`/shop/[...slug]`}
                        as={`/${URL.toLowerCase().replace(/\/\s*$/, "")}`}
                        prefetch={false}
                      >
                        {catName
                          .replace(" Pendants", "")
                          .replace(" of Pendant", "")
                          .replace("by Shape of", "by Shape")
                          .replace("by Tier Total of", "by Number of Tiers")
                          .replace(
                            "by Pendant Total of Multi-Pendants",
                            "by Number of Pendants"
                          )
                          .replace(" Chandeliers", "")
                          .replace(" of Chandelier", "")
                          .replace(
                            "by Pendant Total Multi-Chandeliers",
                            "by Number of Pendants"
                          )
                          .replace(" Ceiling Lights", "")
                          .replace(" of Ceiling Lights", "")
                          .replace(" of Ceiling Light", "")
                          .replace(" Wall & Vanity Lights", "")
                          .replace(" Wall & Vanity", "")
                          .replace(" Scone", " Sconce")}
                      </Link>
                    </li>
                  );
                }
              }
            )}
        </ul>
        <div>
          {bgClass !== "" ? renderPromoBanner() : null}
          {/* <h2>IMAGE HERE</h2> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
