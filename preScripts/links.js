import { LINK_DISTRIBUTION } from "../project-config";

const PREVIEW_PROJECT_LINK = process.env.PREVIEW_PROJECT_LINK;
const PUBLISH_PROJECT_LINK = process.env.PUBLISH_PROJECT_LINK;
export const IS_PUBLISHED = process.env.IS_PUBLISHED == "true" ? true : false;

export const PREVIEW = IS_PUBLISHED ? "" : "/preview";

export const PROJECT_LINK = IS_PUBLISHED
  ? PUBLISH_PROJECT_LINK
  : PREVIEW_PROJECT_LINK;

export const VID = process.env.VID;

export const menuUrl = `${PROJECT_LINK}/uservices/1.0.2/menu/${VID}/category/Shop/lang/en/`;

// list of products
export const GET_ALL_PRODUCTS = (page = 1, itemCount = null) =>
  `${LINK_DISTRIBUTION}/store.html?vid=20180521148&cid=514035&tpt=json_items_en&mpv=childItemsDTO&mpvp=${page}&pageItemsCount=${
    itemCount || 1000
  }`;

//product urls initial
export const PRODUCT_URL = url => `${PROJECT_LINK}/${url}?tpt=json_en`;
export const PRODUCT_ID_URL = id =>
  `${PROJECT_LINK}/storeitem.html?vid=${VID}&iid=${id}&tpt=json_en`;

//product urls details
export const PRODUCT_DETAILS_URL = id =>
  `${PROJECT_LINK}/uservices/1.0.2/product/${VID}/iid/${id}/lang/en/`;

export const PRODUCT_PRICE_INVENTORY = id =>
  `${PROJECT_LINK}/uservices/1.0.2/priceinventory/${VID}/iid/${id}/lang/en/`;

export const PRODUCT_SUPPLIER_INFO = id =>
  `${PROJECT_LINK}/uservices/1.0.2/suppliers/${VID}/iid/${id}/lang/en/`;

export const PRODUCT_VIDEO = id =>
  `${PROJECT_LINK}/getitemvideo.ajx?vid=${VID}&iid=${id}`;

export const categoryUrl = ({
  id,
  mpvp = 1,
  pageItemsCount = process.env.PER_PAGE,
  query = ""
}) =>
  `${PROJECT_LINK}/uservices/1.0.2/category-${
    mpvp == 1 ? "page" : "paging"
  }/${VID}/cid/${id}/lang/en/page/${mpvp}/showperpage/${pageItemsCount}/${query}`;

export const searchPage = ({
  lang = "en",
  mpvp = 1,
  keyword,
  query = "",
  sortBy = ""
}) =>
  `${PROJECT_LINK}/uservices/1.0.2/search-page/${process.env.VID}/keyword/${keyword}/page/${mpvp}/lang/${lang}/${query}/${sortBy}`;
