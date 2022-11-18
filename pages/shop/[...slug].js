import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";
import SortBy from "../../components/category/SortBy";
import ProductCount from "../../components/category/ProductCount";
import Link from "next/link";
import { useRouter, withRouter } from "next/router";
import menuData from "../../preBuildData/menu/menu.json";
import Head from "next/head";
import ExternalContentFromCMS from "../../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {Fade, Slide} from "react-awesome-reveal";
// import { htmlDecode } from "../../utils/htmlDecoder";
import {htmlDecode} from "./../../utils/htmlDecoder";
// import CategoryHeader from "../../components/category/CategoryHeader";


import {
  fetchingCategoryRequest,
  fetchingCategorySuccess,
  fetchingCategorySuccessAction,
  mapCategoryDataToCategoryState,
  savePayloadToResetCategoryAction
} from "../../redux/actions/categoryActions";
import formatMenuIntoSingleObject, {
  getCategoryFromURL
} from "../../lib/formatMenuIntoSingleObject";
import fetchCategoryData from "../../lib/fetchCategoryData";
import Container from "../../components/shared-components/Container";
import CategoryHeader from "../../components/category/CategoryHeader";
import Facets from "../../components/Facets/Facets";
import { i18n } from "../../next-i18next.config";

import CategoryItems from "../../components/category/CategoryItems";
import categoryMapping from "../../utils/categoryMapping";
import { LINK_DISTRIBUTION } from "../../project-config";
import { MdOutlineClose, MdFilterList } from "react-icons/md";
import {
  CATEGORY_PAGING_FETCH_LINK,
  SEARCH_PAGING_FETCH_LINK
} from "../../redux/links";
import { capitalize } from "../../utils/capitalize";

import Drawer from "../../components/elements/Drawer/Drawer";
import { setHTMLElementFixedPosition } from "../../utils/functions";
import fetchAllProductsOfTheCategory from "../../lib/fetchAllProductsOfTheCategory";

const Wrapper = styled.div`
  .facetBreadcrumb {
    cursor: pointer;
  }

  .facets-and-category-items-wrapper {
    display: block;
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

  ol > li:last-child > a {
    color: var(--primary);
    font-weight: bold;
  }

  ol {
    list-style-type: none;
    font-size: 12px;
    padding-left: 0;
    display: flex;
  }

  .sortby-product-count-wrapper {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin-bottom: 10px;
    justify-content: end;
  }

  .productsContainer {
    
    display: flex;
  }

  .up {
    animation: slideup 0.5s 0s;
  }

  .down {
    animation: slidedown 0.5s 0s;
  }

  .scrollComp {
    background-color: #222222;
    border-radius: 50%;
    height: 45px;
    width: 45px;
    color: white;
    position: fixed;
    right: 5vw;
    bottom: 100px;
    box-sizing: border-box;
    border: 1px solid #efefef;
    padding-top: 14px;
    font-weight: bold;
    visibility: visible;
    cursor: pointer;
    box-shadow: 0 4px 8px #2626261a;
    animation-direction: alternate;
    animation-fill-mode: forwards; //added
    &::before {
      content: "\u005E";
      font-size: 32px;
      position: absolute;
      top: 4px;
      right: 12px;
      color: white;
      font-weight: normal;
      transform: scaleX(1.5);
    }

    @keyframes slideup {
      from {
        bottom: -60px;
        // visibility: hidden;
      }
      to {
        bottom: 100px;
        // visibility: visibile;
      }
    }

    @keyframes slidedown {
      from {
        bottom: 100px;
        // visibility: visible;
      }
      to {
        bottom: -60px;
        // visibility: hidden;
      }
    }

    @media screen and (max-width: 768px) {
      @keyframes slideup {
        from {
          bottom: -60px;
          // visibility: hidden;
        }
        to {
          bottom: 50px;
          // visibility: visibile;
        }
      }

      @keyframes slidedown {
        from {
          bottom: 50px;
          // visibility: visible;
        }
        to {
          bottom: -60px;
          // visibility: hidden;
        }
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    .productsList {
      flex-basis: 100%;
    }
  }

  @media (max-width: 430px) {
  //   .mobile-filter-button {
  //     display: none;
  //     line-height: initial;
  //     align-items: center;
  //     font-size: 1rem;
  //     background-color: #fff;
  //     /* color: #fff; */
  //     padding: 7px !important;
  //     margin-bottom: 10px !important;
  //     color: #000 !important;
  //     border: 1px solid #000 !important;
  //     border-radius: 4px !important;
  //     padding: 3px 8px !important;
  //     font-size: 15px !important;
  //     /* margin-right: 23px; */
  //     margin-top: 7px !important;
  //     margin-left: -8px !important;
  // }
  }
`;

export const setFacetsAPI = (setFacets, facets) => {
  console.log("tempFacets", facets);

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

export const fetchMyAPI = async ({
  id,
  mpvp,
  query,
  sortBy,
  keyword,
  type
}) => {
  let response;
  if (type === "shop") {
    try {
      let res = await fetch(
        CATEGORY_PAGING_FETCH_LINK({
          cid: id,
          page: mpvp,
          queryString: query,
          sortBy
        })
      );
      response = await res.json();
    } catch (error) {
      console.error("error fetching shop", error);
      response = { error };
    }
  } else if (type === "store") {
    query = `&Sellers=${capitalize(keyword)}${query}`;
    try {
      let res = await fetch(
        CATEGORY_PAGING_FETCH_LINK({
          cid: id,
          page: mpvp,
          queryString: query,
          sortBy
        })
      );
      response = await res.json();
    } catch (error) {
      console.error("error fetching store filter", error);
      response = { error };
    }
  } else if (type === "search") {
    try {
      let res = await fetch(
        SEARCH_PAGING_FETCH_LINK({
          keyword,
          page: mpvp
        })
      );
      response = await res.json();
    } catch (error) {
      console.error("error fetching search", error);
      response = { error };
    }
  } else {
    response = { error: "type not found" };
  }

  return response;
};

const Category = ({
  category,
  categoryState,
  categoryRawPayload,
  alternativeLayout,
  allProductsOfTheCategory,
  ...props
}) => {
  console.log(
    "categoryState",
    category
    /* categoryState,
    allProductsOfTheCategory */
  );

  const router = useRouter();

  const [mobileFacetsOpen, setMobileFacetsOpen] = useState(false);

  const [isScrollActive, setIsScrollActive] = useState(false);

  console.log("isScrollActive", isScrollActive);
  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const [facets, setFacets] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [query, setQuery] = useState([]);
  const dispatch = useDispatch();

  const compareListReducer = useSelector(
    state => state.compareListReducer,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  console.log("isMobileState", isMobileState);

  const lastUrlState = useSelector(
    state => state.mainReducer.lastPathCat,
    shallowEqual
  );

  const productCountState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const [isBrowser, setIsBrowser] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [queryIsNotChanged, setQueryIsNotChanged] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          "allProductsOfTheCategory",
          JSON.stringify(allProductsOfTheCategory)
        );
      } catch (error) {
        console.error(
          "Error writing allProductsOfTheCategory to localStorage",
          error
        );
      }
    }
  }, [category.cid]);

  useEffect(() => {
    const ref = window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setIsScrollActive(true);
      } else {
        setIsScrollActive(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", ref);
    };
  }, []);

  useEffect(() => {
    if (
      props.router?.query?.facetParameter &&
      props.router?.query?.removeText
    ) {
      const removeText = props.router.query.removeText;
      const value = props.router.query.facetParameter;
      setQuery([{ value, removeText }]);
      setCollectionsOpen(true);
    } else {
      setCollectionsOpen(false);
    }

    return () => {
      setQuery([]);
      setQueryIsNotChanged(true);
    };
  }, [props.router]);

  useEffect(() => {
    setHTMLElementFixedPosition(mobileFacetsOpen);
  }, [mobileFacetsOpen]);

  useEffect(() => {
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, []);

  const {
    cidN,
    pages: pagesStatic,
    categoryItems: categoryItemsStatic,
    scrollPage: scrollPageStatic
  } = categoryState;

  const queryMappedToParams = useMemo(() => {
    return query.length > 0 ? query.map(q => "&" + q.value).join("") : "";
  }, [query]);

  const facetsStatic = categoryState.tempFacets;
  const buttonsStatic = categoryRawPayload.priceButtonsTemp;

  // console.log({
  //   category,
  //   categoryState,
  //   categoryRawPayload,
  //   alternativeLayout
  // });

  const scrollPageState = useSelector(
    state => state.categoryReducer.scrollPage,
    shallowEqual
  );

  const scrollPage = isBrowser ? scrollPageState : scrollPageStatic;

  const pagesState = useSelector(
    state => state.categoryReducer.pages,
    shallowEqual
  );

  const lastPage = isBrowser
    ? pagesState[pagesState.length - 1]
    : pagesStatic[pagesStatic.length - 1];

  const categoryItemsState = useSelector(
    state => state.categoryReducer.categoryItems,
    shallowEqual
  );

  const categoryItems = isBrowser ? categoryItemsState : categoryItemsStatic;

  useEffect(() => {
    // Won't run on the server as expected
    if (category && categoryState && categoryRawPayload) {
      dispatch(fetchingCategoryRequest(category));
      dispatch(fetchingCategorySuccess(categoryRawPayload));
      dispatch(savePayloadToResetCategoryAction(categoryRawPayload));
    }
  }, [dispatch, category, categoryState, categoryRawPayload]);

  useEffect(async () => {
    if (categoryState.tempFacets.length > 0)
      setFacetsAPI(setFacets, categoryState?.tempFacets);

    return () => {
      setFacets([]);
    };
  }, [categoryState]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
              collectionsOpen={collectionsOpen}
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

  console.log("SORT BY FROM PRODUCT page, ", sortBy);

  return (
    <Wrapper>
      <Head>
        <title>
          {category.name.replace("&amp;", "&").replace("&Eacute;", "É")}
        </title>
        <meta
          name="description"
          content={category.description || category.metadescription}
        />{" "}
        <meta
          name="keywords"
          content={category.description || category.metakeywords}
        />{" "}
        <meta
          name="metakeywords"
          content={category.description || category.metakeywords}
        />
        <meta property="og:title" content={category.name} />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta
          property="og:description"
          content={category.description || category.metadescription}
        />{" "}
        <meta property="twitter:title" content={category.name} />
        <meta
          property="twitter:description"
          content={category.description || category.metadescription}
        />
        <meta property="og:url" content={LINK_DISTRIBUTION + category.url} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ExternalContentFromCMS
        place="home"
        position="Top"
      />
      
        <ol
          className="flex my-0 text-sm catBreadcrumbs"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {lastUrlState?.slice(2).map((item, i) => {
            return (
              <>
                <li
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <Link
                    href={`
                    ${
                      lastUrlState
                        .join("/")
                        .replace("/product/", "/shop/")
                        .split(item)[0] + item
                    }
                      `}
                  >
                    <a itemProp="item" aria-label="item">
                      <span itemProp="name" className="capitalize">
                        {/*{router.asPath.split("/").length -1 === i ? family.propvalue : item.replace(/-/g, " ")}*/}
                        {item.replace("shop", "home").replace(/-/g, " ")}
                      </span>
                    </a>
                  </Link>
                  <meta itemProp="position" content={i + 1} />
                </li>
                {i === lastUrlState?.slice(2).length - 1 ? null : (
                  <span className="ml-1">› </span>
                )}
              </>
            );
          })}
        </ol>

        <ExternalContentFromCMS
          place="home"
          position="Middle"
          renderedBy="HomeBanner"
        />
        <ExternalContentFromCMS
          place="home"
          position="Bottom"
          renderedBy="HomeBanner"
        />
        <Container>
        <div className="facets-and-category-items-wrapper flex-row block">
          <div className="facets-wrapper w-full">{renderFacets()}</div>
          <div className="flex flex-col w-full">
            <div className="sortby-product-count-wrapper">

            {/* <div style={{marginRight: "auto",
    marginLeft: "24%"}}>
              
              <h2
                style={{ backgroundColor: "transparent" }}
                className="sub-nav-menu-title"
                dangerouslySetInnerHTML={{
                  __html: htmlDecode(data.description)
                }}
              />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
            </div> */}
            {/* <CategoryHeader/> */}
        {/* <CategoryHeader data={data} /> */}
            <div className="sortbydiv">
            {/* <div className="facets-wrapper w-full">{renderFacets()}</div> */}
            <CategoryHeader data={category} />
            <SortBy
                productCount={categoryState.numberOfItems}
                setSortBy={setSortBy}
              />
            </div>

              
              {/* <p style={{ marginLeft: "1rem" }}>
                <ProductCount productCount={categoryState.numberOfItems} />
              </p> */}
            </div>
            <div className="flex flex-wrap w-full">
              {query.map(q => (
                <div
                  onKeyDown={e => {
                    if (e.code === "Enter") e.target.click();
                  }}
                  tabIndex={"0"}
                  key={q.value}
                  className="focusAble facetBreadcrumb relative flex items-center justify-between py-2 pl-2 pr-1 mb-2 mr-2 rounded-sm"
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
            {productCountState === 0 && (
              <div
                style={{
                  textAlign: "center",
                  fontSize: "2rem",
                  marginTop: "4rem"
                }}
                className="flex flex-wrap w-full items-center justify-center"
              >
                <p>There are no products to display.</p>
              </div>
            )}
          </div>

          {/* <h2 className="text-lg lg:text-2xl productSortedAvailability">Availability</h2>
        <div className="form-check col-md-12">
                <input type="checkbox" className="form-check-input rangeCheck" id="range1" data-range="4999" readonly="true"/>
                <label className="form-check-label" htmlFor="range1">In Stock</label>
            </div>

            <div className="form-check col-md-12">
                <input type="checkbox" className="form-check-input rangeCheck" id="range1" data-range="4999" readonly="true"/>
                <label className="form-check-label" htmlFor="range1">Express Shipping</label>
            </div> */}

          <div className="productsContainer">
            {isMobileState === false && (
              <div className="filterProducts">
                <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce>
                <Facets
                  query={query}
                  setQuery={setQuery}
                  facets={facets}
                  setQueryIsNotChanged={setQueryIsNotChanged}
                  queryIsNotChanged={queryIsNotChanged}
                />
                </Fade>
              </div>
              
            )}
            <Fade direction="right" delay={1e3} cascade damping={0.1} triggerOnce>
            <div className="productsList">
              <CategoryItems
                dispatch={dispatch}
                categoryItems={categoryItems}
                cidN={cidN}
                scrollPage={scrollPage}
                lastPage={lastPage}
                query={query}
                sortBy={sortBy}
                setFacets={setFacets}
                queryMappedToParams={queryMappedToParams}
                queryIsNotChanged={queryIsNotChanged}
              />
              
              {/* <button
                className={`scrollComp ${isScrollActive ? "up" : "down"}`}
                aria-label="scroll button"
                onClick={() => handleScroll()}
              /> */}
            </div>
            </Fade>
          </div>
        </div>
        {/*{compareListReducer.fetchingComparedItemDetails && <Compare />}*/}
        {/*<div className="flex items-center justify-between mt-3 bg-white p-3">*/}

        {/*</div>*/}
        {/*<div className="flex flex-col mr-8 w-96">*/}
        {/*  <div className="flex flex-col w-full">*/}
        {/*    <h1>test</h1>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {/*<FacetBreadcrumb />*/}
      </Container>
    </Wrapper>
  );
};

const categoriesToIgnore = [
  "shop/by-style",
  "shop/by-brand",
  "shop/featured-products"
];

export async function getStaticPaths({ locales }) {
  const useCache = process && process.env.NODE_ENV === "development";

  const allCategories = await formatMenuIntoSingleObject(
    menuData,
    useCache,
    true
  );

  const paths = Object.keys(allCategories)
    .filter(url => {
      // filter out categories that we don't want to generate
      return !categoriesToIgnore.includes(url);
    })
    .map(url => {
      return {
        params: {
          slug: url.replace("shop/", "").split("/")
        }
      };
    });
  return { paths, fallback: "blocking" };
}

export const getStaticProps = async ({ params, locale }) => {
  const useCache = process && process.env.NODE_ENV === "development";

  let { slug } = params;
  if (!slug.includes("shop")) {
    slug.unshift("shop");
  }

  const URL = slug.join("/");

  if (URL === "shop/stores") {
    return {
      notFound: true
    };
  }

  if (categoriesToIgnore.includes(URL)) {
    return {
      notFound: true
    };
  }

  let category = useCache
    ? await getCategoryFromURL(URL) /* Gets it from the cache file */
    : null;

  let categoryExists = { cid: 0 };
  if (!category) {
    categoryExists = categoryMapping(menuData, URL, "en");
  }

  if (!category && !categoryExists.cid) {
    console.error("category not found", URL);
    return {
      notFound: true
    };
  }

  category = category || categoryExists;

  let categoryData = null;
  let allProductsOfTheCategory = [];

  try {
    categoryData = await fetchCategoryData(category, useCache, locale);
    allProductsOfTheCategory = await fetchAllProductsOfTheCategory(
      category,
      useCache,
      locale
    );
  } catch (err) {
    console.error("error getting category data", err);
  }

  if (categoryData && categoryData.length > 0) {
    let _categoryState, _payload;
    try {
      const { categoryState, payload } = mapCategoryDataToCategoryState({
        category,
        data: categoryData,
        lang: locale
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
    }

    if (!_categoryState && !_payload) {
      return {
        notFound: true
      };
    }

    let alternativeLayout = false;
    if (category.URL.toLowerCase().includes("shop/by-brand")) {
      alternativeLayout = "by-brand";
    } else if (category.URL.toLowerCase().includes("shop/by-style")) {
      alternativeLayout = "by-style";
    }

    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        category,
        categoryState: _categoryState,
        categoryRawPayload: _payload,
        alternativeLayout,
        allProductsOfTheCategory
      },
      revalidate: 3600 * 24
    };
  } else {
    return {
      notFound: true
    };
  }
};

export default withRouter(Category);
