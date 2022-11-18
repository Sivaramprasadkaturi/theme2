import { call, put } from "redux-saga/effects";
import {
  FETCHING_CATEGORY_SUCCESS,
  FETCHING_CATEGORY_FAILURE,
  FETCHING_CATEGORY_REQUEST,
  FETCHING_CATEGORY_REQUEST_SAGA,
  CHANGE_CATEGORY_NAME,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  CHANGE_KEYWORD_NAME,
  SET_FETCHED_CATEGORY_ITEMS_COUNT,
  FETCHING_CATEGORY_NO_ITEM_FOUND,
  BACK_TO_CATEGORY_REQUEST,
  BACK_TO_CATEGORY_FINISH,
  NEXT_PAGE_SCROOL_ACTION,
  NEXT_SCROLL_PAGE,
  SET_INITIAL_CATEGORY_DATA
} from "../types.js";
import {
  CATEGORY_FETCH_LINK,
  CATEGORY_PAGING_FETCH_LINK,
  SEARCH_FETCH_LINK
} from "../links.js";

import { getStore } from "../../store";
import buttonsMapping from "../../utils/buttonsMapping.js";
import categoryMapping from "../../utils/categoryMapping";
import { mapCategoryPayloadToCategoryState } from "../reducers/categoryReducer.js";

export const backToCategory = () => ({
  type: BACK_TO_CATEGORY_REQUEST
});
export const backToCategoryNormalize = () => ({
  type: BACK_TO_CATEGORY_FINISH
});

export const setFetchedCategoryItemsCount = (itemsCount = -1) => ({
  type: SET_FETCHED_CATEGORY_ITEMS_COUNT,
  payload: itemsCount
});

export const fetchingCategoryNoItemFound = () => ({
  type: FETCHING_CATEGORY_NO_ITEM_FOUND
});

export const nextScrollPageAction = (
  cid,
  page,
  urlFilterParams,
  setLoadMoreScrollPage,
  clickedLoadScrollPageButtonOnce,
  lastPage
) => {
  return dispatch => {
    if (cid) {
      const url = CATEGORY_PAGING_FETCH_LINK({
        cid,
        page,
        queryString: urlFilterParams
      });

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const categoryItems = data && data[1] && data[1].items;
          const scrollPage = page;
          const payload = { categoryItems, scrollPage };
          dispatch({ type: NEXT_SCROLL_PAGE, payload });
          if (
            page >= 3 &&
            clickedLoadScrollPageButtonOnce === false &&
            page < lastPage
          ) {
            setLoadMoreScrollPage(false);
          }
        })
        .catch(error => {
          console.error("error fetching next page", error);
        });
    }
  };
};

export const savePayloadToResetCategoryAction = payload => {
  return { type: SET_INITIAL_CATEGORY_DATA, payload };
};

export const mapCategoryDataToCategoryState = ({
  category,
  data,
  lang = null
}) => {
  if (data && category) {
    let cid = category.cid;
    let cat = category.name;
    let tempages = [];
    for (let i = 1; i <= Number(data[0].numOfPages); i++) {
      tempages.push(i);
    }
    let numberOfItems = Number(data[4].itemsCount);
    let categoryItems = data[1].items.map(item => {
      const newObj = Object.assign({}, item);
      // update the new object
      let image = newObj.image;
      newObj.image = image.replace("thumbnails", "images");
      return newObj;
    });

    let priceButtonsTemp = buttonsMapping(data);
    let dynamicSlider = {};
    let parents = [];
    let urlFilterParams = "";

    let link = setLink(cid, "", cat, lang);
    let filterUrl = link;

    const payload = {
      json: data,
      cid,
      cat,
      tempages,
      categoryItems,
      priceButtonsTemp,
      dynamicSlider,
      parents,
      link,
      filterUrl,
      urlFilterParams,
      resetCid: cid,
      numberOfItems
    };

    const categoryState = mapCategoryPayloadToCategoryState(payload);

    return { categoryState, payload };
  } else {
    console.error(
      "mapCategoryDataToCategoryState: data or category is undefined"
    );

    return null;
  }
};

export const fetchingCategorySuccess = ({
  json,
  cid,
  cat,
  tempages,
  categoryItems,
  priceButtonsTemp,
  dynamicSlider,
  parents,
  link,
  filterUrl,
  urlFilterParams,
  resetCid,
  numberOfItems
}) => ({
  type: FETCHING_CATEGORY_SUCCESS,
  payload: {
    json,
    cid,
    cat,
    tempages,
    categoryItems,
    priceButtonsTemp,
    dynamicSlider,
    parents,
    link,
    filterUrl,
    urlFilterParams,
    resetCid,
    numberOfItems
  }
});

export const fetchingSearchSuccess = (
  json,
  tempages,
  numberOfItems,
  categoryItems,
  priceButtonsTemp,
  dynamicSlider,
  keyword
) => ({
  type: FETCHING_SEARCH_SUCCESS,
  payload: {
    json,
    tempages,
    numberOfItems,
    categoryItems,
    priceButtonsTemp,
    dynamicSlider,
    keyword
  }
});

export const fetchingCategoryRequest = navCategory => ({
  type: FETCHING_CATEGORY_REQUEST,
  payload: navCategory
});

export const fetchingCategoryRequestSaga = (
  cid,
  cat,
  parents,
  keyword,
  navCategory
) => ({
  type: FETCHING_CATEGORY_REQUEST_SAGA,
  payload: { cid, cat, parents, keyword, navCategory }
});

export const fetchingCategoryFailure = error => ({
  type: FETCHING_CATEGORY_FAILURE,
  payload: error
});

export const fetchingSearchFailure = error => ({
  type: FETCHING_SEARCH_FAILURE,
  payload: error
});

class LocalDataService {
  api = link =>
    fetch(link)
      .then(res => res.json())
      .then(json => {
        if (json.length === 0) {
          return { json };
        }
        let tempages = [];
        for (let i = 1; i <= Number(json[0].numOfPages); i++) {
          tempages.push(i);
        }

        let numberOfItems = Number(json[4].itemsCount);

        let categoryItems = json[1].items.map(item => {
          const newObj = Object.assign({}, item);
          // update the new object
          let image = newObj.image;
          newObj.image = image.replace("thumbnails", "images");
          return newObj;
        });

        let priceButtonsTemp = buttonsMapping(json);
        let dynamicSlider = {};

        let urlFilterParams = "";
        return {
          json,
          tempages,
          categoryItems,
          priceButtonsTemp,
          dynamicSlider,
          urlFilterParams,
          numberOfItems
        };
      })
      .catch(err => {
        console.error("error fetching", err);
        fetchingCategoryFailure(err);
      });
}

export function* fetchFunctionSaga(action) {
  try {
    let link = "";
    link = setLink(
      action.payload.cid,
      action.payload.keyword,
      action.payload.cat
    );

    let filterUrl = link;
    let resetCid = action.payload.cid;

    const api = new LocalDataService();
    const category = yield call(api.api, link);

    if (category.json.length === 0) {
      yield put(fetchingCategoryNoItemFound());
    } else {
      yield put(
        fetchingCategorySuccess(
          category.json,
          action.payload.cid,
          action.payload.cat,
          category.tempages,
          category.categoryItems,
          category.priceButtonsTemp,
          category.dynamicSlider,
          action.payload.parents,
          link,
          filterUrl,
          category.urlFilterParams,
          resetCid,
          category.numberOfItems
        )
      );
    }
  } catch (e) {
    console.error("error fetching", e);
    fetchingCategoryFailure(e);
  }
}

export const fetchCategoryFromDirectUrl = () => {
  let category = getStore().getState().menuReducer.navCats;
  let curCat = getStore().getState().menuReducer.navCategory;
  let storesState = getStore().getState().storeReducer.stores;
  let lang = getStore().getState().mainReducer.lang;

  if (window.location.href.includes("search/")) {
    let keyword = window.location.href.split("search/")[1];
    return dispatch => {
      dispatch(fetchingCategoryRequest(category));
      dispatch(
        fetchingCategoryRequestSaga(
          "search",
          keyword,
          [
            ["search", ""],
            [keyword, ""]
          ],
          keyword,
          category
        )
      );
    };
  } else {
    let keyword = "";
    category = categoryMapping(category, lang);

    if (window.location.pathname.includes("/by-Brand/")) {
      keyword = `by-Brand/${window.location.pathname.split("/by-Brand/")[1]}`;
    }

    category.description = category.description.replace("&amp;", "&");
    return dispatch => {
      dispatch(changeCategoryName(category.description, category.parents));
      // Need to check if the url includes store in order to make sure the stores are populated, which is required to find out the selected store
      if (
        (window.location.pathname.includes("store") &&
          storesState &&
          storesState.length == 0) ||
        (window.location.pathname.includes("store") && storesState == undefined)
      ) {
        let category = getStore().getState().menuReducer.navCats;

        let storesNavCat = category.childs.filter(navCat =>
          navCat.URL.includes("stores")
        )[0];

        dispatch(fetchingCategoryRequest(storesNavCat));

        dispatch(
          fetchingCategoryRequestSaga(
            storesNavCat.cid,
            "Stores",
            [],
            "",
            storesNavCat
          )
        );
      }
      dispatch(fetchingCategoryRequest(category));
      dispatch(
        fetchingCategoryRequestSaga(
          category.cid,
          category.description,
          category.parents,
          keyword,
          category
        )
      );
    };
  }
};

export const fetchCategoryFromRender = (
  cid,
  cat,
  parents,
  keyword,
  category
) => {
  return dispatch => {
    dispatch(fetchingCategoryRequest(category));
    dispatch(fetchingCategoryRequestSaga(cid, cat, parents, keyword, category));
  };
};

export const changeCategoryName = (cat, parents, keywordArg, longdesc) => {
  let keyword = "";
  if (keywordArg == "search") {
    keyword = keywordArg;
  }
  return {
    type: CHANGE_CATEGORY_NAME,
    payload: { cat, parents, keyword, longdesc }
  };
};

export const changeKeyword = keyword => {
  return {
    type: CHANGE_KEYWORD_NAME,
    payload: { keyword }
  };
};

export const setLink = (cid, keyword, cat, lang = null) => {
  let language = lang || getStore().getState().mainReducer.lang;

  let link = "";
  if (cid == "search") {
    link = SEARCH_FETCH_LINK.replace("$keyword", keyword);
  } else if (keyword.includes("by-Brand/")) {
    keyword = keyword.toLowerCase();

    let menu = store && store.menuReducer.navCats; // Shop menu
    let byBrandMenu = menu && menu.childs.find(c => c.URL.includes("by-Brand"));
    let subByBrandCat =
      byBrandMenu &&
      byBrandMenu.childs.find(c => c.URL.toLowerCase().includes(keyword));

    cid = subByBrandCat && subByBrandCat.cid;

    link = CATEGORY_FETCH_LINK.replace("$cid", cid);
  } else {
    link = CATEGORY_FETCH_LINK.replace("$cid", cid);
  }
  link = link.replace("$LANGUAGE", language);
  return link;
};
