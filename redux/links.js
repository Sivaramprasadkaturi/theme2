import { VID, LINK_DISTRIBUTION, PREVIEW } from "../project-config.js";

/*export const MENU_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cname=Shop&iu=$LANGUAGE`;*/

export const ACCOUNT_MESSAGES_LINK = `${LINK_DISTRIBUTION}/myaccountmessage.ajx?vid=${VID}`; // &type=2 send

export const MENU_FETCH_LINK = (lang = "en") =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/menu/${VID}/category/Shop/lang/${lang}/?longdesc=1`;
// https://b2cstartermarketplace-preview.avetti.io/preview/uservices/1.0.2/menu/20221020666/category/Shop/lang/en/?longdesc=1

export const MENU_EXD_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cid=72180&longdesc=all&showqty=yes`;
export const BY_STYLE_MENU_FETCH_LINK = `${LINK_DISTRIBUTION}/subcat.ajx?vid=${VID}&cid=72167&level=1&longdesc=all&showqty=yes&_=1570632812521`;

export const BASKET_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/basket/${VID}/lang/$LANGUAGE/`;
export const BASKET_LINK_TEMP = `${LINK_DISTRIBUTION}/basket.html&vid=${VID}&tpt=json_$LANGUAGE&c=$CURRENCY/`;

export const BASKET_UPDATE = vid =>
  `${LINK_DISTRIBUTION}/basket.html?vid=${vid}&executedAction=updateBasket&executeActionStatus=true`;

export const CATEGORY_FETCH_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/$cid/lang/$LANGUAGE/`;
export const CATEGORY_FETCH_LINK_FUNC = (
  cid,
  lang,
  lat = null,
  lng = null,
  distance = null
) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/${cid}/lang/${lang}/${
    lat && lng && distance ? `&lat=${lat}&long=${lng}&distance=${distance}` : ``
  }`;

// https://b2cstartermarketplace-preview.avetti.io/preview/uservices/1.0.2/category-page/20221020666/cid/72181/lang/en
export const TYPEAHEADSEARCH_LINK = (lang = "EN", keyword) =>
  `${LINK_DISTRIBUTION}/typeaheadsearch.ajx?vid=${VID}&pagetile=AdvancedSearchUsingSolrNew&iu=${lang}&q=${keyword}`;

export const SEARCH_FETCH_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/search-page/${VID}/keyword/$keyword/page/1/lang/$LANGUAGE/`;
export const CATEGORY_PAGING_FETCH_LINK = ({
  cid,
  lang = "en",
  page = "1",
  pageItemsCount = typeof process.env.PER_PAGE !== undefined
    ? process.env.PER_PAGE
    : "15",
  queryString = null,
  sortBy = null
}) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/category-${
    page == "1" ? "page" : "paging"
  }/${VID}/cid/${cid}/lang/${lang}/page/${page}/showperpage/${pageItemsCount}/${
    queryString ? `${queryString}` : ""
  }${sortBy ? `${sortBy}` : ""}`;

// export const SEARCH_PAGING_FETCH_LINK = (keyword, lang, page) =>
//   `${LINK_DISTRIBUTION}/uservices/1.0.2/search-page/${VID}/keyword/${keyword}/page/${page}/lang/${lang}/`;

export const SEARCH_PAGING_FETCH_LINK = ({
  keyword,
  lang = "en",
  page = "1",
  sortBy = null
}) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/search-page/${VID}/keyword/${keyword}/page/${page}/lang/${lang}/${
    sortBy ? `${sortBy}` : ""
  }`;

export const LOGIN_SIGNIN_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/signin/${VID}/lang/$LANGUAGE/`;

export const LOGIN_CHECK_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/login/${VID}/`;

export const FEATURED_FETCH_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/59522/lang/$LANGUAGE/`;

export const CATEGORY_FEATURED_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/category-page/${VID}/cid/$cid/lang/$LANGUAGE/&sortci=topsellers%20asc`;

export const LOGOUT_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/signout/${VID}/`;

export const GET_ITEM_LINK = `${LINK_DISTRIBUTION}/uservices/1.0.2/product/${VID}/iid/$ITEMREPLACE/lang/en/`;

export const GET_ATTRIBUTE_LINK = (attributeId, langCode) =>
  `${LINK_DISTRIBUTION}/uservices/1.0.2/variant/${VID}/aid/${attributeId}/lang/${langCode}/`;

export const GET_ID_PRODUCT_LINK = `${LINK_DISTRIBUTION}$PRODUCT?tpt=json_$LANGUAGE`;

export const GET_CURRENCY_ID = `${LINK_DISTRIBUTION}/uservices/1.0.2/currency/${VID}/`;

export const GET_CURRENCY_INFO = `${LINK_DISTRIBUTION}/getcurrency.ajx?vid=${VID}&currencyid=$CURRENCY`;
export const GET_CURRENCY_LIST = `${LINK_DISTRIBUTION}/getcurrency.ajx?vid=${VID}`;

export const GET_PRICE_INVENTORY = `${LINK_DISTRIBUTION}/uservices/1.0.2/priceinventory/${VID}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const ADD_TO_CART = `${LINK_DISTRIBUTION}/uservices/1.0.2/product-page/${VID}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const GET_DELIVERY_OPTIONS = `${LINK_DISTRIBUTION}/getdeliveryoptions.ajx`;

export const ITEM_REVIEW = `${LINK_DISTRIBUTION}/uservices/1.0.2/product-review/`;

export const GET_SUPPLIER_INFO = `${LINK_DISTRIBUTION}/uservices/1.0.2/suppliers/${VID}/iid/$PRODUCT/lang/$LANGUAGE/`;

export const GET_LANGUAGES = `${LINK_DISTRIBUTION}/uservices/1.0.2/language/${VID}/`;

export const SEND_GOOGLE_TOKEN = `${LINK_DISTRIBUTION}/ssoautologin.ajx`;

export const GET_ITEM_VIDEO = `${LINK_DISTRIBUTION}/getitemvideo.ajx?vid=${VID}&iid=$ITEMID`;
export const GET_ITEM_STOCK_INFO = (iid, lat, long) =>
  `${LINK_DISTRIBUTION}/getinventorysummary.ajx?vid=${VID}&iid=${iid}&lat=${lat}&long=${long}`;

export const BOOK_A_MEETING = (supCode, supVid = null) =>
  /*  `${LINK_DISTRIBUTION}/bookmeeting.ajx?vid=${supVid || VID}&code=${supCode}`; */
  `${LINK_DISTRIBUTION}/uservices/1.0.2/book-meeting/${
    supVid || VID
  }/code/${supCode}/`;
