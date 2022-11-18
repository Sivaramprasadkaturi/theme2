import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  resetFacetStatesAction,
  updateFacetButtonsForGroupedFacets,
  handleSetFacetBread
} from "../../../redux/actions/facetActions";

/* import { PROJECT_LINK, VID } from "../../project-config"; */

// import ReviewStarMaker from "../../functions/ReviewStarMaker.jsx";
import FacetImage from "./FacetImage";
/* import Loading from "../AC-Loading/Loading"; */
/* import { Button } from "@material-ui/core"; */
import { MdAdd } from "react-icons/md";

import classes from "./Facets.module.css";
import RatingIcons from "../../shared-components/RatingIcons";

export default function Facets({
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

  const [activeFacetTitle, setActiveFacetTitle] = useState("");
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [chunkedFacetButtons, setChunkedFacetButtons] = useState([]);
  const [facetModalState, setFacetModalState] = useState(false);

  const handleFacet = (value, index, name, buttonState, facetTitleAndText) => {
    let bread = [value, name, !buttonState, facetTitleAndText, index];
    dispatch(checkButtonsAction(index, name, buttonState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(value, name, buttonState, filterUrlState, index)
    );
  };

  const handleFacetTitleClick = e => {
    setFacetModalState(!facetModalState);
    const { facettitle } = e.target.dataset;
    setActiveFacetTitle(facettitle !== activeFacetTitle && facettitle);
  };

  const changeClassName = e => {
    e.target.className = classes.facetFilterWrapper;
    setActiveFacetTitle("");
    setFacetModalState(!facetModalState);
  };

  const arrFacetTitlesToBeGrouped = [
    "specP_Initial_Lumens",
    "specP_Delivered_Lumens"
  ];
  useEffect(() => {
    let other = "";
    for (let name of arrFacetTitlesToBeGrouped) {
      if (
        facetsState &&
        facetsState[2] &&
        facetsState[2].Other.some(t => {
          other = t;
          return name === t.name;
        })
      ) {
        let divideValue = 0;

        let initialLumens =
          other &&
          other.facetValues
            .filter(lumen => lumen.count > 0)
            .sort((a, b) => a.value - b.value);

        let initailLumenValues = initialLumens.map(lumen => lumen.value);

        let minInitalLumenValue = Math.min(...initailLumenValues);
        let maxInitialLumenValue = Math.max(...initailLumenValues);

        let differenceBetweenMaxAndMin =
          maxInitialLumenValue - minInitalLumenValue;

        if (differenceBetweenMaxAndMin < 10000) {
          divideValue = 3;
        } else {
          divideValue = 5;
        }

        if (initailLumenValues.length <= 3) {
          divideValue = 1;
        }

        const chunk = (arr, size) => {
          return Array.from(
            { length: Math.ceil(arr.length / size) },
            (v, i) => {
              return arr
                .map(item => {
                  return { value: item.value, count: item.count };
                })
                .slice(i * size, i * size + size);
            }
          );
        };

        let chunkedInitialLumenValues = chunk(
          initialLumens,
          initialLumens.length / divideValue
        );

        let resultChunkedButtons = {};
        resultChunkedButtons[other.name] = chunkedInitialLumenValues;

        // creating the buttons object to be updated for the buttons object inside facetReducer
        let facetStateButtons = {};

        for (let i = 0; i < chunkedInitialLumenValues.length; i++) {
          facetStateButtons[i] =
            buttonsState[other.name][i] === false ? false : true;
        }

        dispatch(
          updateFacetButtonsForGroupedFacets(other.name, facetStateButtons)
        );
        setChunkedFacetButtons(chunkedFacetButtons => {
          return { ...chunkedFacetButtons, [name]: chunkedInitialLumenValues };
        });
      }
    }
  }, [facetsState]);

  // if (!loadingState && Object.keys(buttonsState).length > 0) {
  if (Object.keys(buttonsState).length > 0) {
    return (
      <React.Fragment>
        {/* <div>hi</div> */}
        <div
          className={
            showMoreOptions
              ? `white-bg facets-block ${classes.facetsContent} ${classes.moreOptions}`
              : `white-bg facets-block ${classes.facetsContent}`
          }
          style={!isMobileState && showMoreOptions ? {} : { maxHeight: "96px" }}
        >
          <div className={classes.facetTitleWrapper}>
            {Object.keys(buttonsState.Price).length > 0 ? (
              <div className={classes.titleWrapper}>
                <h4
                  data-facettitle="PRICE"
                  onClick={e => handleFacetTitleClick(e)}
                  className={
                    Object.values(buttonsState.Price).some(k => k === false)
                      ? `facet-has-checked-option ${classes.facetTitle}`
                      : `${classes.facetTitle}`
                  }
                  style={{
                    color: activeFacetTitle === "PRICE" ? "#fe4f00" : "#000"
                  }}
                >
                  Price
                  {/* <i
                    data-facettitle="PRICE"
                    className="material-icons facet-arrow-icon"
                  >
                    {activeFacetTitle === "PRICE"
                      ? "arrow_drop_down"
                      : "arrow_right"}
                  </i> */}
                </h4>
                <MdAdd
                  data-facettitle="PRICE"
                  onClick={e => handleFacetTitleClick(e)}
                  // className={classes.addIcon}
                  className={
                    activeFacetTitle === "PRICE" && facetModalState
                      ? classes.addIconActive
                      : classes.addIcon
                  }
                />
              </div>
            ) : null}
            <div
              aria-expanded={activeFacetTitle === "PRICE"}
              className={
                activeFacetTitle === "PRICE"
                  ? "facetFilterWrapperActive"
                  : `${classes.facetFilterWrapper}`
              }
              onMouseLeave={changeClassName}
            >
              <ul
                className={
                  activeFacetTitle === "PRICE"
                    ? `${classes.priceFacet} ${classes.open}`
                    : `${classes.priceFacet}`
                }
              >
                {facetsState[0].Price.map(({ text, count, value }, index) => {
                  if (count > 0) {
                    return (
                      <div key={value} className={classes.facetFilterContent}>
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
                          <input
                            type="checkbox"
                            name={text}
                            value={text}
                            style={{
                              width: "13px",
                              height: "13px",
                              margin: "5px",
                              display: "none"
                            }}
                            defaultChecked={!buttonsState.Price[index]}
                            disabled={count > 0 ? false : true}
                          />
                          <span className={classes.facetText}>{text}</span>
                          <span className={classes.productCount}>
                            ({count})
                          </span>
                        </li>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>
          </div>

          {/* //reviews */}
          {Object.keys(buttonsState.Reviews).length > 0 ? (
            <div className={classes.facetTitleWrapper}>
              {Object.keys(buttonsState.Reviews).length > 0 ? (
                <div className={classes.titleWrapper}>
                  <h4
                    data-facettitle="REVIEW"
                    onClick={e => handleFacetTitleClick(e)}
                    className={
                      Object.values(buttonsState.Reviews).some(k => k === false)
                        ? `facet-has-checked-option ${classes.facetTitle}`
                        : `${classes.facetTitle}`
                    }
                    style={{
                      color: activeFacetTitle === "REVIEW" ? "#fe4f00" : "#000"
                    }}
                  >
                    Reviews
                  </h4>
                  <MdAdd
                    data-facettitle="REVIEW"
                    onClick={e => handleFacetTitleClick(e)}
                    // className={classes.addIcon}
                    className={
                      activeFacetTitle === "REVIEW" && facetModalState
                        ? classes.addIconActive
                        : classes.addIcon
                    }
                    // className={
                    //   facetModalState ? classes.addIconActive : classes.addIcon
                    // }
                  />
                </div>
              ) : null}
              <div
                aria-expanded={activeFacetTitle === "REVIEW"}
                className={
                  activeFacetTitle === "REVIEW"
                    ? "facetFilterWrapperActive"
                    : `${classes.facetFilterWrapper}`
                }
                onMouseLeave={changeClassName}
              >
                <ul
                  className={
                    activeFacetTitle === "REVIEW"
                      ? `${classes.priceFacet} ${classes.open}`
                      : `${classes.priceFacet}`
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
                                  : { opacity: "0.6", cursor: "not-allowed" }
                              }
                            >
                              <label
                                className={
                                  buttonsState.Reviews[index]
                                    ? `${classes.checkmarkBox}`
                                    : `${classes.checkmarkBox} ${classes.checked}`
                                }
                              ></label>
                              <input
                                type="checkbox"
                                name={text}
                                value={text}
                                style={{
                                  width: "13px",
                                  height: "13px",
                                  margin: "5px",
                                  display: "none"
                                }}
                                defaultChecked={!buttonsState.Reviews[index]}
                                disabled={count > 0 ? false : true}
                              />
                              <RatingIcons
                                className={classes.facetText}
                                rating={+text}
                              />
                              <span className={classes.productCount}>
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

              let name = other.title;
              let facetTitle = name
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
                .replace("Install Max Height Decimals", "Max Install Height")
                .replace("Install Min Height Decimals", "Min Install Height")
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

              if (other.facetValues.length > 0 && other.positiveCount) {
                if (arrFacetTitlesToBeGrouped.includes(name)) {
                  // This part is for lumen facets
                  return (
                    // Object.keys(buttonsState[name]).length > 0 ? <div>HELLO WORLD</div>
                    // : null

                    // <React.Fragment key={index}>
                    <div key={index} className={classes.facetTitleWrapper}>
                      {Object.keys(buttonsState[name]).length > 0 ? (
                        <h4
                          data-facettitle={other.title}
                          onClick={e => handleFacetTitleClick(e)}
                          className={
                            Object.values(buttonsState[name]).some(
                              k => k === false
                            )
                              ? `facet-has-checked-option ${classes.facetTitle}`
                              : `${classes.facetTitle}`
                          }
                          style={{
                            color:
                              activeFacetTitle === other.title
                                ? "#fe4f00"
                                : "#000"
                          }}
                        >
                          {facetTitle.toLowerCase()}
                          {/* <i
                              data-facettitle={other.title}
                              className="material-icons facet-arrow-icon"
                            >
                              {activeFacetTitle === other.title
                                ? "arrow_drop_down"
                                : "arrow_right"}
                            </i> */}
                          <MdAdd
                            data-facettitle={other.title}
                            onClick={e => handleFacetTitleClick(e)}
                            // className={classes.addIcon}
                            className={
                              activeFacetTitle === other.title &&
                              facetModalState
                                ? classes.addIconActive
                                : classes.addIcon
                            }
                          />
                        </h4>
                      ) : null}

                      <div
                        aria-expanded={activeFacetTitle === name}
                        className={
                          activeFacetTitle === name
                            ? "facetFilterWrapperActive"
                            : `${classes.facetFilterWrapper}`
                        }
                        onMouseLeave={changeClassName}
                      >
                        <ul
                          style={{
                            maxWidth:
                              activeFacetTitle === name ? "300px" : "0px",
                            transition: "max-height 0.7s linear"
                          }}
                          className={
                            activeFacetTitle === name
                              ? `${classes.priceFacet} ${classes.open}`
                              : `${classes.priceFacet}`
                          }
                        >
                          {chunkedFacetButtons &&
                          chunkedFacetButtons[name] &&
                          chunkedFacetButtons[name].length > 0
                            ? chunkedFacetButtons[name].map(
                                (subother, index) => {
                                  let checkBoxText = `${subother[0].value} - ${
                                    subother[subother.length - 1].value
                                  }`;
                                  let checkBoxValue = subother.reduce(
                                    (a, item, i) => {
                                      if (i > 0)
                                        return a + `&${name}=${item.value}`;

                                      return a + `${item.value}`;
                                    },
                                    ""
                                  );

                                  let chunkProductCount = subother.reduce(
                                    (a, i) => {
                                      return a + i.count;
                                    },
                                    0
                                  );

                                  if (subother.length > 0) {
                                    return (
                                      <div
                                        key={subother[0].value}
                                        className={classes.facetFilterContent}
                                      >
                                        <li
                                          onClick={() =>
                                            handleFacet(
                                              checkBoxValue,
                                              index,
                                              name,
                                              buttonsState[name][index],
                                              {
                                                [facetTitle]: checkBoxText
                                              }
                                            )
                                          }
                                          key={subother[0].value}
                                          name={subother[0].value}
                                        >
                                          <label
                                            className={
                                              buttonsState[name][index]
                                                ? `${classes.checkmarkBox}`
                                                : `${classes.checkmarkBox} ${classes.checked}`
                                            }
                                          ></label>
                                          <input
                                            type="checkbox"
                                            name={subother[0].value}
                                            value={subother[0].value}
                                            className="facetCheckBox"
                                            style={{
                                              width: "13px",
                                              height: "13px",
                                              margin: "5px",
                                              minWidth: "13px",
                                              display: "none"
                                            }}
                                            defaultChecked={
                                              buttonsState[name][index]
                                                ? false
                                                : true
                                            }
                                          />

                                          <span className={classes.facetText}>
                                            {`${checkBoxText}${
                                              valueSymbol != ""
                                                ? ` ${valueSymbol}`
                                                : ""
                                            }`}
                                          </span>
                                          <span
                                            className={classes.productCount}
                                          >
                                            {`(${chunkProductCount})`}
                                          </span>
                                        </li>
                                      </div>
                                    );
                                  }
                                }
                              )
                            : null}
                        </ul>
                      </div>
                    </div>
                    // </React.Fragment>
                  );
                  // End of lumen facets render
                }

                return (
                  <React.Fragment key={index}>
                    <div
                      key={other.title}
                      className={classes.facetTitleWrapper}
                    >
                      {Object.keys(buttonsState[name]).length > 0 ? (
                        <div className={classes.titleWrapper}>
                          <h4
                            data-facettitle={other.title}
                            onClick={e => handleFacetTitleClick(e)}
                            className={
                              Object.values(buttonsState[name]).some(
                                k => k === false
                              )
                                ? `facet-has-checked-option ${classes.facetTitle}`
                                : `${classes.facetTitle}`
                            }
                            style={{
                              color:
                                activeFacetTitle === other.title
                                  ? "#fe4f00"
                                  : "#000"
                            }}
                          >
                            {facetTitle.toLowerCase()}
                            {/* <i
                            data-facettitle={other.title}
                            className="material-icons facet-arrow-icon"
                          >
                            {activeFacetTitle === other.title
                              ? "arrow_drop_down"
                              : "arrow_right"}
                          </i> */}
                          </h4>
                          <MdAdd
                            active={
                              activeFacetTitle === other.title
                                ? "true"
                                : "false"
                            }
                            data-facettitle={other.title}
                            onClick={e => handleFacetTitleClick(e)}
                            className={
                              activeFacetTitle === other.title &&
                              facetModalState
                                ? classes.addIconActive
                                : classes.addIcon
                            }
                          />
                        </div>
                      ) : null}

                      <div
                        aria-expanded={activeFacetTitle === name}
                        className={
                          activeFacetTitle === name
                            ? "facetFilterWrapperActive"
                            : `${classes.facetFilterWrapper}`
                        }
                        onMouseLeave={changeClassName}
                      >
                        <ul
                          style={{
                            maxWidth:
                              activeFacetTitle === name ? "300px" : "0px",
                            transition: "max-height 0.7s linear"
                          }}
                          className={
                            activeFacetTitle === name
                              ? `${classes.priceFacet} ${classes.open}`
                              : `${classes.priceFacet}`
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
                                    <input
                                      type="checkbox"
                                      name={subother.text}
                                      value={subother.text}
                                      className="facetCheckBox"
                                      style={{
                                        width: "13px",
                                        height: "13px",
                                        margin: "5px",
                                        minWidth: "13px",
                                        display: "none"
                                      }}
                                      defaultChecked={
                                        buttonsState[name][index] ? false : true
                                      }
                                      disabled={
                                        subother.count > 0 ? false : true
                                      }
                                    />

                                    <FacetImage
                                      name={facetTitle}
                                      itemText={subother.text}
                                    />

                                    <span className={classes.facetText}>
                                      {`${subother.text}${
                                        valueSymbol != ""
                                          ? ` ${valueSymbol}`
                                          : ""
                                      }`}
                                    </span>
                                    <span className={classes.productCount}>
                                      ({subother.count})
                                    </span>
                                  </li>
                                </div>
                              );
                            }
                          })}
                        </ul>
                      </div>
                    </div>
                  </React.Fragment>
                );
              }
            })}
        </div>
        {facetsState && facetsState[2] && facetsState[2].Other.length > 10 ? (
          <div className={classes.moreOptionsButtonWrapper}>
            {/* <Button
              className={showMoreOptions ? "" : "more-options-button"}
              style={{
                color: "#fe4f00",
                width: "auto"
               
              }}
              
            > */}
            <div
              onClick={() => setShowMoreOptions(!showMoreOptions)}
              className={classes.showMoreWrapper}
            >
              <span>{showMoreOptions ? "Less " : "More "} Options</span>
              <div
                style={
                  !showMoreOptions ? null : { transform: "rotate(180deg)" }
                }
                className="viewMoreFacetBtn"
              >
                {/* <FaAngleDoubleDown
                  preserveAspectRatio="none"
                  style={{ height: "13px", width: "20px", margin: "4px 0" }}
                /> */}
              </div>
            </div>

            {/* </Button> */}
          </div>
        ) : null}
      </React.Fragment>
    );
  } else {
    // return <Loading />;
    return null;
  }
}
