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

  .facets-wrapper {
    position: sticky;
    top: 0;
    z-index: 2;
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
    // margin-top: 35px;
  }

  .productsContainer {
    // margin: 2px 10px;
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

  @media screen and (max-width: 430px)
.mobile-filter-button {
    margin-top: 76% !important;
}

.itemListElement{
  margin-left: -84% !important;
}
`;

const Store = ({ storesState, URLCapitalize }) => {
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

  const imageUrl = `https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${router.query.storeCode}.jpg`;

  return (
    <Container className="container_wrapper" style={{ width: "100%" }}>
      <ExternalContentFromCMS place="supplier" position="Top" />
      <Wrapper className="container_wrapper" style={{ width: "100%" }}>
        {/*{storesState.length > 0 ? storesState[1].items.map((store)=> {*/}
        {storesState.length > 0 && (
          <>
            {/* <div className="storesbanner-image-wrapper100"></div>
          <h1 className="banner_brands">Brands</h1>
          <h6 className="banner_brandsdescription">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore</h6> */}
            {/* <div className="storefront_container">
  <img src="https://ik.imagekit.io/ofb/themes/Mask_Group_2_9Y8GPEN-B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667480971213" alt="Snow" style="width:100%;"/>
  <div className="bottom-leftt">Bottom Left</div>
  <div className="top-leftt">Top Left</div>
  </div> */}
            <ol
              className="flex my-3 text-sm catBreadcrumbs catBreadcrumbsone"
              itemScope
              itemType="https://schema.org/BreadcrumbList"
            >
              <div style={{ display: "flex" }}>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                  style={{color: "#8E9CB7",
                    fontSize: "12px",
                    marginLeft: "11px"}}
                >

          {/* <div><Link href={"/"}><a>Home</a></Link> / {data.description}</div> */}
          <Link href={"/"}><a>Home</a></Link> /<Link href={"/stores/"}>
                    <a itemProp="item" aria-label="item">
                      <span itemProp="name" className="ml-1 capitalize">
                        Stores
                      </span>
                    </a>
                  </Link>
                  <meta itemProp="position" content={1} />
                </li>
                {/* › */}
              </div>
            </ol>

            <div style={{ width: "96rem" }}>
              <img
                style={{ width: "100%" }}
                src="https://ik.imagekit.io/ofb/themes/Mask_Group_2_9Y8GPEN-B.png?ik-sdk-version=javascript-1.4.3&updatedAt=1667480971213"
                alt="main store banner"
              />
            </div>
            <ExternalContentFromCMS place="supplier" position="Middle" />
            <Container>
              <div className="grid grid-cols-2">
                <img
                  src={imageUrl.replace("ofb/dev/", "ofb/dev/tr:h-80,q-80/")}
                  alt="store logo"
                  className="store_logobrand"
                />
                <p className="brand-descriPtion">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                </p>
                {/*     <div className="flex items-center justify-center text-center mobileSearch">
                  <input
                    className="w-full"
                    type="text"
                    placeholder="Search this store.."
                  />
                </div> */}

                {/* //store-info */}
                {/* <div className="flex justify-end items-center mobileInfo">
                  <div className="flex flex-col">
                    <div
                      className="flex items-center "
                      style={{ fontSize: "14px" }}
                    >
                      <MdStar
                        className="mr-2"
                        style={{ fontSize: "18px", color: "#DC7863" }}
                      />{" "}
                      4.6 (200 ratings)
                    </div>
                    <div
                      className="flex items-center justify-end cursor-pointer"
                      style={{ fontSize: "18px", fontWeight: "600" }}
                      onClick={() => setShowStoreInfo(!showStoreInfo)}
                    >
                      Store information
                      {!showStoreInfo ? (
                        <MdKeyboardArrowDown className="ml-2" />
                      ) : (
                        <MdKeyboardArrowUp className="ml-2" />
                      )}
                    </div>
                  </div>
                </div> */}
              </div>

              <div className={!showStoreInfo ? "storeInfo" : "storeInfo show"}>
                <StoreAboutInfo />

                {/* <div>
                {hasuraSupplier && (
                  <ul>
                    <li>{hasuraSupplier.location}</li>
                    <li>{hasuraSupplier.phone_number}</li>
                  </ul>
                )}
              </div>
              <div>{hasuraSupplier && hasuraSupplier.website}</div>
              {hasuraSupplier && hasuraSupplier.description && (
                <div>
                  {hasuraSupplier.description.blocks.map(block => {
                    const CustomTag = `${block.type.includes("header") ? "h2" : "p"
                      }`;
                    const styleKeys = Object.keys(block.data);
                    let style = {};
                    styleKeys.forEach(d => {
                      const key = d
                        .split("-")
                        .map((e, i) => {
                          if (i !== 0) {
                            return e.charAt(0).toUpperCase() + e.slice(1);
                          }
                          return e;
                        })
                        .join("");

                      style[key] = block.data[d];
                    });

                    return (
                      <CustomTag style={{ ...style }}>{block.text}</CustomTag>
                    );
                  })}
                </div>
              )} */}
              </div>
            </Container>
          </>
        )}

        <>
          {/* <ol
            className="flex my-3 text-sm catBreadcrumbs"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <div style={{ display: "flex" }}>
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                <Link href={"/stores/"}>
                  <a itemProp="item" aria-label="item">
                    <span itemProp="name" className="ml-2 capitalize">
                      Stores
                    </span>
                  </a>
                </Link>
                <meta itemProp="position" content={1} />
              </li>
              ›
            </div>
          </ol> */}

          {/* <div className="products-featured"><div className="hr-lines">Shop by Category</div><div className="prev-nexticons"><a href="#" className="previous9 previous8">‹</a><a href="#" className="next9 previous8">›</a></div></div> */}

          {/* <div className="products-featured brandedproducts-popular"><div className="hr-lines horiz-lines">Popular Products</div>
            </div> */}
          {console.log("")}
          {storesState && storesState.length > 0 ? (
            <div className="facets-and-category-items-wrapper flex-row block">
              <div className="facets-wrapper w-full">{renderFacets()}</div>

              {/* <div className="flex flex-col w-full " style={{marginTop: "74px",
    marginLeft: "auto",
    marginRight: "-138px"}}> */}
              <div className="flex flex-col w-full ">
                <div className="sortby-product-count-wrapper">
                 
                 {/* <div style={{display: "flex"}}> */}
                <div className="productTotalCount">
                    <ProductCount productCount={numberOfItems} />
                  </div>
                  <div>
                  <SortBy productCount={numberOfItems} setSortBy={setSortBy} />
                  </div>
                  {/* </div> */}


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
          )}
        </>
      </Wrapper>
    </Container>
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

  const URLWithoutSpace = URL.split("-");

  //capitalize first letter of each word on URL and replace all spaces with %20 for API call
  const URLCapitalize = URLWithoutSpace.map((word, index) => {
    return word[0].toUpperCase() + word.substring(1);
  }).join("%20");

  console.log("URLCapitalize", `'${URLCapitalize}'`);

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
    id: 531764,
    query: `&Sellers=${URLCapitalize}`
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

      URLCapitalize
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
