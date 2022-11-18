import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import ItemCard from "../../components/shared-components/ItemCard";
import styled from "styled-components";
import {
  MdOutlineKeyboardArrowUp,
  MdOutlineKeyboardArrowDown
} from "react-icons/md";

const Wrapper = styled.div`
  .recently-viewed-items-container {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .recently-viewed-title {
    font-size: 2em;
    display: flex;
    cursor: pointer;
    margin: 0 15px;
    padding: 10px 10px;
    align-items: center;
    justify-content: space-between;
    background-color: #eee;
  }

  .recently-viewed-title:hover {
    background-color: #dbdbdb;
  }

  .recently-viewed-title {
    font-size: 20px;
  }

  .recently-viewed-items-wrapper:not(.active) {
    max-height: 0px !important;
    display: flex;
    min-width: 100%;
    overflow: auto;
    transition: max-height 0.5s ease-out;
    margin: 0 10px;
  }

  .recently-viewed-items-wrapper.active {
    max-height: 1000px;
    display: flex;
    min-width: 100%;
    overflow: auto;
    transition: max-height 0.5s ease-out;
    padding: 10px;
  }

  .recently-viewed-items-wrapper .owl-item {
    min-width: 250px;
    max-width: 300px;
  }
`;

const RecentlyViewedItems = () => {
  const RECENT_VIEW_ITEMS_LOCALSTORE_KEY = `recentViewItems`;
  const dispatch = useDispatch();

  const recentViewItemsState = useSelector(
    state => state.recentlyViewedItemsReducer.recentlyViewedItemsList,
    shallowEqual
  );

  const [recentViewItemsFiltered, setRecentViewItemsFiltered] = useState([]);
  const [recentlyViewedCollapsed, setRecentlyViewedCollapsed] = useState(true);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      let storedRecentItemsString = localStorage.getItem(
        RECENT_VIEW_ITEMS_LOCALSTORE_KEY
      );
      let storedRecentItemsObject = JSON.parse(storedRecentItemsString);
    }
  });

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      console.info("--faf", recentViewItemsState);
      localStorage.setItem(
        RECENT_VIEW_ITEMS_LOCALSTORE_KEY,
        JSON.stringify(recentViewItemsState)
      );
      setRecentViewItemsFiltered([
        ...recentViewItemsState.reverse().filter((v, i) => i != 0)
      ]);
    }
  }, [recentViewItemsState]);

  return (
    <div>
      {recentViewItemsState.length > 1 ? (
        <React.Fragment>
          <h1
            className="no-select recently-viewed-title"
            onClick={() => setRecentlyViewedCollapsed(!recentlyViewedCollapsed)}
          >
            Recently Viewed Items
            <i className="material-icons">
              {recentlyViewedCollapsed ? (
                <MdOutlineKeyboardArrowDown />
              ) : (
                <MdOutlineKeyboardArrowUp />
              )}
            </i>
          </h1>
          <div
            className={`recently-viewed-items-wrapper${
              recentlyViewedCollapsed ? ` active` : ``
            }`}
            aria-expanded={recentlyViewedCollapsed}
          >
            {recentViewItemsFiltered.map(item => (
              <div key={item.id} className="owl-item col-xs-12">
                <ItemCard
                  // key={item.id}
                  item={item}
                  // toggleWish={toggleWish}
                  // wishListState={wishListState}
                />
              </div>
            ))}
          </div>
        </React.Fragment>
      ) : null}
    </div>
  );
};

export default RecentlyViewedItems;
