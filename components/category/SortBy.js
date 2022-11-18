import {
  handleSortBySelectChange,
  sortByParamsChangeState
} from "../../redux/actions/facetActions.js";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { htmlDecode } from "../../utils/htmlDecoder.js";

const Select = styled.select`
  border: none !important;
  box-shadow: none !important;
  // width: calc(100% + 10px) !important;
  padding-left: 0 !important;
  // color: #555 !important;
  // font-size: 14px !important;

  color: #37455E !important;
    font-size: 14px !important;
    font-weight: 500;
// }

@media (max-width: 430px) {
  align-items: center;
    background: #fff!important;
    border: 1px solid #000!important;
    border-radius: 4px!important;
    color: #000!important;
    display: flex;
    font-family: Source Sans Pro,sans-serif;
    font-size: 14px!important;
    padding: 9% 3px!important;
    text-transform: capitalize!important;
    margin-left: 10px;
}
`;

export default function SortBy({ productCount, setSortBy, sortBy, data }) {
  console.log("datannn", data);
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const filterUrlState = useSelector(state => state.facetReducer.filterUrl);

  const sortByParamsState = useSelector(
    state => state.facetReducer.sortByParams,
    shallowEqual
  );

  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );
  const productCountState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const numberOfItems = productCountState || productCount;

  const handleSelectChange = value => {
    let filterUrl = filterUrlState;
    let plainUrl = "";
    let params = "";

    plainUrl = filterUrl.replace(new RegExp("&sortci=\\w*%20\\w*", "g"), "");

    let url = plainUrl;
    if (value !== "Sort By") {
      url = `${plainUrl}${value}`;
    } else {
      value = "";
    }

    if (urlFilterParamsState.includes("sortci")) {
      params =
        urlFilterParamsState.replace(
          new RegExp("&sortci=\\w*%20\\w*", "g"),
          ""
        ) + value;
    } else {
      params = urlFilterParamsState + value;
    }

    dispatch(handleSortBySelectChange(url, params));
    dispatch(sortByParamsChangeState(value));
  };

  return (
    <>
    <div style={{marginTop: "74px"}} className="productsCounts">
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
      {numberOfItems > 0 ? (
        <div className="filterproductsortby">
          <Select
            id="sortby"
            className="form-control sort-decoration sort-decorationmobile"
            name="sortby"
            onChange={e => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">{t("js.category.sortby")}</option>
            <option value="&sortci=stitle%20asc">
              {t("js.category.sortby.atoz")}
            </option>
            <option value="&sortci=newest%20desc">
              {t("js.category.sortby.new")}
            </option>
            <option value="&sortci=price%20asc">
              {t("js.category.sortby.lowtohigh")}
            </option>

            <option value="&sortci=price%20desc">
              {t("js.category.sortby.hightolow")}
            </option>
            <option value="&sortci=topsellers%20asc">
              {t("js.category.sortby.popular")}
            </option>
            <option value="&sortci=orderscount%20desc">
              {t("js.category.sortby.bestsell")}
            </option>
            <option value="&sortci=averagereview%20desc">
              {t("js.category.sortby.rating")}
            </option>
          </Select>
        </div>
      ) : null}
      </div>
    </>
  );
}
