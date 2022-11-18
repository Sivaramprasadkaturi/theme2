import {
  FETCHING_MENU_SUCCESS,
  FETCHING_MENU_FAILURE,
  FETCHING_MENU_REQUEST,
  FETCHING_CATEGORY_REQUEST,
  FETCHING_BY_STYLE_MENU_SUCCESS,
  CATEGORY_UNMOUNT,
  CATEGORY_FETCH_FLAG_SET,
  SWITCH_BANNER_STATE
} from "../types.js";

let initialState = {
  navCats: "",
  isLoading: true,
  errorMessage: "",
  navCategory: "",
  byBrandNavCats: {},
  byStyleNavCats: {},
  categoryFetchFlag: true,
  bannerViewMore: false
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHING_BY_STYLE_MENU_SUCCESS:
      return { ...state, byStyleNavCats: payload };
    case FETCHING_MENU_REQUEST:
      return { ...state, isLoading: true, bannerViewMore: false };
    case FETCHING_MENU_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: ParseErrorMessage(payload)
      };
    case FETCHING_MENU_SUCCESS:
      return {
        ...state,
        isLoading: false,
        navCats: payload,
        bannerViewMore: false,
        byBrandNavCats: payload.childs.find(child => child.name == "by BRAND")
      };
    case FETCHING_CATEGORY_REQUEST:
      return {
        ...state,
        navCategory: payload,
        bannerViewMore: false
      };

    case CATEGORY_UNMOUNT:
      return {
        ...state,
        navCategory: "",
        bannerViewMore: false
      };

    case CATEGORY_FETCH_FLAG_SET:
      return {
        ...state,
        categoryFetchFlag: payload
      };
    case SWITCH_BANNER_STATE:
      return {
        ...state,
        bannerViewMore: !state.bannerViewMore
      };
    default:
      return state;
  }
};

export default menuReducer;
