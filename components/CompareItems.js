import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import LazyLoad from "react-lazyload";
import { replaceComparedItemsDetails } from "../redux/actions/compareActions";
import { MdClose } from "react-icons/md";
import styled from "styled-components";
import Link from "next/link";

const Wrapper = styled.div``;

const MIN_WIDTH_OF_CELL = 160;

const CompareItems = ({ show, close }) => {
  // const [compareModal, setCompareModal] = useState(false);

  const dispatch = useDispatch();
  const compareListState = useSelector(
    state => state.compareListReducer.compareList
  );

  const comparedItemsDetailsState = useSelector(
    state => state.compareListReducer.comparedItemsDetails,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const [
    highlightDifferencesCheckedState,
    setHighlightDifferencesCheckedState
  ] = useState(false);

  // const [collapsed, setCollapsed] = useState(true);
  const COMPARE_COLLAPSE_STATE_KEY = "compareCollapseState";

  const [filteredItemsDetailsProperties, setFilteredItemsDetailsProperties] =
    useState([]);

  const [sortedCombinedDataHeadersState, setSortedCombinedDataHeadersState] =
    useState([]);

  // const purgeCompareLocalStorage = () => {
  //     localStorage.setItem(
  //         "compareList",
  //         JSON.stringify(compareListState)
  //     );
  // };

  // const handleCompareItemsClicked = () => {
  //   // history.push(`${PREVIEW}/compareitems`);
  //   setCollapsed(true);
  // };

  useEffect(() => {
    if (compareListState) {
      let compareListStateIds = compareListState.map(item => item.id);
      let tempComparedItemsDetails = comparedItemsDetailsState.filter(item => {
        if (item && item.itemId)
          return compareListStateIds.includes(String(item.itemId));
        else {
          localStorage.setItem("compareList", JSON.stringify(compareListState));

          let alertText =
            "Removing the selected items from the compare list due to an error, please select them again";
          alert(alertText);
          return false;
        }
      });

      if (tempComparedItemsDetails != comparedItemsDetailsState) {
        dispatch(replaceComparedItemsDetails(tempComparedItemsDetails));
      }
    }
  }, [compareListState, comparedItemsDetailsState, dispatch]);

  useEffect(() => {
    if (compareListState) {
      let compareListStateIds = compareListState.map(item => item.id);

      let comparedItemsDetailsIds = comparedItemsDetailsState.map(
        item => item.itemId
      );

      let filteredItemsDetailsIds = comparedItemsDetailsIds.filter(itemId => {
        for (let id of compareListStateIds) {
          if (itemId == id) return true;
        }
        return false;
      });

      // Checking if comparedItemsDetailsState matches to items that are being compared at the moment actually.
      // This is to bypass the issue where if a user toggles items fast they are deleted from the compared items details but they come back due to fetching of item details takes longer than deleting them.
      let filtereditemsDetailsState = comparedItemsDetailsState.filter(item =>
        filteredItemsDetailsIds.includes(item.itemId)
      );

      let comparedItemsProperties = [];

      for (let item of filtereditemsDetailsState) {
        comparedItemsProperties = [
          ...comparedItemsProperties,
          { [item.itemId]: item.properties }
        ];
      }

      for (let obj of comparedItemsProperties) {
        let objKey = Object.keys(obj);

        let tempPropItems = [];

        obj[objKey].forEach(property => {
          tempPropItems[property.propnumber] = property;
        });

        obj[objKey] = tempPropItems;
      }

      setFilteredItemsDetailsProperties(comparedItemsProperties);
    }
  }, [compareListState, comparedItemsDetailsState]);

  useEffect(() => {
    let dataHeadersArray = [];

    filteredItemsDetailsProperties.forEach(item => {
      let itemId = Object.keys(item);
      let tempHeadersArray = [];
      let count = 0;
      item[itemId].forEach((property, index) => {
        //console.info("prop", property.propnumber);
        let dataHeaderKeys = dataHeadersArray.map(i => i.key);

        // if it is a unique prop
        if (!dataHeaderKeys.includes(String(property.propnumber))) {
          tempHeadersArray[count++] = (
            <div
              key={property.propnumber}
              sort={index}
              className="compare-table-data-header"
            >
              {property.propdesc}
            </div>
          );
        }
      });
      dataHeadersArray.push(...tempHeadersArray);
    });
    let combinedDataHeaders = [...dataHeadersArray];
    let sortedCombinedDataHeaders = combinedDataHeaders.sort(
      (a, b) => a.props.sort - b.props.sort
    );
    setSortedCombinedDataHeadersState(sortedCombinedDataHeaders);
  }, [filteredItemsDetailsProperties]);

  const renderDataRows = () => {
    let dataCells = [];

    let generateDataCell = data => (
      <div className="compare-table-data-cell">
        <div className="stock-status -in-stock">{data}</div>
      </div>
    );

    let dataRows = sortedCombinedDataHeadersState.map(
      (dataHeader, dataHeaderIndex) => {
        dataCells = [];
        let dataCellsPropsValues = [];

        let highlightedClass = "";

        filteredItemsDetailsProperties.forEach((obj, index) => {
          let itemId = Object.keys(obj);
          let dataHeaderPropNumber = dataHeader.key;

          if (obj[itemId][dataHeaderPropNumber]) {
            let propValue = obj[itemId][dataHeaderPropNumber].propvalue;
            dataCellsPropsValues.push(propValue);
            dataCells.push(generateDataCell(propValue));
          } else {
            dataCellsPropsValues.push(`-`);
            dataCells.push(generateDataCell(``));
          }
        });

        if (highlightDifferencesCheckedState) {
          for (let dataCellPropValue of dataCellsPropsValues) {
            if (dataCellPropValue == "-") {
              highlightedClass = " not-highlighted";
              break;
            } else if (dataCellPropValue === dataCellsPropsValues[0]) {
              highlightedClass = " not-highlighted";
            } else {
              highlightedClass = " highlighted";
            }
          }
        }

        return (
          // eslint-disable-next-line react/jsx-key
          <div
            style={{
              minWidth: isMobileState
                ? `${MIN_WIDTH_OF_CELL * (compareListState.length + 1)}px`
                : ""
            }}
            className={`compare-table-data-row main-features-row${highlightedClass}`}
          >
            {dataHeader}

            {dataCells}
          </div>
        );
      }
    );
    // console.info("dataRows", dataRows);

    return dataRows;
  };

  const renderMainFeatures = () => {
    return (
      <React.Fragment>
        <div id="mainFeatures" className="main-features">
          {renderHiglightDifferencesCheckBox()}
          {renderDataRows()}
        </div>
      </React.Fragment>
    );
  };

  const renderHiglightDifferencesCheckBox = () => {
    return (
      <div
        className="highlight-differences-container"
        style={{
          minWidth: isMobileState
            ? `${MIN_WIDTH_OF_CELL * (compareListState.length + 1)}px`
            : ""
        }}
      >
        <div
          className="no-select highlight-differences-wrapper"
          onClick={() =>
            setHighlightDifferencesCheckedState(
              !highlightDifferencesCheckedState
            )
          }
        >
          <label
            className={
              highlightDifferencesCheckedState
                ? "checkmark-box checked"
                : "checkmark-box"
            }
          ></label>
          <span className="highlight-differences-text">
            Highlight Differences
          </span>
        </div>
      </div>
    );
  };

  return show ? (
    <div className="modal-bg">
      <div className="modal">
        {/*{console.info("History", history)}*/}
        <div style={{ overflowY: "auto", height: "100%", width: "90%" }}>
          <div className="close-compare-items ">
            <div className="text-3xl cursor-pointer" onClick={close}>
              <MdClose />
            </div>
          </div>
          <div className="all-compare-items">
            <h1 className="modal-title">Compare Items</h1>
            <div className="compare-items-bar">
              <div
                className="compare-items-container"
                style={{
                  fontSize: "21px",
                  textTransform: "uppercase",
                  color: "#2c7e25"
                }}
              ></div>
              {/*<div className="compare-items-container"></div>*/}
              {compareListState &&
                compareListState.map(item => {
                  // const imgURL = item.image.replace(
                  //     "images",
                  //     "largeimages"
                  // )
                  return (
                    // eslint-disable-next-line react/jsx-key
                    <React.Fragment>
                      <div id={item.id} className="compare-items-container">
                        <div className="product-description">
                          <LazyLoad height={250} fadein={true} offset={100}>
                            <img
                              className="img-responsive"
                              src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/${item.image}`}
                              alt={`${item.title} Image`}
                            />
                          </LazyLoad>
                          <h2
                            className="product-desc-text"
                            // dangerouslySetInnerHTML={{
                            //   __html: htmlDecoder(item.title)
                            // }}
                          >
                            {item.title}
                          </h2>
                        </div>
                        <div className="result-price">
                          {/* <div className="reviews">Reviews1</div> */}
                          <div className="price-type-price">
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
                            <p style={{ color: "#fe4f00" }}>
                              {item.currency_sign} {item.price.value.integer}
                            </p>
                          </div>
                          <div className="view-details-row">
                            <div className="view-details-button">
                              <Link href={`/${item.url}`}>
                                <a>View Details</a>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
            </div>
            {compareListState && compareListState.length > 0
              ? renderMainFeatures()
              : null}
          </div>
        </div>
        <div className="close-compare-items-button" onClick={close}>
          <a>Close</a>
        </div>
      </div>
    </div>
  ) : null;
};

export default CompareItems;
