import {
  FETCHING_FEATURED_SUCCESS,
  FETCHING_FEATURED_FAILURE,
  IS_MOBILE_CHECK,
  FETCHING_FEATURED_CATEGORY_SUCCESS,
  FETCHING_FEATURED_CATEGORY_NAME_CHANGE,
  UPDATE_CURRENCY,
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_FROM_FUNCTION,
  CHANGE_ENTRY_STATE,
  CHANGE_COUNTRY,
  CHANGE_TITLE_AND_LONGDESC,
  SET_LAST_CAT_PATH,
  CHANGE_WEGLOT_INITIALIZED_ONCE
} from "../types.js";

const initialState = {
  featuredCid: 557557,
  featuredProducts: [],
  featuredProductsFetched: false,
  isMobile: null,
  currentScreenWidth: 1024,
  featuredCategory: [],
  featuredCatName: "",
  featuredLoading: {
    432307: true,
    432308: true,
    432310: true,
    432311: true
  },
  currency: "USD",
  lang: "en",
  country: "en",
  entryState: true,
  languageButton: false,
  breadcrumb: []
};

const mainReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_WEGLOT_INITIALIZED_ONCE:
      return {
        ...state,
        weglotInitializedOnce: payload
      };
    case CHANGE_TITLE_AND_LONGDESC:
      return {
        ...state,
        breadcrumb: [...payload.breadcrumbs]
      };
    case CHANGE_ENTRY_STATE:
      return {
        ...state,
        entryState: false
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        lang: payload,
        languageButton: true
      };
    case CHANGE_COUNTRY:
      return {
        ...state,
        country: payload
      };
    case CHANGE_LANGUAGE_FROM_FUNCTION:
      return {
        ...state,
        lang: payload
      };
    case IS_MOBILE_CHECK:
      return {
        ...state,
        isMobile: payload.isMobile,
        currentScreenWidth: payload.currentScreenWidth
      };
    case FETCHING_FEATURED_FAILURE:
      return { ...state, errorMessage: payload };
    case FETCHING_FEATURED_SUCCESS:
      return {
        ...state,
        featuredProducts: payload,
        featuredProductsFetched: true
      };
    case FETCHING_FEATURED_CATEGORY_NAME_CHANGE:
      return {
        ...state,
        featuredCatName: {
          ...state.featuredCatName,
          [payload.cid]: payload.catName
        },
        featuredLoading: { ...state.featuredLoading, [payload.cid]: true }
      };
    case FETCHING_FEATURED_CATEGORY_SUCCESS:
      return {
        ...state,
        featuredCategory: {
          ...state.featuredCategory,
          [payload.cid]: payload.json[1].items
        },
        featuredLoading: { ...state.featuredLoading, [payload.cid]: false }
      };
    case UPDATE_CURRENCY:
      return {
        ...state,
        currency: payload
      };
    case SET_LAST_CAT_PATH:
      return {
        ...state,
        lastPathCat: payload
      };
    default:
      return state;
  }
};

export default mainReducer;
