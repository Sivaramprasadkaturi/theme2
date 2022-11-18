import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  handleFacetFilterParams,
  checkButtonsAction,
  handleSetFacetBread
} from "../../../redux/actions/facetActions";

import {
  fetchCategoryFromRender,
  fetchingCategorySuccess
} from "../../../redux/actions/categoryActions";
import classes from "./FacetBreadcrumb.module.css";

import { MdCancel } from "react-icons/md";

const FacetBreadcrumb = () => {
  const dispatch = useDispatch();

  const filterUrlState = useSelector(
    state => state.facetReducer.filterUrl,
    shallowEqual
  );

  const facetBreadCrumbState = useSelector(
    state => state.facetReducer.bread,
    shallowEqual
  );

  const initialStaticCategoryDataState = useSelector(
    state => state.categoryReducer.initialStaticCategoryData,
    shallowEqual
  );

  const handleFacet = (value, filterName, buttonsState, index) => {
    let bread = [value, filterName, !buttonsState, filterUrlState, index];
    dispatch(checkButtonsAction(index, filterName, buttonsState));
    dispatch(handleSetFacetBread(bread));
    dispatch(
      handleFacetFilterParams(value, filterName, buttonsState, filterUrlState)
    );
  };

  const reset = () => {
    dispatch(fetchingCategorySuccess(initialStaticCategoryDataState));
  };

  return (
    <div
      className={`${classes.facetCrumbRow}`}
      style={{ display: facetBreadCrumbState.length > 0 ? "flex" : "none" }}
    >
      {facetBreadCrumbState.length > 0
        ? facetBreadCrumbState.map(bread => {
            // destructuing and renaming
            const {
              0: value,
              1: filterName,
              2: buttonState,
              3: facetTitleAndText,
              4: index
            } = bread;

            let facetTitle = Object.keys(facetTitleAndText);

            if (filterName === "Price") {
              facetTitle = filterName; //translate("js.item.price");
            } else if (filterName === "Review") {
              facetTitle = filterName; //translate("js.item.reviews");
            }

            return (
              <>
                <div className={classes.crumbWrapper}>
                  <span
                    onClick={() =>
                      handleFacet(value, filterName, buttonState, index)
                    }
                  >
                    <strong>{facetTitle}:</strong>
                    <div style={{ marginLeft: "5px" }}>
                      {Object.values(facetTitleAndText)}
                    </div>
                    <MdCancel />
                  </span>
                </div>
              </>
            );
          })
        : null}

      {facetBreadCrumbState.length > 0 ? (
        <div className={classes.crumbCancelWrapper}>
          <span onClick={reset}>
            Clear All
            <MdCancel />
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default FacetBreadcrumb;
