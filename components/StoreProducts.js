import React, { useState, useEffect } from "react";
import { PROJECT_LINK, SHOP_CID, SHOW_PER_PAGE } from "../project-config";
import { useSelector, shallowEqual } from "react-redux";
import styled from "styled-components";

import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonCategoryItems from "../components/category/SkeletonCategoryItems";
import ItemCard from "./shared-components/ItemCard";
import { fetchMyAPI, setFacetsAPI } from "../pages/shop/[...slug]";
import { useRouter } from "next/router";
import { categoryUrl } from "../preScripts/links";

export default function StoreProducts({
  initialStoreData,
  items,
  setCategories,
  currentScrollPage,
  setCurrentScrollPage,
  setNumberOfItems,
  setNumOfPages,
  setFacets,
  numOfPages,
  storeCid,
  urlFrom,
  storeId,
  query,
  queryMappedToParams,
  URLCapitalize,
  sortBy
}) {
  const [loadMoreScrollPage, setLoadMoreScrollPage] = useState(true);
  /*   const [clickedLoadScrollPageButtonOnce, setClickedLoadScrollPageButtonOnce] =
    useState(false); */

  const itemsAreBeingFetchedState = useSelector(
    state => state.facetReducer.itemsAreBeingFetched,
    shallowEqual
  );
  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );
  const router = useRouter();

  useEffect(() => {
    if (loadMoreScrollPage !== true) {
      setLoadMoreScrollPage(true);
      setClickedLoadScrollPageButtonOnce(false);
    }
  }, [URLCapitalize]);

  /*   useEffect(async () => {
    if (
      typeof categoryState !== "undefined" &&
      categoryState.tempFacets.length > 0
    ) {
      // setCategories(data[1].items);
      setFacetsAPI(setFacets, categoryState);
      setNumOfPages(categoryState.pages.length);
    }

    return () => {
      setCategories([]);
      setFacets([]);
      setNumOfPages(0);
    };
  }, [categoryState, router]); */

  const fetchNextPage = async () => {
    const nextScrollPage = currentScrollPage + 1;

    if (currentScrollPage < numOfPages) {
      try {
        const categoryData = await fetch(
          categoryUrl({
            id: storeCid,
            query: `&Sellers=${URLCapitalize}${
              query.length > 0 ? query.map(q => "&" + q.value).join("") : ""
            }`,
            mpvp: nextScrollPage
          })
        );

        const data = await categoryData.json();
        if (data?.[1]?.items) {
          setCurrentScrollPage(nextScrollPage);
          setCategories([...items, ...data[1].items]);
        }
      } catch (err) {
        console.error("Error fetching stores scroll pagination", err);
      }
    }
  };

  const handleLoadNextScrollPage = async () => {
    if (currentScrollPage >= 3) {
      setLoadMoreScrollPage(false);
      return;
    }

    fetchNextPage();
  };

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  console.log("fetchQuery4", router.query.slug);

  const fetchQueryData = async (query, sortBy) => {
    const json = await fetchMyAPI({
      id: storeCid,
      query: queryMappedToParams,
      sortBy,
      keyword: router.query.slug[0],
      type: "store"
    });
    console.log("json22", json);
    if (json.error) {
      console.error("Error setting category items", json.error);
      return;
    } else if (Array.isArray(json) && json.length === 0) {
      setCategories(json);
      setNumberOfItems(0);
      setNumOfPages(1);
      setCurrentScrollPage(1);
      setFacetsAPI(setFacets, []);
    } else {
      console.log("data22", json);
      setNumOfPages(json?.[0]?.numOfPages);
      setNumberOfItems(json?.[4]?.itemsCount);
      setCurrentScrollPage(1);
      setCategories([...json?.[1]?.items]);
      setFacetsAPI(setFacets, json?.[2]?.facets);
    }
  };

  useEffect(() => {
    if (query?.length > 0 || sortBy !== "") {
      fetchQueryData(query, sortBy);
    }

    if (query.length === 0) {
      setCategories(initialStoreData?.[1]?.items);
      setCurrentScrollPage(1);
      setNumOfPages(initialStoreData?.[0]?.numOfPages);
      setNumberOfItems(initialStoreData?.[4]?.itemsCount);
    }
  }, [query, sortBy]);

  if (itemsAreBeingFetchedState) {
    return (
      <>
        <span>Loading...</span>
        <SkeletonCategoryItems numberOfItems={SHOW_PER_PAGE} />
      </>
    );
  }

  return (
    <>
      {/* <span>Displaying: {categoryItems.length} products</span> */}
      <Wrapper>
        <InfiniteScroll
          className="catItems"
          dataLength={items.length}
          next={handleLoadNextScrollPage}
          hasMore={currentScrollPage < numOfPages && loadMoreScrollPage}
          loader={
            <>
              <div className="loader flex items-center justify-center w-full px-3 mb-2">
                <span className="text-lg font-bold">Loading...</span>
              </div>
              <div className="loader w-full">
                <SkeletonCategoryItems numberOfItems={SHOW_PER_PAGE} />
              </div>
            </>
          }
        >
          {items.map((item, i) => (
            <ItemCard
              key={item.id}
              item={item}
              urlFrom={urlFrom}
              storeId={storeId}
            />
          ))}

          {/*{categoryItems.map(item => {*/}
          {/*  return (*/}
          {/*      <ItemCard key={item.id} item={item} urlFrom={urlFrom} storeId={storeId}/>*/}
          {/*  );*/}
          {/*})}*/}
          {loadMoreScrollPage === false && (
            <div className="showMoreWrapper">
              <button
                className="showMoreBtn"
                onClick={() => {
                  fetchNextPage();
                  setLoadMoreScrollPage(true);
                }}
              >
                Show More
              </button>
            </div>
          )}
        </InfiniteScroll>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  cursor: pointer;
  .catItems {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 30px;
    padding: 3px !important;
    width: 62rem;
  }
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

  .itemFamily {
    font-size: 15px !important;
    color: #37455E;
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
    margin-top: 0px;
    width: 100% !important;
    justify-content: center;
    // margin-bottom: 0px;
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
    // background: #333;
    // padding: 12px 40px;
    // color: white;
    // width: 400px;
    // max-width: 100%;
    background: #F3F3F3;
    padding: 12px 40px;
    color: #37455E;
    width: 295px;
    max-width: 100%;
  }
  .showMoreBtn:hover{
    background: #FDDA06;
  }

  .loader {
    grid-column: 1 / -1;
  }

  @media only screen and (max-width: 1280px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 768px) {
    .itemFamily {
      font-size: 26px;
    }

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

  @media only screen and (max-width: 375px) {
    .infinite-scroll-component {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;
