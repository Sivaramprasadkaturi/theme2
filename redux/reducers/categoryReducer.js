import ParseErrorMessage from "../../utils/errorMessageParser.js";

import {
  FETCHING_CATEGORY_SUCCESS,
  FETCHING_CATEGORY_FAILURE,
  FETCHING_CATEGORY_NO_ITEM_FOUND,
  FETCHING_CATEGORY_REQUEST,
  FETCH_STORES_SUCCESS,
  SET_FETCHED_CATEGORY_ITEMS_COUNT,
  CHANGE_CATEGORY_NAME,
  FETCHING_FILTER_SUCCESS,
  FETCHING_SEARCH_SUCCESS,
  FETCHING_SEARCH_FAILURE,
  CHANGE_KEYWORD_NAME,
  DISPATCH_CURRENT_PAGE,
  DISPATCH_SCROOL_PAGE,
  NEXT_PAGE_ACTION,
  NEXT_PAGE_SCROOL_ACTION,
  LAST_PAGE,
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_FROM_FUNCTION,
  BACK_TO_CATEGORY_REQUEST,
  BACK_TO_CATEGORY_FINISH,
  NEXT_SCROLL_PAGE,
  FETCHING_FILTER_REQUEST,
  SET_INITIAL_CATEGORY_DATA
} from "../types.js";
import { PROJECT_LINK } from "../../project-config.js";

const initialState = {
  numberOfItems: null,
  numberOfItemOnCurrentPage: 0,
  categoryItems: [],
  tempFacets: [],
  pages: [],
  link: PROJECT_LINK + "/",
  loading: true,
  loadingBottom: false,
  currentPage: 1,
  scrollPage: 1,
  parents: [],
  keyword: "",
  noItemFound: false,
  cat: "Home",
  backButton: false,
  initialStaticCategoryData: null
};

export const mapCategoryPayloadToCategoryState = payload => {
  return {
    numberOfItems: payload.numberOfItems,
    categoryItems: payload.categoryItems,
    tempFacets: payload.json[2].facets,
    pages: payload.tempages,
    cat: payload.cat,
    cidN: payload.cid,
    parents: payload.parents,
    loading: false,
    currentPage: 1,
    scrollPage: 1,
    resetCid: payload.resetCid,
    noItemFound: false,
    backButton: false
  };
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BACK_TO_CATEGORY_FINISH:
      return {
        ...state,
        backButton: false
      };
    case BACK_TO_CATEGORY_REQUEST:
      return {
        ...state,
        backButton: true
      };
    case CHANGE_LANGUAGE:
      return {
        ...state,
        loading: true
      };
    case CHANGE_LANGUAGE_FROM_FUNCTION:
      return {
        ...state,
        loading: true
      };
    case LAST_PAGE:
      return {
        ...state,
        loading: false,
        loadingBottom: false
      };
    case DISPATCH_SCROOL_PAGE:
      return {
        ...state,
        scrollPage: payload,
        loadingBottom: true
      };
    case DISPATCH_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
        scrollPage: payload,
        loading: true
      };
    case NEXT_SCROLL_PAGE:
      return {
        ...state,
        loading: false,
        loadingBottom: false,
        scrollPage: payload.scrollPage,
        categoryItems: [...state.categoryItems, ...payload.categoryItems]
      };
    case NEXT_PAGE_ACTION:
      return {
        ...state,
        loading: false,
        loadingBottom: false,
        numberOfItemOnCurrentPage: payload.numberOfItemOnCurrentPage,
        categoryItems: payload.categoryItems
      };
    case CHANGE_KEYWORD_NAME:
      return {
        ...state,
        keyword: payload.keyword,
        search: true
      };

    case FETCHING_FILTER_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        categoryItems: payload.categoryItems,
        pages: payload.pages,
        currentPage: 1,
        scrollPage: 1
      };
    case CHANGE_CATEGORY_NAME:
      return {
        ...state,
        cat: payload.cat,
        parents: payload.parents,
        cidN: payload.keyword,
        longDesc: payload.longdesc
      };
    case FETCHING_CATEGORY_REQUEST:
      return {
        ...state,
        loading: true,
        catImage: payload.image,
        noItemFound: false,
        backButton: false
      };
    case FETCHING_SEARCH_FAILURE:
    case FETCHING_CATEGORY_FAILURE:
      return {
        ...state,
        loading: true,
        errorMessageCategory: ParseErrorMessage(payload)
      };
    case FETCHING_CATEGORY_SUCCESS:
      return {
        ...state,
        ...mapCategoryPayloadToCategoryState(payload)
      };

    case SET_INITIAL_CATEGORY_DATA:
      return {
        ...state,
        initialStaticCategoryData: payload
      };
    case FETCHING_CATEGORY_NO_ITEM_FOUND:
      return {
        ...state,
        noItemFound: true
      };
    case FETCH_STORES_SUCCESS:
      return {
        ...state,
        pages: payload.tempages,
        currentPage: 1,
        scrollPage: 1,
        cidN: payload.cid,
        loading: false,
        backButton: false
      };
    case SET_FETCHED_CATEGORY_ITEMS_COUNT:
      return {
        ...state,
        numberOfItems: payload,
        loading: payload == 0 ? false : true
      };
    case FETCHING_SEARCH_SUCCESS:
      return {
        ...state,
        numberOfItems: payload.numberOfItems,
        categoryItems: payload.categoryItems,
        pages: payload.tempages,
        loading: false,
        keyword: payload.keyword,
        backButton: false
      };
    default:
      return state;
  }
};

export default categoryReducer;
