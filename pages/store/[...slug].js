import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import menuData from "../../preBuildData/menu/menu.json";
import { categoryUrl } from "../../preScripts/links";
import styled from "styled-components";
import ExternalContentFromCMS from "../../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";

import Container from "../../components/shared-components/Container";
import Link from "next/link";
import { useRouter } from "next/router";
import StoreProducts from "../../components/StoreProducts";
// import { setFacetsAPI } from "../shop/[...slug]";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdStar,
  MdOutlineClose,
  MdFilterList
} from "react-icons/md";
import StoreAboutInfo from "../../components/StoreAboutInfo";
import Facets from "../../components/Facets/Facets";
import Drawer from "../../components/elements/Drawer/Drawer";
import SortBy from "../../components/category/SortBy";
import ProductCount from "../../components/category/ProductCount";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {Fade} from "react-awesome-reveal";
import { i18n } from "../../next-i18next.config";

const setFacetsAPI = (setFacets, facets) => {
  if (facets) {
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

const Wrapper = styled.div`
  .facetBreadcrumb {
    cursor: pointer;
  }
  .sub-nav-wrapper {
    background: url("https://ik.imagekit.io/ofb/themes/Mask_Group_5_qByvx6kru.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665383991372") !important;
    /* background-size: cover !important; */
    background-position-x: center !important;
    background-position-y: top !important;
    background-repeat: no-repeat !important;
  }

  

  .sub-nav-menu {
    height: 320px;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin: 0 auto;
    color: #000;
    display: inline-flex;
    width: 100%;
    padding: 0px 0 0px 0;
    position: relative;
    flex-direction: row;
  }

  .sub-nav-title-desc-wrapper {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
  .sub-nav-title-desc-wrapper p{
      width: 50%;
      text-align: left;
      letter-spacing: 0px;
      color: #212B36;
      opacity: 1;
      margin-top: 10px;
  }

  .sub-nav-menu-title {
    margin: 0;
    font-size: 40px;
    text-transform: capitalize;
    letter-spacing: normal;
    padding-left: 0px;
    letter-spacing: 0px;
    color: #212B36;
    opacity: 1;
    font-weight: 500;
    display: flex;
    justify-content: flex-start;
    width: 100%;
    align-items: center;
  }
  .sub-nav-menu-title img{
    width: 100px;
    object-fit: contain;
    margin-left: 20px;
  }

  @media only screen and (max-width: 768px) {
    background: url("https://ik.imagekit.io/ofb/themes/Mask_Group_5_qByvx6kru.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665383991372") !important;

    .sub-nav-title-desc-wrapper p{
      width: 100% !important;
    }
  }

  .facets-wrapper {
    position: fixed;
    bottom: 0px;
    z-index: 9999;
    box-shadow: 0 0 10px #cdcdcd;
    left: 0px;
  }

  .facetBreadcrumb:hover {
    background: rgba(251, 192, 180, 0.2);
    border: 1px solid #dc7863 !important;
  }

  .storeInfo {
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0, 1, 0, 1);
  }
  .storeInfo.show {
    height: auto;
    max-height: 9999px;
    transition: all 0.5s cubic-bezier(1, 0, 1, 0);
  }

  .sortby-product-count-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
  }

  .productsContainer {
    margin: 2px 10px;
    display: flex;
  }

  .filterProducts {
    flex-basis: 20%;
  }

  @media only screen and (max-width: 1023px) {
    .productsList {
      flex-basis: 100%;
    }
  }
  .sub-nav-menu-title-business {
    display: flex;
    margin: 0 auto 15px;
    position: relative;
    width: 100%;
}
.sub-nav-menu-title-business h2 {
  align-items: flex-start;
  background-color: #fff;
  color: #212B36;
  display: flex;
  font-size: 24px;
  font-weight: 600;
  justify-content: center;
  letter-spacing: normal;
  line-height: normal;
  padding-right: 15px;
  position: relative;
  text-transform: capitalize;
  z-index: 1;
}
.sub-nav-menu-title-business h2 span{
    margin-left: 10px;
    text-align: left;
    letter-spacing: 0px;
    color: #212B36;
    opacity: 0.55;
    font-weight: 400;
    font-size: 24px;
}
.sub-nav-menu-title-business:after {
  background-color: #cdcdcd;
  content: "";
  height: 1px;
  left: 0;
  position: absolute;
  top: 17px;
  width: 99%;
}
  @media only screen and (max-width: 900px) {
    .mobileSearch {
      margin-top: 80px;
      padding-top: 25px;
      width: 200px;
      float: left;
      input {
        margin-left: -100px;
      }
    }
  }
  //@media only screen and (max-width: 900px) {
  //  .mobileInfo {
  //    margin-top: -80px;
  //  }
  //}
`;

const Store = ({ storesState, URLCapitalize, storeTitle }) => {
  console.log("storesState", storesState);
  const router = useRouter();

  /*   const hasuraSupplier = useMemo(() => {
    if (hasuraData && hasuraData.suppliers) {
      return hasuraData.suppliers.find(supplier =>
        router.asPath.toLowerCase().includes(supplier.brand.toLowerCase())
      );
    }
  }, [hasuraData]); */
  /* 
  const hasuraSupplierShippingInfo = useMemo(() => {
    if (hasuraSupplier && hasuraSupplier.supplier_vendorId) {
      const vendorId = hasuraSupplier.supplier_vendorId;

      if (vendorId) {
        return hasuraData.supplier_shipping_information.filter(shippingInfo => {
          return shippingInfo.supplier_vendorId === vendorId;
        });
      }
    }
  }, [hasuraSupplier]); */

  const [sortBy, setSortBy] = useState("");
  const [isBrowser, setIsBrowser] = useState(false);
  const [facets, setFacets] = useState([]);

  const [initialStoreData, setInitialStoreData] = useState(storesState);
  const [initialCategoryItems, setInitialCategoryItems] = useState(
    storesState?.[1]?.items
  );
  const [categories, setCategories] = useState(storesState?.[1]?.items);
  const [numOfPages, setNumOfPages] = useState(storesState?.[0]?.numOfPages);
  const [numberOfItems, setNumberOfItems] = useState(null);
  const [queryIsNotChanged, setQueryIsNotChanged] = useState(true);

  console.log("numberOfItems", numberOfItems);
  const [storeData, setStoreData] = useState({});

  const [query, setQuery] = useState([]);

  const [mobileFacetsOpen, setMobileFacetsOpen] = useState(false);

  const [currentScrollPage, setCurrentScrollPage] = useState(1);

  const queryMappedToParams = useMemo(() => {
    return query.length > 0 ? query.map(q => "&" + q.value).join("") : "";
  }, [query]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  // useEffect(() => {
  //
  //   if (storesState?.length > 0) {
  //     setStoreData(
  //       storesState?.items?.find(
  //         item =>
  //           item.title.toLowerCase() ===
  //           router.query.slug.join("").replace("shop", "").toLowerCase()
  //       )
  //     );
  //   }
  // }, [storesState]);

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

  /*   const {
    cidN,
    pages: pagesStatic,
    categoryItems: categoryItemsStatic,
    scrollPage: scrollPageStatic
  } = categoryState; */

  const [showStoreInfo, setShowStoreInfo] = useState(false);

  const renderFacets = () => {
    return (
      <>
        <button
          className="mobile-filter-button"
          onClick={() => setMobileFacetsOpen(true)}
        >
          Filter
          <MdFilterList />
        </button>
        {isMobileState && (
          <Drawer
            open={mobileFacetsOpen}
            onClose={() => setMobileFacetsOpen(false)}
          >
            <Facets
              query={query}
              setQuery={setQuery}
              facets={facets}
              setQueryIsNotChanged={setQueryIsNotChanged}
              queryIsNotChanged={queryIsNotChanged}
              renderTitleAndCloseButton={true}
            />
          </Drawer>
        )}
      </>
    );
  };

  const imageUrl = `https://ik.imagekit.io/ofb/starter/store/20180522154/assets/items/largeimages/${router.query.storeCode}.jpg`;

  return (
    <>
      <ExternalContentFromCMS place="supplier" position="Top" />
      <Wrapper>
      <Wrapper>
      <Fade>
      <div
        className="sub-nav-wrapper"
        style={{
          width: "100%",
          marginBottom: "30px"
        }}
      >
        <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce>
        <div className="bred">
          <div><Link href={"/"}><a>Home</a></Link> / {storeTitle}</div>
        </div>
        </Fade>
        <div className="sub-nav-menu">
          <div className="sub-nav-title-desc-wrapper">
            <div>
            <div className="App">
      
    </div>
              <div>
              <Fade direction="left" delay={1e3} cascade damping={0.2} triggerOnce>
                <h2
                  style={{ backgroundColor: "transparent" }}
                  className="sub-nav-menu-title"
                  
                >{storeTitle} <img
                src={imageUrl}
                alt="store logo"
              /></h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
                </Fade>
              </div>
            </div>
          </div>
        </div>
        {/* <CategoryBreadcrumb /> */}
      </div>
      </Fade>
    </Wrapper>

        
<Container>
        <>
        <div style={{display: "flex"}}> 
        <div class="sub-nav-menu-titleee sub-nav-menu-title-business"><h2> {storeTitle} <span>(<ProductCount productCount={numberOfItems} />)</span></h2></div>
        <div>
        <SortBy productCount={numberOfItems} setSortBy={setSortBy} />
        </div>
        </div>
        
          {storesState && storesState.length > 0 ? (
            <div className="facets-and-category-items-wrapper flex-row block">
              <div className="facets-wrapper w-full">{renderFacets()}</div>

              <div className="flex flex-col w-full ">
                <div className="sortby-product-count-wrapper">
                  
                  <p style={{ marginLeft: "1rem" }}>
                   
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
                <div className="productsList" style={{width: "100%"}}>
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
                    storeCid={"558943"}
                    URLCapitalize={URLCapitalize}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col w-full h-80">
              <h2 className="mt-20">No results are found </h2>
            </div>
          )}
         
        </>
        </Container>
      </Wrapper>
      </>
  );
};
const categoriesToIgnore = [
  "shop/by-style",
  "shop/by-brand",
  "shop/featured-products"
];

export async function getStaticPaths() {
  const useCache = process && process.env.NODE_ENV === "development";
  const allCategories = [];
  const paths = Object.keys(allCategories)
    .filter(url => {
      // filter out categories that we don't want to generate
      return !categoriesToIgnore.includes(url);
    })
    .map(url => {
      return {
        params: {
          slug: url.split("/")
        }
      };
    });
  // console.log("UserData ", paths);
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params, locale }) {
  /*  const hasuraRes = await fetch(HASURA_URL, {
    method: "POST",
    headers: {
      "X-Hasura-Admin-Secret": `${HASURA_SECRET}`,
      "Content-Type": "application/json"
    },
    body: graphqlQuery,
    redirect: "follow"
  }); */

  /*   const hasuraData = await hasuraRes.json(); */

  // const useCache = process && process.env.NODE_ENV === "development";
  // PARAMS { slug: [ 'fundemonium' ] }
  let { slug } = params;
  // SLUG  [ 'fundemonium' ]
  // fundemonium
  const URL = slug.join("/");
  //category returns null
  // //  440950
  // let storeCid = menuData.childs.find(cat => cat.URL.includes("stores")).cid;
  // console.log({ params, storeCid });

  // let category = useCache
  //   ? await getCategoryFromURL(
  //       `/store/${URL}`
  //     ) /* Gets it from the cache file */
  //   : null;

  // let categoryExists = { cid: 0 };
  // if (!category) {
  //   categoryExists = categoryMapping(menuData, URL, "en");
  // }

  // category = category || categoryExists;
  // const categoryData = await fetchCategoryData({
  //   category,
  //   useCache,
  //   store: true,
  //   slug
  // });

  // //  440950
  // let storeCid = menuData.childs.find(cat =>
  //   cat.URL.includes("stores")
  // ).cid;
  // console.log({ params, storeCid });

  const storeTitle = slug?.[0];

  const URLWithoutSpace = URL.split("-");

  //capitalize first letter of each word on URL and replace all spaces with %20 for API call
  const URLCapitalize = URLWithoutSpace.map((word, index) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join("%20");

  console.log("URLCapitalize", URLCapitalize, `'${URLCapitalize}'`);

  /*   let _categoryState, _payload;
  try {
    const { categoryState, payload } = mapCategoryDataToCategoryState({
      category,
      data: categoryData,
      lang: "en"
    });
    _categoryState = categoryState;
    _payload = payload;
  } catch (err) {
    console.error(
      "Error in getStaticProps for category",
      category.URL,
      category.cid,
      err
    );
  } */

  const urlToFetch = categoryUrl({
    id: 558943,
    //query: `&Sellers=${URLCapitalize}`
    query: `&Sellers=Allen%20Solly`
  });

  console.log("urlToFetch", urlToFetch);

  const storesData = await fetch(urlToFetch);
  const storesState = await storesData.json();
  console.log({ storesState });
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      )),
      storesState,
      URLCapitalize,
      storeTitle
    },
    revalidate: 3600 * 24
  };
}

const H3 = styled.h3`
  font-size: 28px;
  line-height: 36px;
`;
const Line = styled.span`
  height: 2px;
  background: #c4c4c4;
  margin: 10px 0px;
`;
export default Store;
