import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PROJECT_LINK, searchPage } from "../preScripts/links";
import { MdCancel } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import styled from "styled-components";
import ProductCount from "../components/category/ProductCount";
import SkeletonCategoryItems from "../components/category/SkeletonCategoryItems";
import { LINK_DISTRIBUTION, SHOW_PER_PAGE } from "../project-config";
import { shallowEqual, useSelector } from "react-redux";
import ItemCard from "../components/shared-components/ItemCard";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
const Search = () => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("");
  const [query, setQuery] = useState([]);
  const [facets, setFacets] = useState([]);

  const [categories, setCategories] = useState([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [moreFacets, setMoreFacets] = useState(false);
  const [firstLoad, setFirstLoad] = useState(false);
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const compareListReducer = useSelector(
    state => state.compareListReducer,
    shallowEqual
  );

  const fetchData = async ({
    keyword,
    query = "",
    sortBy = "",
    mpvp = 1,
    more = false
  }) => {
    try {
      const res = await fetch(
        searchPage({
          keyword,
          query,
          sortBy,
          mpvp: mpvp
        })
      );
      const json = await res.json();
      setFirstLoad(true);

      if (typeof json !== "undefined" && json.length > 0) {
        more
          ? setCategories([...categories, ...json[1].items])
          : setCategories(json[1].items);
        setItemsCount(json[4].itemsCount);
        setFacetsAPI(setFacets, json);
      }
    } catch (err) {
      setFirstLoad(true);

      setCategories([]);
      setItemsCount(0);
      setFacetsAPI(setFacets, []);
      console.error("error search", err);
    }
  };

  useEffect(() => {
    setFirstLoad(false);

    if (typeof router.query.keyword !== "undefined")
      fetchData({ keyword: router.query.keyword });
    return () => {
      setItemsCount(0);
      setCategories([]);
      setFacets([]);
      setFirstLoad(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.keyword]);

  /*   useEffect(() => {
    if (typeof router.query.keyword !== "undefined")
      fetchData({
        keyword: router.query.keyword,
        query:
          query.length > 0
            ? query
                .map(q => "&" + q.name.toLowerCase() + "=" + q.value)
                .join("")
            : "",
        sortBy
      });
    return () => {
      setItemsCount(0);
      setCategories([]);
      setFacets([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, sortBy]); */

  const setFacetsAPI = (setFacets, data) => {
    if (data.length > 0)
      setFacets([
        {
          title: Object.keys(data[2].facets[0])[0],
          name: Object.keys(data[2].facets[0])[0],
          facetValues: Object.values(data[2].facets[0])
            .flat(1)
            .map(value => {
              return {
                ...value,
                name: Object.keys(data[2].facets[0])[0],
                text: value.removeText.split(": ")[1]
              };
            }),
          positiveCount:
            Object.values(data[2].facets[0])
              .flat(1)
              .reduce(function (total, item) {
                total += item.count;
                return total;
              }, 0) > 0
              ? true
              : false,
          show: false
        },
        {
          title: Object.keys(data[2].facets[1])[0],
          name: Object.keys(data[2].facets[1])[0],
          facetValues: Object.values(data[2].facets[1])
            .flat(1)
            .map(value => {
              return {
                ...value,
                name: Object.keys(data[2].facets[1])[0],
                text: value.removeText?.split(": ")[1]
              };
            }),
          positiveCount:
            Object.values(data[2].facets[1])
              .flat(1)
              .reduce(function (total, item) {
                total += item.count;
                return total;
              }, 0) > 0
              ? true
              : false,
          show: false
        }
        // ...Object.values(data[2].facets[2])
        // .flat(1)
        // .map(v => {
        //   return { ...v, show: false };
        // })
      ]);
  };

  return (
    <>
      <Head>
        <title>Search Results - {router.query.keyword}</title>
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
      <div
        style={{ maxWidth: "1600px" }}
        className="flex flex-col w-11/12 py-6 mx-auto mt-6"
      >
        <div className="flex justify-between my-6 ">
          <Title>
            SEARCH RESULTS FOR
            <span className="mx-2" style={{ color: "#000", fontWeight: "600" }}>
              {router.query.keyword}
            </span>
          </Title>
        </div>

        {categories.length > 0 ? (
          <>
            <div className="flex justify-between w-full my-6 items-center ">
              <div className="">
                {/*<Select*/}
                {/*  className="form-control sort-decoration"*/}
                {/*  name="sortBy"*/}
                {/*  onChange={e => setSortBy(e.target.value)}*/}
                {/*>*/}
                {/*  <option value="">Sort By</option>*/}
                {/*  <option value="&amp;sortci=stitle%20asc">A --&gt; Z</option>*/}
                {/*  <option value="&amp;sortci=newest%20desc">New Items</option>*/}
                {/*  <option value="&amp;sortci=price%20asc">Low to High</option>*/}
                {/*  <option value="&amp;sortci=price%20desc">High to Low</option>*/}
                {/*  <option value="&amp;sortci=topsellers%20asc">*/}
                {/*    Most Popular*/}
                {/*  </option>*/}
                {/*  <option value="&amp;sortci=orderscount%20desc">*/}
                {/*    Best Sellers*/}
                {/*  </option>*/}
                {/*  <option value="&amp;sortci=averagereview%20desc">*/}
                {/*    Rating*/}
                {/*  </option>*/}
                {/*</Select>*/}
              </div>
              <p style={{ marginLeft: "10px" }}>
                <ProductCount productCount={itemsCount} />
              </p>
            </div>
            {query.length > 0 && (
              <div className="flex flex-wrap  my-6">
                {query.length > 0 &&
                  query.map(q => (
                    <div
                      key={q.name}
                      className="flex items-center justify-between px-2 py-1 mr-2 text-xs bg-gray-400 rounded-full cursor-pointer"
                      style={{ color: "#333", background: "#f0f0f0" }}
                      onClick={() => {
                        setQuery(query.filter(qq => qq.value !== q.value));
                      }}
                    >
                      {q.removeText}
                      <span className="ml-2 text-xl" style={{ color: "#333" }}>
                        <MdCancel />
                      </span>
                    </div>
                  ))}
                {query.length > 0 && (
                  <div
                    onClick={() => {
                      setQuery([]);
                    }}
                    className="flex items-center justify-between px-2 py-1 mr-2 text-xs bg-gray-400 rounded-full cursor-pointer"
                    style={{ background: "#333", color: "#f0f0f0" }}
                  >
                    Clear All
                    <span className="ml-2 text-xl" style={{ color: "#f0f0f0" }}>
                      <MdCancel />
                    </span>
                  </div>
                )}
              </div>
            )}
            <Wrapper className="">
              <InfiniteScroll
                className=""
                dataLength={categories.length}
                hasMore={+categories.length < +itemsCount}
                next={() => {
                  typeof router.query.keyword !== "undefined" &&
                    fetchData({
                      more: true,
                      keyword: router.query.keyword,
                      query:
                        query.length > 0
                          ? query
                              .map(
                                q => "&" + q.name.toLowerCase() + "=" + q.value
                              )
                              .join("")
                          : "",
                      sortBy,
                      mpvp:
                        categories.length > 0
                          ? parseFloat(
                              Math.ceil(
                                categories.length / process.env.PER_PAGE + 1
                              )
                            )
                          : 1
                    });
                }}
                loader={
                  <>
                    <div className="flex items-center justify-center w-full px-3 mb-2 loader">
                      <span className="text-lg font-bold">Loading...</span>
                    </div>
                    <div className="w-full loader">
                      <SkeletonCategoryItems numberOfItems={SHOW_PER_PAGE} />
                    </div>
                  </>
                }
              >
                {categories.map(item => {
                  return <ItemCard key={item.id} item={item} />;
                })}
                {/* {categories.length < itemsCount && (
                  <div className="showMoreWrapper">
                    <button
                      className="showMoreBtn"
                      onClick={() => {
                        setLoadMoreScrollPage(true);
                      }}
                    >
                      Show More Products
                    </button>
                  </div>
                )} */}
              </InfiniteScroll>
            </Wrapper>
          </>
        ) : (
          firstLoad && (
            <div className="flex items-center justify-center my-7">
              <p className="text-xl text-center ">
                0 results found for
                <span className="mx-2 text-main-primary">
                  {router.query.keyword}.
                </span>
                Please refine your search and try again
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      ))
    }
  };
};

const Title = styled.h1`
  margin: 0;
  line-height: initial;
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: normal;
  padding-left: 0px;
`;

const Wrapper = styled.section`
  margin-top: 30px;
  width: 100%;
  .item {
    border-bottom: 1px solid rgb(221, 221, 221);
    padding-bottom: 20px;
  }
  img {
    width: 100%;
  }
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
    }
  }
  .infinite-scroll-component {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    width: 100%;
    margin-top: 30px;
    padding: 0 3px;
  }
  .itemFamily {
    color: #333;
  }
  .itemBrand {
    font-size: 12px;
    margin-bottom: 0.6rem;
    margin-top: 0.6rem;
    font-style: italic;
    color: rgb(102, 102, 102);
  }
  .itemTitle {
    display: block;
    font-size: 12px;
    color: rgb(102, 102, 102);
  }
  .itemPrice {
    font-size: 16px !important;
    text-align: left !important;
    font-weight: 400 !important;
    float: left !important;
    margin-top: 10px;
    width: 100% !important;
    justify-content: center;
    
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;
    color: #a20202;
  }
  .showMoreWrapper {
    grid-column: 1 / -1;
    display: flex;
    justify-content: center;
  }
  .showMoreBtn {
    background: #333;
    padding: 12px 40px;
    color: white;
    width: 400px;
    max-width: 100%;
  }
  .loader {
    grid-column: 1 / -1;
  }

  @media only screen and (max-width: 1440px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (max-width: 1280px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 768px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(2, 1fr);
      .item {
        width: 100%;
      }
    }
    .showMoreBtn {
      width: 100%;
    }
  }

  @media only screen and (max-width: 520px) {
    .itemFamily {
      font-size: 14px !important;
    }
    .itemTitle {
      font-size: 10px !important;
    }
  }

  @media only screen and (max-width: 375px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Search;
