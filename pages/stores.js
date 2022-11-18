import { useEffect, useState } from "react";
// import Mapbox from "../components/map/Mapbox";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";

import menuData from "../preBuildData/menu/menu.json";
import { categoryUrl } from "../preScripts/links";
import StoreItems from "../components/StoreItems";
import styled from "styled-components";
import Container from "../components/elements/Container";
// import Mapbox from "../components/map/Mapbox";
import Drawer from "../components/elements/Drawer/Drawer";
import { MdFilterList } from "react-icons/md";

import ExternalContentFromCMS from "../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
// import Facet from "../categorise/Facet";
import Facet from "../components/categorise/Facet";
import Facets from "../components/Facets/Facets";
import SortBy from "../components/category/SortBy";
import ProductCount from "../components/category/ProductCount";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";
import StoreProducts from "../components/StoreProducts";

const DynamicMapbox = dynamic(() => import("../components/map/Mapbox"));

const storeCid = menuData.childs.find(cat => cat.URL.includes("stores"))?.cid;

const setFacetsAPI = (setFacets, facets) => {
  if (facets) {
    console.log("facets", facets);
    const tempFacets = [];

    facets.forEach(facet => {
      if (facet?.Price || facet?.Reviews) {
        tempFacets.push({
          title: Object.keys(facet)[0],
          name: Object.keys(facet)[0].toLowerCase(),
          facetValues: Object.values(facet)
            .flat(1)
            .map(value => {
              return {
                ...value,
                name: Object.keys(facet)[0],
                text: value.removeText?.split(": ")[1]
              };
            }),
          positiveCount:
            Object.values(facet)
              .flat(1)
              .reduce(function (total, item) {
                total += item.count;
                return total;
              }, 0) > 0,
          show: false
        });
      } else if (facet?.Other) {
        tempFacets.push(
          ...Object.values(facet)
            .flat(1)
            .map(v => {
              return { ...v, show: false };
            })
        );
      }
    });
    console.log("tempFacets", tempFacets);
    setFacets(tempFacets);
  }
};

const Stores = ({ storesProps, storesState }) => {
  console.log("storesProps", storesProps);
  const router = useRouter();
  const [stores, setStores] = useState(storesProps);
  const [storeItems, setStoreItems] = useState(stores?.[1]?.items || []);

  const [facets, setFacets] = useState([]);
  // const [numOfPages, setNumOfPages] = useState(0);
  const [query, setQuery] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [initialStoreData, setInitialStoreData] = useState(storesState);
  const [initialCategoryItems, setInitialCategoryItems] = useState(
    storesState?.[1]?.items
  );
  const [categories, setCategories] = useState(storesState?.[1]?.items);
  const [numOfPages, setNumOfPages] = useState(storesState?.[0]?.numOfPages);

  const [currentScrollPage, setCurrentScrollPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // const isMobileState = useSelector(
  //   state => state.mainReducer.isMobile,
  //   shallowEqual
  // );

  /*   useEffect(async () => {
    let storeCid = menuData.childs.find(cat => cat.URL.includes("stores")).cid;

    let storesData = await fetch(categoryUrl({ id: storeCid }));
    let data = await storesData?.json();
    setStores(data);
    console.log({ storeCid, data });
  }, []); */

  const fetchQueryData = async (query, sortBy) => {
    const storesData = await fetch(
      categoryUrl({
        id: storeCid,
        query:
          query.length > 0
            ? query
                .map(q => "&" + q.name.toLowerCase() + "=" + q.value)
                .join("")
            : "",
        sortBy
      })
    );
    let data = await storesData.json();

    setStores(data);
    setFacetsAPI(setFacets, data?.[2]?.facets);
  };

  useEffect(async () => {
    if (typeof stores !== "undefined" && stores.length > 0) {
      setFacetsAPI(setFacets, stores?.[2]?.facets);
      setNumOfPages(Number(stores[0].numOfPages));
      setStoreItems(stores?.[1]?.items);
    }

    return () => {
      setFacets([]);
      setNumOfPages(0);
      setCurrentScrollPage(1);
    };
  }, [stores]);

  useEffect(() => {
    if (query.length > 0 || sortBy !== "") {
      fetchQueryData(query, sortBy);
    }
  }, [query, sortBy]);

  useEffect(async () => {
    if (storesState && storesState.length > 0) {
      setInitialCategoryItems(storesState[1].items);
      setCategories(storesState[1].items);
      setNumOfPages(storesState[0].numOfPages);
      setNumberOfItems(storesState?.[4]?.itemsCount);
    }
    if (
      storesState &&
      storesState.length > 0 &&
      storesState[2].facets.length > 0
    ) {
      setFacetsAPI(setFacets, storesState[2].facets);
    }
    return () => {
      setInitialCategoryItems(null);
      setInitialStoreData(null);
      setCategories([]);
      setFacets([]);
      setNumOfPages(0);
      setCurrentScrollPage(1);
      setNumberOfItems(null);
    };
  }, [storesState, router]);

  return (
    <>
      <Head>
        <title>Stores</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/Logonew_white.png`} />
        <meta
          property="og:image:secure_url"
          content={`/images/Logonew_white.png`}
        />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta property="og:url" content={LINK_DISTRIBUTION} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ExternalContentFromCMS
        place="home"
        position="Top"
        renderedBy="HomeBanner"
      />

      <div style={{ marginTop: "55px" }}>
        {/* <img
                    src={`https://ik.imagekit.io/ofb/themes/Group_207_bVZ9dOp3h.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667455960983`}
                  /> */}

        <div className="storesbanner-image-wrapper">
          <h1 className="banner_brands">Brands</h1>
          <h6 className="banner_brandsdescription">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore
          </h6>
        </div>
      </div>

      <Container>
        <Wrapper className="store-wrap1">
          {/* <div className="search-products-title">
            <div>
              <input
                type="text"
                placeholder="Search for seller"
                name="search"
                className="searchItems"
                onChange={e => {
                  setSearchTerm(e.target.value);
                }}
                value={searchTerm}
              />
              <img
                className="afterloggedinsearchicon4"
                src="https://ik.imagekit.io/ofb/CASEA/17_Menu_Search_S6TtFjHip.svg?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1660803056613"
              />
            </div>

            
          </div>
 */}

          {/* <h1 className="title">SELLERS</h1> */}
          {/* <div> */}
          {/* <div className="w-full mb-6 bg-gray-50" style={{ height: 400 }}>
              {stores?.[1]?.items.length > 0 && (
                <DynamicMapbox stores={stores?.[1]?.items} />
              )}
            </div> */}

          {/* </div> */}
          <div className="flex">
            {/* <div className="wrapj">
                <div className="search">
                  <input
                    type="text"
                    className="searchTermj"
                    placeholder="Search for Brands"
                  />
                  <button type="submit" className="searchButtonj">
                  <img
                className="afterloggedinsearchicon4"
                src="https://ik.imagekit.io/ofb/CASEA/17_Menu_Search_S6TtFjHip.svg?ik-sdk-version=javascript-1.4.3&amp;updatedAt=1660803056613"
              />
                  </button>
                </div>
              </div> */}

            {/* <div> */}

            <div className="flex w-3/12 flex-col pr-4 store-filters">
              <h2 className="text-lg lg:text-2xl productSortedAvailability">
                Availability
              </h2>
              <div className="form-check col-md-12">
                <input
                  type="checkbox"
                  className="form-check-input rangeCheck"
                  id="range1"
                  data-range="4999"
                  readonly="true"
                />
                <label className="form-check-label" htmlFor="range1">
                  In Stock
                </label>
              </div>

              <div className="form-check col-md-12">
                <input
                  type="checkbox"
                  className="form-check-input rangeCheck"
                  id="range1"
                  data-range="4999"
                  readonly="true"
                />
                <label className="form-check-label" htmlFor="range1">
                  Express Shipping
                </label>
              </div>

              {/* {facets.length > 0 && */}
              {/* <button
          className="mobile-filter-button"
          onClick={() => setMobileFacetsOpen(true)}
        >
          Filter
          <MdFilterList />
        </button> */}

              {/* {isMobileState && (
          <Drawer
            open={mobileFacetsOpen}
            onClose={() => setMobileFacetsOpen(false)}
          > */}
              
              {facets.length > 0 &&
                facets.map((facet, i) => {
                  return (
                    <Facet
                      key={facet.title}
                      query={query}
                      setQuery={setQuery}
                      facet={facet}
                    />
                    // </Drawer>
                  );
                }
                )}
            </div>

            {/* <div> */}

            <div>
              <div>
                <div className="searchj wrapj">
                  <input
                    type="text"
                    className="searchTermj"
                    placeholder="Search for Brands"
                  />
                  <button type="submit" className="searchButtonj">
                    <img
                      className="afterloggedinsearchicon4 afterlogged"
                      src="https://ik.imagekit.io/ofb/themes/Path_3_VlEL1XROsa.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667559337696"
                    />
                  </button>
                </div>

                {/* <div> */}
                {/* //sortBy */}
                {/* {storesState && storesState.length > 0 ? (
            <div className="facets-and-category-items-wrapper flex-row block">
              <div className="facets-wrapper w-full">{renderFacets()}</div>

              <div className="flex flex-col w-full ">
                <div className="sortby-product-count-wrapper">
                  <SortBy productCount={numberOfItems} setSortBy={setSortBy} />
                  <p style={{ marginLeft: "1rem" }}>
                    <ProductCount productCount={numberOfItems} />
                  </p>
                </div>

                <div className="flex flex-wrap w-full">
                  {query.map(q => (
                    <div
                      key={q.value}
                      className="facetBreadcrumb relative flex items-center justify-between py-2 pl-2 pr-1 mb-2 mr-2 rounded-sm"
                      style={{
                        border: "1px solid #444444"
                      }}
                      onClick={() =>
                        setQuery([...query.filter(qy => qy.value !== q.value)])
                      }
                    >
                      <p className="text-sm" style={{ color: "#444444" }}>
                        {q.removeText?.split(":")[0]}:
                        <span className="font-semibold">
                          {q.removeText?.split(":")[1]}
                        </span>
                      </p>
                      <div className="p-1 ml-1 text-xs cursor-pointer">
                        <MdOutlineClose />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <ExternalContentFromCMS place="supplier" position="Bottom" />

              <div className="productsContainer">
                {!isMobileState && (
                  <div className="filterProducts">
                    <Facets
                      query={query}
                      setQuery={setQuery}
                      facets={facets}
                      setQueryIsNotChanged={setQueryIsNotChanged}
                      queryIsNotChanged={queryIsNotChanged}
                    />
                  </div>
                )}
                <div className="productsList">
                  <StoreProducts
                    initialStoreData={initialStoreData}
                    items={categories}
                    setCategories={setCategories}
                    setNumberOfItems={setNumberOfItems}
                    setNumOfPages={setNumOfPages}
                    setFacets={setFacets}
                    query={query}
                    sortBy={sortBy}
                    queryMappedToParams={queryMappedToParams}
                    urlFrom={router.asPath}
                    storeId={storeData?.id}
                    numOfPages={numOfPages}
                    currentScrollPage={currentScrollPage}
                    setCurrentScrollPage={setCurrentScrollPage}
                    storeCid={"531764"}
                    URLCapitalize={URLCapitalize}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-80">
              <h2 className="mt-20">No results are found </h2>
            </div>
          )} */}

                {/* //sortBy */}
                {/* </div> */}
              </div>

              {typeof window !== undefined &&
              typeof XMLHttpRequest !== undefined ? (
                <StoreItems
                  sortBy={sortBy}
                  query={query}
                  storeCid={storeCid}
                  numOfPages={numOfPages}
                  currentScrollPage={currentScrollPage}
                  setCurrentScrollPage={setCurrentScrollPage}
                  storeItems={storeItems}
                  setStoreItems={setStoreItems}
                />
              ) : null}
            </div>
            {/* </div> */}
          </div>
        </Wrapper>
      </Container>
    </>
  );
};

const Wrapper = styled.div`
  min-height: 60vh;

  .title {
    margin: 0;
    line-height: initial;
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: normal;
    padding-left: 0px;
    height: 120px;
    display: flex;
    align-items: center;
    margin-left: 5px;
  }
`;

export const getStaticProps = async ({ locale }) => {
  if (storeCid) {
    const storesData = await fetch(
      categoryUrl({
        id: storeCid
      })
    );

    console.log("storesData", storesData, locale);
    const data = await storesData.json();
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        storesProps: data
      },
      revalidate: 3600 * 24
    };
  } else {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        storesProps: []
      },
      revalidate: 3600 * 24
    };
  }
};

export default Stores;
