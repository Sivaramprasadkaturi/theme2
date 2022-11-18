import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Slide from "../../AC-UI-Elements/Slide/Slide";
// import ReviewStarMaker from "../../functions/ReviewStarMaker.jsx";
import RatingIcons from "../../shared-components/RatingIcons";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  resetFacetStatesAction,
  updateFacetButtonsForGroupedFacets,
  handleSetFacetBread
} from "../../../redux/actions/facetActions";
import { setHTMLElementFixedPosition } from "../../../utils/functions.js";
import FacetImage from "./FacetImage.js";
import {
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdRemove,
  MdAdd
} from "react-icons/md";

import classes from "./MobileFacets.module.css";

export default function MobileFacets({
  filterButtonClicked,
  handleFacetContentCloseIconClicked,

  isBrowser,
  facetsStatic,
  buttonsStatic,
  catUrlState
}) {
  const dispatch = useDispatch();

  const facetsStateRedux = useSelector(
    state => state.facetReducer.facets,
    shallowEqual
  );
  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );
  const loadingState = useSelector(
    state => state.categoryReducer.loading,
    shallowEqual
  );

  const buttonsStateRedux = useSelector(
    state => state.facetReducer.buttons,
    shallowEqual
  );

  const facetsState = isBrowser ? facetsStateRedux : facetsStatic;
  const buttonsState = isBrowser ? buttonsStateRedux : buttonsStatic;

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  useEffect(() => {
    setHTMLElementFixedPosition(filterButtonClicked);
  }, [filterButtonClicked]);

  useEffect(() => {
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, []);

  const [activeFacetTitles, setActiveFacetTitles] = useState(["PRICE"]);
  const [activeShowMoreFacets, setActiveShowMoreFaces] = useState([]);

  const handleFacet = (value, index, name, buttonState, facetTitleAndText) => {
    let bread = [value, name, !buttonState, facetTitleAndText, index];
    dispatch(checkButtonsAction(index, name, buttonState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(value, name, buttonState, filterUrlState, index)
    );
  };

  const handleViewMoreFacetClick = (title, viewMoreActive) => {
    viewMoreActive
      ? setActiveShowMoreFaces([
          ...activeShowMoreFacets.filter(t => t !== title)
        ])
      : setActiveShowMoreFaces([...activeShowMoreFacets, title]);
  };

  const handleFacetTitleClick = (e, title, facetActive) => {
    facetActive
      ? setActiveFacetTitles([...activeFacetTitles.filter(t => t !== title)])
      : setActiveFacetTitles([...activeFacetTitles, title]);
  };

  useEffect(() => {
    if (
      facetsState &&
      facetsState[2] &&
      facetsState[2].Other &&
      facetsState[2].Other[0]
    ) {
      let name = facetsState[2].Other[0].title;
      // Adding the first 'other' facet to active states so that it will be active at first
      if (!activeFacetTitles.includes(name)) {
        setActiveFacetTitles([...activeFacetTitles, name]);
      }
    }
  }, [activeFacetTitles, facetsState]);

  const renderViewMoreButton = (
    numberOfFacetsValuesWithCountMoreThanZero,
    isActive,
    viewMoreActive,
    title
  ) => {
    return numberOfFacetsValuesWithCountMoreThanZero > 9 ? (
      <button
        onClick={() => handleViewMoreFacetClick(title, viewMoreActive)}
        className="view-more-button"
        style={{
          display: isActive ? `flex` : `none`,
          alignItems: "center",
          padding: "0",
          background: "none"
        }}
      >
        {viewMoreActive ? "LESS..." : "MORE..."}
        <i style={{ fontSize: "1.5rem" }} className="view-more-icon">
          {viewMoreActive ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
        </i>
      </button>
    ) : null;
  };

  const renderFacetToggleIcon = isActive => {
    return (
      <i role="button" aria-expanded={isActive} style={{ fontSize: "1.5rem" }}>
        {isActive ? <MdRemove /> : <MdAdd />}
      </i>
    );
  };
  if (!loadingState) {
    let numberOfReviewsFacetWithCountMoreThanZero =
      facetsState &&
      facetsState[1] &&
      facetsState[1]?.Reviews?.filter(f => f.count > 0).length;

    let activeFacetTitlesIncludesPriceTitle = activeFacetTitles.some(
      t => t === "PRICE"
    );

    let activeFacetTitleIncludesReviewsTitle = activeFacetTitles.some(
      t => t === "REVIEW"
    );

    return (
      <React.Fragment>
        <Slide direction="left" in={filterButtonClicked}>
          <div
            className={
              filterButtonClicked
                ? [classes.facetsContent, classes.mobile, classes.active].join(
                    " "
                  )
                : [classes.facetsContent, classes.mobile].join(" ")
            }
          >
            <div
              className={
                filterButtonClicked
                  ? [classes.contentHeader, classes.active].join(" ")
                  : classes.contentHeader
              }
            >
              <h4>
                FILTER
                <span className="mobile-facet-number-of-items">
                  {/*    {`${numberOfItemsState} ${
                    numberOfItemsState > 1 ? "items" : "item"
                  }`} */}
                </span>
                <div className="mobile-facet-content-icons-wrapper">
                  <i
                    style={{ cursor: "pointer", fontSize: "1.8rem" }}
                    onClick={() => handleFacetContentCloseIconClicked()}
                  >
                    <MdClose />
                  </i>
                </div>
              </h4>
            </div>
            <div style={{ width: "100%" }}>
              <div className={classes.facetTitleWrapper}>
                {Object.keys(buttonsState.Price).length > 0 ? (
                  <h4
                    data-facettitle="PRICE"
                    onClick={e =>
                      handleFacetTitleClick(
                        e,
                        "PRICE",
                        activeFacetTitlesIncludesPriceTitle
                      )
                    }
                    className={
                      Object.values(buttonsState.Price).some(k => k === false)
                        ? `facet-has-checked-option ${classes.facetTitle}`
                        : `${classes.facetTitle}`
                    }
                  >
                    Price
                    {renderFacetToggleIcon(activeFacetTitlesIncludesPriceTitle)}
                  </h4>
                ) : null}
                <div
                  aria-expanded={activeFacetTitlesIncludesPriceTitle}
                  className={
                    activeFacetTitlesIncludesPriceTitle
                      ? `${classes.facetFilterWrapper} scroll-bar-thin-style ${classes.active}`
                      : `${classes.facetFilterWrapper} scroll-bar-thin-style`
                  }
                >
                  <ul
                    className={
                      activeFacetTitlesIncludesPriceTitle
                        ? "priceFacet open"
                        : "priceFacet"
                    }
                  >
                    {facetsState?.[0]?.Price?.map(
                      ({ text, count, value }, index) => {
                        if (count > 0) {
                          return (
                            <div
                              key={value}
                              className={classes.facetFilterContent}
                            >
                              <li
                                onClick={() =>
                                  handleFacet(
                                    value,
                                    index,
                                    "Price",
                                    buttonsState.Price[index],
                                    { ["Price"]: text }
                                  )
                                }
                                key={value}
                                name={value}
                                style={
                                  count > 0
                                    ? { opacity: "1", cursor: "pointer" }
                                    : { opacity: "0.6", cursor: "not-allowed" }
                                }
                              >
                                <label
                                  className={
                                    buttonsState.Price[index]
                                      ? `${classes.checkmarkBox}`
                                      : `${classes.checkmarkBox} ${classes.checked}`
                                  }
                                ></label>

                                <span className={`${classes.productText}`}>
                                  {text}
                                </span>
                                <span className={`${classes.productCount}`}>
                                  ({count})
                                </span>
                              </li>
                            </div>
                          );
                        }
                      }
                    )}
                  </ul>
                </div>
              </div>
              {numberOfReviewsFacetWithCountMoreThanZero > 0 ? (
                <div className={classes.facetTitleWrapper}>
                  {Object.keys(buttonsState.Reviews).length > 0 ? (
                    <h4
                      data-facettitle="REVIEW"
                      onClick={e =>
                        handleFacetTitleClick(
                          e,
                          "REVIEW",
                          activeFacetTitleIncludesReviewsTitle
                        )
                      }
                      className={
                        Object.values(buttonsState.Reviews).some(
                          k => k === false
                        )
                          ? `facet-has-checked-option ${classes.facetTitle}`
                          : `${classes.facetTitle}`
                      }
                    >
                      Reviews
                      {renderFacetToggleIcon(
                        activeFacetTitleIncludesReviewsTitle
                      )}
                    </h4>
                  ) : null}
                  <div
                    aria-expanded={activeFacetTitleIncludesReviewsTitle}
                    className={
                      activeFacetTitleIncludesReviewsTitle
                        ? `${classes.facetFilterWrapper} scroll-bar-thin-style ${classes.active}`
                        : `${classes.facetFilterWrapper} scroll-bar-thin-style`
                    }
                  >
                    <ul
                      className={
                        activeFacetTitleIncludesReviewsTitle
                          ? "priceFacet open"
                          : "priceFacet"
                      }
                    >
                      {facetsState[1].Reviews.map(
                        ({ text, count, value }, index) => {
                          if (count > 0) {
                            return (
                              <div
                                key={value}
                                className={classes.facetFilterContent}
                              >
                                <li
                                  onClick={() =>
                                    handleFacet(
                                      value,
                                      index,
                                      "Reviews",
                                      buttonsState.Reviews[index],
                                      { ["Review"]: text }
                                    )
                                  }
                                  key={value}
                                  name={value}
                                  style={
                                    count > 0
                                      ? { opacity: "1", cursor: "pointer" }
                                      : {
                                          opacity: "0.6",
                                          cursor: "not-allowed"
                                        }
                                  }
                                >
                                  <label
                                    className={
                                      buttonsState.Reviews[index]
                                        ? `${classes.checkmarkBox}`
                                        : `${classes.checkmarkBox} ${classes.checked}`
                                    }
                                  ></label>

                                  {/*  <ReviewStarMaker
                                    className={`${classes.productText}`}
                                    text={text}
                                    item={false}
                                  /> */}
                                  <RatingIcons
                                    className={classes.facetText}
                                    rating={+text}
                                  />
                                  <span className={`${classes.productCount}`}>
                                    ({count})
                                  </span>
                                </li>
                              </div>
                            );
                          }
                        }
                      )}
                    </ul>
                  </div>
                </div>
              ) : null}

              {facetsState[2] &&
                facetsState[2].Other.map((other, index) => {
                  if (
                    catUrlState.includes("by-Brand/") &&
                    other.name === "facet_Brand"
                  ) {
                    return; // Don't render byBrand facet if we are in the by-brand page
                  }
                  let name = other.name;
                  let facetTitle = other.title
                    .replace("facet_", "")
                    .replace("specP", "")
                    .replace(/[_]/g, " ")
                    .replace("specT ", "")
                    .replace("specI ", "")
                    .replace("specD ", "")
                    .replace("specM ", "")
                    .replace("specC ", "")
                    .replace("spec ", "")
                    .replace("Type Fixture", "Fixture Type")
                    .replace(
                      "Install Max Height Decimals",
                      "Max Install Height"
                    )
                    .replace(
                      "Install Min Height Decimals",
                      "Min Install Height"
                    )
                    .replace("Country Origin", "Country of Origin")
                    .trim();

                  let valueSymbol = "";

                  if (facetTitle.includes("Wattage")) {
                    valueSymbol = "W";
                  } else if (facetTitle.includes("Voltage")) {
                    valueSymbol = "V";
                  } else if (facetTitle.includes("Lumen")) {
                    valueSymbol = "lm";
                  } else if (facetTitle.includes("Kelvin")) {
                    valueSymbol = "K";
                  }

                  if (facetTitle === "Sellers") {
                    facetTitle = "Stores";
                  }
                  let numberOfFacetsValuesWithCountMoreThanZero =
                    other.facetValues.filter(f => f.count > 0).length;
                  let isActive = activeFacetTitles.some(t => t === name);
                  let isViewMoreActive = activeShowMoreFacets.some(
                    t => t === name
                  );
                  if (numberOfFacetsValuesWithCountMoreThanZero > 0) {
                    return (
                      <div
                        key={other.title}
                        className={classes.facetTitleWrapper}
                      >
                        {Object.keys(buttonsState[name]).length > 0 ? (
                          <h4
                            role="button"
                            aria-expanded={isActive}
                            data-facettitle={other.title}
                            onClick={e =>
                              handleFacetTitleClick(e, name, isActive)
                            }
                            className={
                              Object.values(buttonsState[name]).some(
                                k => k === false
                              )
                                ? `facet-has-checked-option ${classes.facetTitle}`
                                : `${classes.facetTitle}`
                            }
                          >
                            {facetTitle.toLowerCase()}
                            {renderFacetToggleIcon(isActive)}
                          </h4>
                        ) : null}

                        <div
                          aria-expanded={isActive}
                          className={`${
                            isActive
                              ? `${classes.facetFilterWrapper} scroll-bar-thin-style ${classes.active}`
                              : `${classes.facetFilterWrapper} scroll-bar-thin-style`
                          } ${isViewMoreActive ? "view-more-active" : ""}`}
                        >
                          <ul
                            className={
                              isActive ? "priceFacet open" : "priceFacet"
                            }
                          >
                            {other.facetValues.map((subother, index) => {
                              if (subother.count > 0) {
                                return (
                                  <div
                                    key={subother.value}
                                    className={classes.facetFilterContent}
                                  >
                                    <li
                                      onClick={() =>
                                        handleFacet(
                                          subother.value,
                                          index,
                                          name,
                                          buttonsState[name][index],
                                          { [facetTitle]: subother.text }
                                        )
                                      }
                                      key={subother.value}
                                      name={subother.value}
                                      style={
                                        subother.count > 0
                                          ? { opacity: "1", cursor: "pointer" }
                                          : {
                                              opacity: "0.6",
                                              cursor: "not-allowed"
                                            }
                                      }
                                    >
                                      <label
                                        className={
                                          buttonsState[name][index]
                                            ? `${classes.checkmarkBox}`
                                            : `${classes.checkmarkBox} ${classes.checked}`
                                        }
                                      ></label>
                                      <FacetImage
                                        name={facetTitle}
                                        itemText={subother.text}
                                      />

                                      <span
                                        className={`${classes.productText}`}
                                      >
                                        {subother.text}
                                        {valueSymbol != ""
                                          ? ` ${valueSymbol}`
                                          : ""}
                                      </span>
                                      <span
                                        className={`${classes.productCount}`}
                                      >
                                        ({subother.count})
                                      </span>
                                    </li>
                                  </div>
                                );
                              }
                            })}
                          </ul>
                        </div>

                        <div
                          className={`view-more-button-wrapper ${
                            isViewMoreActive ? "view-more-active" : ""
                          }`}
                          style={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end"
                          }}
                        >
                          {renderViewMoreButton(
                            numberOfFacetsValuesWithCountMoreThanZero,
                            isActive,
                            isViewMoreActive,
                            other.name
                          )}
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
        </Slide>
      </React.Fragment>
    );
  } else {
    return (
      <div className={classes.facetsContent}>
        <div
          className={classes.facetTitleWrapper}
          style={{ minHeight: "300px" }}
        ></div>
      </div>
    );
  }
}
