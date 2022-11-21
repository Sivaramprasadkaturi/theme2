import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LINK_DISTRIBUTION, PROJECT_LINK, VID } from "../project-config";
import HomeBanner from "../components/home/HomeBanner";
import Collections from "../components/Collections";
import FeaturedSellers from "../components/FeaturedSellers";
import CategoriesListTheme1 from "../components/theme1/category-list/CategoriesListTheme1";
import menuData from "../preBuildData/menu/menu.json";
import { categoryUrl } from "../preScripts/links";
import PopularOffersoftheDay from "../components/FeaturedProducts";
import Head from "next/head";
// import ExternalContentFromCMS from "../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import Translate from "../utils/Translate";
import EndOfSeason from "../components/theme1/EndOfSeason/EndOfSeason";
import ShopByType from "../components/theme1/ShopByType/ShopByType";
import ShopByCollection from "../components/theme1/ShopByCollection/ShopByCollection";
import ListOfBest from "../components/theme1/ListOfBest/ListOfBest";
import Policies from "../components/theme1/Policies/Policies";
const DynamicExternalContentFromCMS = dynamic(() =>
  import("../components/AC-ExternalContentFromCMS/ExternalContentFromCMS")
);

export default function Home({ carousel, menu, shopbyData }) {
  const { t } = useTranslation("translation");

  console.log("t22", shopbyData);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let storeCid = menuData.childs.find(cat =>
        cat.URL.includes("stores")
      ).cid;

      let storesData = await fetch(categoryUrl({ id: storeCid }));
      let data = await storesData?.json();
      setStores(data[1]);
    }
    fetchData();
  }, []);

  // const fetchQueryData = async (query, sortBy) => {
  //   let storeCid = menuData.childs.find(cat => cat.URL.includes("stores")).cid;
  //
  //   const storesData = await fetch(
  //     categoryUrl({
  //       id: storeCid,
  //       query:
  //         query.length > 0
  //           ? query
  //               .map(q => "&" + q.name.toLowerCase() + "=" + q.value)
  //               .join("")
  //           : "",
  //       sortBy
  //     })
  //   );
  //   let data = await storesData.json();
  //
  //   setStores(data);
  // };
  //
  // useEffect(() => {
  //   if (query.length > 0 || sortBy !== "") {
  //     fetchQueryData(query, sortBy);
  //   }
  // }, [query, sortBy]);

  return (
    <>
      <Head>
        <title>Home</title>
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
      <DynamicExternalContentFromCMS
        place="home"
        position="Top"
        renderedBy="Header"
      />
      <HomeBanner />
      <DynamicExternalContentFromCMS
        place="home"
        position="Middle"
        renderedBy="Header"
      />
      <CategoriesListTheme1 />
      <PopularOffersoftheDay shopby={shopbyData} />
      
      <EndOfSeason />
      {/* <ShopByType /> */}
      <ShopByType shopby={shopbyData} />

      {/* <ShopByCollection /> */}
      <ListOfBest />
      <Policies />
      
      {/* <img src="https://ik.imagekit.io/ofb/themes/Image_1_ZzNfpuWRD.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052320020" /> */}
      {/* <div className="browseCat-container" style={{ marginTop: "30px" }}>
        <h3 className="browseCat">
          <Translate
            translationFileName={"translation"}
            translateKey={"home.browseByCategories"}
          />
        </h3>
        <Collections />
        
        <FeaturedSellers stores={stores} />
       
      </div> */}

      <DynamicExternalContentFromCMS
        place="home"
        position="Bottom"
        renderedBy="HomeBanner"
      />
      
    </>
  );
}

export async function getStaticProps({ locale }) {
  // let data;
  // let banners;
  let carousel;
  let menu;
  // try {
  //   const url = `${PROJECT_LINK}/uservices/1.0.2/category-page/${VID}/cid/445448/lang/en/`; // furniture category's cid
  //   const res = await fetch(url);
  //   data = await res.json();
  // } catch (err) {
  //   console.error("Error fetching static data for index page", err);
  // }

  // try {
  //   const strapiUrl = "https://cms.avetti.io/banners";
  //   const res = await fetch(strapiUrl);
  //   banners = await res.json();
  // } catch (e) {
  //   console.log(e);
  // }

  try {
    const strapiUrl =
      "https://cms.avetti.io/home-carousels?id=628cd1fc01b9a94d6c985db1";
    const res = await fetch(strapiUrl);
    carousel = await res.json();
    // carousel = carousel[0].map(img => img.image_mobile);
  } catch (e) {
    console.log(e);
  }

  /* try {
    const url = `${LINK_DISTRIBUTION}/uservices/1.0.2/menu/${VID}/category/Shop/lang/${locale}/?longdesc=1`;
    console.log("menu url", url);
    const res = await fetch(url);
    menu = await res.json();
  } catch (e) {
    console.log("error fetching menu", e);
  }
 */
  /*   if (data === undefined) {
    data = {};
  }
 */

  try {
    const url = `${LINK_DISTRIBUTION}/uservices/1.0.2/menu/${VID}/category/menu1/lang/en/?longdesc=1`;
    const res = await fetch(url);
    menu = await res.json();
  } catch (e) {
    console.log(e);
  }

  let storesData = [];
  let featuredStoresData = [];

  let shopbyData = [];

  let collectionData = [];

  try {
    // const ShopCid = "557799";
    // const StoreCid = "557715";
    /* All Stores Data  */
    const url = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/559229/lang/en/`;

    const res = await fetch(url);
    storesData = await res.json();

    /* featured products */
    const featuredProducts = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/559229/lang/en/`;

    const resFeaturedProducts = await fetch(featuredProducts);
    const featuredProductsData = await resFeaturedProducts.json();

    let featuredProductsCreatedBySupplierList = [];

    featuredProductsData?.[1].items.forEach(item => {
      const supplier = item?.properties?.Created_By_Supplier;
      if (supplier && !featuredProductsCreatedBySupplierList.includes(supplier))
        featuredProductsCreatedBySupplierList.push(supplier);
    });

    const featuredProductsDataPageCount = Number(
      featuredProductsData?.[0]?.numOfPages
    );

    if (featuredProductsDataPageCount && featuredProductsDataPageCount > 1) {
      // fetch all pages promise all using map
      const allPagesPromise = Array.from(
        { length: featuredProductsDataPageCount },
        (_, i) => i + 1
      ).map(async pageNumber => {
        const pagingUrl = CATEGORY_PAGING_FETCH_LINK({
          cid: shopByCid,
          page: pageNumber,
          lang: "en",
          queryString: "&featured_sellers=20220706044"
        });
        const res = await fetch(pagingUrl);
        const data = await res.json();
        return data;
      });

      const allPagesData = await Promise.all(allPagesPromise);

      allPagesData.forEach(pageData => {
        pageData.forEach(data => {
          data?.[1].items.forEach(item => {
            const supplier = item?.properties?.Created_By_Supplier;
            if (
              supplier &&
              !featuredProductsCreatedBySupplierList.includes(supplier)
            )
              featuredProductsCreatedBySupplierList.push(supplier);
          });
        });
      });

      console.log("allPagesData", allPagesData);
    }

    featuredStoresData = storesData;

    if (featuredStoresData?.[1]?.items) {
      featuredStoresData[1].items = storesData?.[1].items.filter(store => {
        return featuredProductsCreatedBySupplierList.includes(
          store?.properties?.Created_By_Supplier
        );
      });
    }

    console.table({
      url,
      featuredProducts,
      featuredProductsDataPageCount,
      featuredProductsCreatedBySupplierList
    });

    /* ShopBy Products */
    const furl = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/559229/lang/en/`;

    console.log('siva', VID);

   
    const curl = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/559229/lang/en/`;

   

    console.log("stores url", VID);
    /* ShopBy Products */
    const fres = await fetch(furl);
    shopbyData = await fres.json();

    /* Collection Products */
    const cres = await fetch(curl);
    collectionData = await cres.json();

    

    console.log("resresres", shopbyData);
  } catch (err) {
    console.error("Error fetching static data for stores index page", err);
  }

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      )),
      carousel,
      menu,
      storesData,
      featuredStoresData,
      shopbyData,
      collectionData
    },
    revalidate: 3600 * 24
  };
}

const Wrapper = styled.main`
  margin-top: 30px;

  hr {
    border: none;
    border-bottom: 1px solid rgb(221, 221, 221);
    margin: 30px 0;
  }

  .one-column {
    /* width: 600px;
    position: relative; */

    img {
      width: 100%;
    }
  }

  .three-columns {
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;

    .article-img {
      grid-column: span 1;
    }
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }

  .unset {
    width: 100%;
  }

  .unset > div {
    position: unset !important;
  }

  @media only screen and (max-width: 768px) {
    .three-columns {
      grid-template-columns: 1fr;
    }
  }
`;
