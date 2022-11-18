// import Link from "next/link";
// import Image from "next/image";
// import Head from "next/head";
// import classes from "./CategoriesListTheme1.module.css";

// const HomeBanner = () => {
//   return (
//     <>
//       <Head>
//         <title>B2BN Starter Home Page</title>
//         <meta
//           name="description"
//           content="Placeholder description for the B2B Starter Marketplace Home Page"
//         />
//       </Head>

//       <div className={classes.categoryList}>
//         <div className={classes.categoryListInner}>
//           <div className={classes.fond}>
//             <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_173_2Hwm0u1tk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554)", marginRight: "20px" }}>
//               <div className={classes.shadow_swhow_mini}>
//                 <div>Must have Kitchen Gadgets</div>
//                 <div className={classes.deroul_titre}>Start your day with the perfect expresso</div>
//                 <div className={classes.deroul_soustitre}>www.wifeo.com/code</div>
//               </div>
//             </div>

//             <div>
//             <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_174_Z1sCg5J8w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747)", marginRight: "20px" }}>
//               <div className={classes.shadow_swhow_mini}>
//                 <div className={classes.deroul_titre}>Season Collection</div>
//                 <div className={classes.deroul_soustitre}>www.wifeo.com/code</div>
//               </div>
//             </div>
//             <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_175_89K9xhmDe.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318298)" }}>
//               <div className={classes.shadow_swhow_mini}>
//                 <div className={classes.deroul_titre}>Shoes</div>
//                 <div className={classes.deroul_soustitre}>www.wifeo.com/code</div>
//               </div>
//             </div>

//             </div>

//           </div>
//         </div>
//       </div>

//       {/* <div className="gadgetsDetailz">
//         <div>
//           <img src="https://ik.imagekit.io/ofb/themes/Group_173_2Hwm0u1tk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554" />
//         </div>
//         <div>
//           <img src="https://ik.imagekit.io/ofb/themes/Group_174_Z1sCg5J8w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747"/>

//           <div className="gadgetDetailzz">
//             <div>
//             <img src="https://ik.imagekit.io/ofb/themes/Group_174_Z1sCg5J8w.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747"/>
//             </div>
//             <div>
//             <img src="https://ik.imagekit.io/ofb/themes/Group_176_5i9S60Q_H.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666237235578"/>
//             </div>
//           </div>
//         </div>
//       </div> */}

//     </>
//   );
// };

// export default HomeBanner;

import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./CategoriesListTheme1.module.css";

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

      {/* <div className={classes.categoryList}>
        <div className={classes.categoryListInner}>
          <div className={classes.fond}>

            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini}>
              <div className={classes.deroul_titre99}>Must have Kitchen Gadgets</div>
                <div className={classes.deroul_titre}>Start your day with the perfect expresso</div>
                <button className={classes.deroul_soustitre}>Shop Now</button>
              </div>
            </div>

            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-1_75cXK3vV2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre99}>Must have Kitchen Gadgets</div>
                <div className={classes.deroul_titre}>Start your day with the perfect expresso</div>
          
                <button className={classes.deroul_soustitre}>Shop Now</button>
              </div>
            </div>

          <div className="product-shownimage">
            <div className={classes.carreaux_presentation_light1} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-2_TOAVQ5S9G.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318298)" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}>Shoes</div>
                <div className={classes.deroul_soustitre1}>www.wifeo.com/code</div>
              </div>
            </div>

            <div className={classes.carreaux_presentation_light2} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_176_5i9S60Q_H.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666237235578)" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}>Shoes</div>
                <div className={classes.deroul_soustitre1}>www.wifeo.com/code</div>
              </div>
            </div>
          </div>


          </div>
        </div>
      </div> */}

      <div className={classes.grid_img}>
        <img
          src="https://ik.imagekit.io/ofb/themes/Group_177_F9b4mQ-8e.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666928930600"
          style={{ height: "540px", width: "533px" }}
        />

        <div className={classes.shadow_swhow_mini}>
          <div className={classes.deroul_titre99}>
            Must have Kitchen Gadgets
          </div>
          <div className={classes.deroul_titre030}>
            Start your day with the perfect expresso
          </div>
          <button className={classes.deroul_soustitre}>Shop Now</button>
        </div>

        <div className="imagesItemLists">
          <div className="img-productlens">
            <img
              src="https://ik.imagekit.io/ofb/themes/Ad_Banner_2__1__ZeweJVjBV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667546065730"
              height="300"
              className="imgProductsl"
            />
            <div className={classes.shadow_swhow_mini}>
              <div className={classes.deroul_titre02}>
                Best Lenses in the Industry
              </div>
              <div className={classes.deroul_titre03}>
                Discover the collection
              </div>

              <button className={classes.deroul_soustitrebtn}>Shop Now</button>
            </div>
          </div>
          <div className="img-ch">
            <img
              src="https://ik.imagekit.io/ofb/themes/Group_179_JhOLJo0d3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666929113581"
              className="img-productr imgProductsl"
            />

            <div className={classes.shadow_swhow_mini}>
              <div className={classes.deroul_titre003}>
                Music like never before
              </div>
              <button className={classes.deroul_soustitrebtn3}>Explore</button>
            </div>

            <img
              src="https://ik.imagekit.io/ofb/themes/Group_176_5i9S60Q_H.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666237235578"
              className="img-productrr imgProductsl"
            />
            <div className={classes.shadow_swhow_mini}>
              <div className={classes.deroul_titre004}>
                Experience the age of Virtual Reality
              </div>
              <button className={classes.deroul_soustitrebtn0003}>
                Explore
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="home-shopproductz">
        <div className="homecontents1-image-wrapper">
          <h1 className="kitchenGadets">Must have Kitchen Gadgets</h1>
          <h6 className="morning-tea">Start your day with the perfect expresso</h6>
          <button className="gadgetbuy-btn">Shop Now</button>
        </div>

        <div className="homecontents2-image-wrapper">
          <h1 className="lensGadets">Best Lenses in the Industry</h1>
          <h6 className="different-collection">Discover the collection</h6>
          <button className="gadgetbuyshoping-btn">Shop Now</button>
        </div>
      </div>

      <div className="home-shopitem3">
        <div className="homecontents3-image-wrapper">
          <h6 className="exp-music">Music like never before</h6>
          <button className="gadgetbuy-btnExplore">Explore</button>
        </div>

        <div className="homecontents4-image-wrapper">
          <h6 className="exp-reality">Experience the age of Virtual Reality</h6>
          <button className="gadgetbuy-btn-explore">Explore</button>
        </div>
      </div>

      {/* <div>
          <div>
          <img src="https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554"/>
          </div>

          <div>

          <div className="kitchenGadget0">
          <img src="https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554"/>
          </div>
          <div>
          <img src="https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554"/>
          </div>

          </div>

        </div>

      </div> */}
    </>
  );
};

export default HomeBanner;
