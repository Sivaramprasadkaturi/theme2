import {
  deleteCompareItem,
  clearCompareItems,
  replaceCompareItems,
  replaceComparedItemsDetails
} from "../redux/actions/compareActions.js";
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { usePrevious } from "../utils/usePrevious.js";
import CompareItems from "./CompareItems";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose
} from "react-icons/md";

// import "./Styles/Compare.css";
// import { FormattedNumber } from "react-intl";
export default function Compare() {
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(true);
  const COMPARE_COLLAPSE_STATE_KEY = "compareCollapseState";
  const COMPARE_STORAGE_NAME = "compareList";
  const COMPARE_ITEM_DETAILS_STORAGE_NAME = "compareItemDetails";

  const [toggleModal, setToggleModal] = useState(false);

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  const previousCompareListState = usePrevious(compareListState);

  const comparedItemsDetailsState = useSelector(
    state => state.compareListReducer.comparedItemsDetails,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  //collapse state storage
  useEffect(() => {
    let storedCompareCollapseString = localStorage.getItem(
      COMPARE_COLLAPSE_STATE_KEY
    );
    let storedCompareCollapseBool = storedCompareCollapseString === "true";

    if (storedCompareCollapseBool) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(COMPARE_COLLAPSE_STATE_KEY, JSON.stringify(collapsed));
  }, [collapsed]);

  //collapse state storage ends

  useEffect(() => {
    // get compared items list from localstorage
    let storedCompareListString = localStorage.getItem(COMPARE_STORAGE_NAME);
    let storedCompareListObject = JSON.parse(storedCompareListString);

    if (
      storedCompareListObject != null &&
      storedCompareListObject != undefined
    ) {
      dispatch(replaceCompareItems(storedCompareListObject));
    }

    // get compared items details from localstorage
    let storedComparedItemsDetailsString = localStorage.getItem(
      COMPARE_ITEM_DETAILS_STORAGE_NAME
    );
    let storedComparedItemsDetailsObject = JSON.parse(
      storedComparedItemsDetailsString
    );
    if (
      storedComparedItemsDetailsString != null &&
      storedComparedItemsDetailsString != undefined
    ) {
      dispatch(replaceComparedItemsDetails(storedComparedItemsDetailsObject));
    }
  }, [dispatch]);

  useEffect(() => {
    if (compareListState) {
      localStorage.setItem(
        COMPARE_STORAGE_NAME,
        JSON.stringify(compareListState)
      );
    }

    if (
      previousCompareListState &&
      previousCompareListState.length === 0 &&
      compareListState.length > 0
    ) {
      setCollapsed(false);
      // runAfterSomeTime(() => setCollapsed(true), 2000);
    }

    if (
      previousCompareListState &&
      previousCompareListState.length > 0 &&
      collapsed &&
      previousCompareListState.length < compareListState.length
    ) {
      setCollapsed(false);
    }
  }, [collapsed, compareListState, previousCompareListState]);

  useEffect(() => {
    if (comparedItemsDetailsState) {
      localStorage.setItem(
        COMPARE_ITEM_DETAILS_STORAGE_NAME,
        JSON.stringify(comparedItemsDetailsState)
      );
    }
  }, [comparedItemsDetailsState]);

  const handleRemoveIconClick = id => {
    dispatch(deleteCompareItem(id));
  };

  const renderRemoveIcon = id => {
    return (
      <i
        className="no-select material-icons compare-remove-icon"
        onClick={() => handleRemoveIconClick(id)}
      >
        <MdClose />
      </i>
    );
  };

  const handleCompareItemsClicked = () => {
    // history.push(`${PREVIEW}/compareitems`);
    setCollapsed(true);
  };

  const handleClearCompareItemsButtonClicked = () => {
    dispatch(clearCompareItems());
  };

  const [compareModal, setCompareModal] = useState(false);

  return compareListState && compareListState.length > 0 ? (
    <>
      {toggleModal && (
        <CompareItems
          show={toggleModal}
          close={() => setToggleModal(!toggleModal)}
        />
      )}
      <div
        className={`no-select compare-container${collapsed ? `` : ` expanded`}${
          isMobileState ? ` mobile` : ``
        }`}
        aria-expanded={!collapsed}
      >
        <div
          className="compare-collapse-button"
          onClick={() => setCollapsed(!collapsed)}
        >
          <i className="material-icons">
            {collapsed ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </i>
          <span> Compare </span>
        </div>
        <div
          className={`compare-items-wrapper${collapsed ? `` : ` expanded`}`}
          aria-expanded={!collapsed}
        >
          {[1, 2, 3, 4].map((v, i) => {
            if (compareListState && compareListState[i]) {
              let item = compareListState[i];
              // const imgURL = item.image.replace(
              //     "images",
              //     "largeimages"
              // )
              return (
                <div key={i} className="compare-item-container">
                  <div className="compare-item-wrapper" key={item.id}>
                    {renderRemoveIcon(item.id)}
                    <div className="compare-item-image-wrapper">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/${item.image}?tr=dpr-1,pr-true,w-200,q-50`}
                        alt={item.title}
                      />
                    </div>
                    <div className="compare-item-info-wrapper">
                      <div className="compare-item-price-wrapper">
                        <span className="compare-item-price">
                          {/*<FormattedNumber*/}
                          {/*  value={*/}
                          {/*    Number(*/}
                          {/*      item.price.value.integer +*/}
                          {/*      "." +*/}
                          {/*      item.price.value.decimal*/}
                          {/*    ) / priceConvert*/}
                          {/*  }*/}
                          {/*  style="currency"*/}
                          {/*  currency={currency}*/}
                          {/*/>*/}
                          {/*     {`${item.currency_sign}${item.price.value.integer}.${item.price.value.decimal}`} */}
                          <p style={{ color: "#fe4f00" }}>
                            {item.currency_sign} {item.price.value.integer}
                          </p>
                        </span>
                      </div>
                      <div className="compare-item-title">{item.title}</div>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div key={i} className="compare-item-container">
                  <div
                    className="compare-item-wrapper"
                    key={i}
                    style={{
                      backgroundColor: i === 1 ? "#2f5ba799" : "",
                      display: isMobileState && i !== 1 ? "none" : ""
                    }}
                  >
                    {i === 1 ? (
                      <span style={{ padding: "10px", textAlign: "center" }}>
                        {/*{"compare.compare_more"}*/}
                        Select one or more product to compare.
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            }
          })}
          <div
            className="compare-items-actions"
            style={{
              display:
                isMobileState && compareListState.length < 2 ? "none" : ""
            }}
          >
            {/*<Link href="/compare-items">*/}
            {/*  <button*/}
            {/*    onClick={() => handleCompareItemsClicked()}*/}
            {/*    className="compare-items-compare-button"*/}
            {/*    disabled={compareListState.length < 2}*/}
            {/*  >*/}
            {/*    /!*{"compare.compare_title"}*!/*/}
            {/*    <a> Compare </a>*/}
            {/*  </button>*/}
            {/*</Link>*/}
            <button
              onClick={() => {
                setToggleModal(!toggleModal);
                setCollapsed(!collapsed);
              }}
              className="compare-items-compare-button"
              disabled={compareListState.length < 2}
            >
              {/*{"compare.compare_title"}*/}
              Compare
            </button>
            <button
              onClick={() => handleClearCompareItemsButtonClicked()}
              className="compare-items-clear-button"
              disabled={compareListState.length < 2}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </>
  ) : null;
}

export const toggleCompare = (
  id,
  title,
  currency_sign,
  image,
  price,
  url,
  compareListState,
  itemInComparedList,
  dispatch,
  deleteCompareItem,
  toggleCompareAction,
  translate
) => {
  //event.preventDefault();

  if (compareListState && compareListState.length >= 4) {
    if (itemInComparedList) {
      dispatch(deleteCompareItem(id));
    } else {
      let alertMessage =
        "Cannot compare more than 4 products. Consider removing some of the items from the list.";
      alert(alertMessage);
    }
  } else {
    dispatch(toggleCompareAction(id, title, currency_sign, image, price, url));
  }
};
