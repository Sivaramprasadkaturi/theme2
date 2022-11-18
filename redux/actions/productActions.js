import { call, put } from "redux-saga/effects";

import {
  GET_ITEM_FETCH_REQUEST,
  GET_ITEM_FETCH_SUCCESS,
  GET_ITEM_FETCH_FAILURE,
  UPDATE_PRICE_INVENTORY,
  ADD_TO_CART_SUCCESS,
  SUPPLIER_INFO_SUCCESS,
  ADD_TO_CART_MODAL_CLOSE,
  CHANGE_PRODUCT_ATTRIBUTES,
  CHANGE_TITLE_AND_LONGDESC,
  SHOW_CONTINUE_MODAL,
  UNMOUNT_PRODUCT_PAGE,
  SET_REVIEW_MODAL_STATE,
  SHOW_CONTINUE_MODAL_QUOTE,
  SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
  FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS,
  REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SET_ATTRIBUTES_DETAILS,
  SET_CART_VALIDATION_ERR,
  POPULATE_ACCESSORY_MODAL,
  CLOSE_ACCESSORY_MODAL,
  GET_MODAL_ITEM_FETCH_REQUEST,
  GET_MODAL_ITEM_FETCH_SUCCESS,
  UPDATE_PRODUCT_STOCK_INFO,
  CHANGE_CUSTOMER_ID,
  UPDATE_ACCESSORY_INVENTORY,
  CHECKBOX_ITEM_SELECTED,
  REQUEST_BASKET_AFTER_ADDING_TO_CART,
  SET_REQUESTING_ADD_TO_CART,
  addToCartActions
} from "../types";

import {
  GET_ITEM_LINK,
  GET_ID_PRODUCT_LINK,
  GET_PRICE_INVENTORY,
  ADD_TO_CART,
  GET_DELIVERY_OPTIONS,
  GET_SUPPLIER_INFO,
  GET_ITEM_STOCK_INFO,
  ITEM_REVIEW
} from "../links.js";

import { VID, PREVIEW } from "../../preScripts/links";

import { getStore } from "../../store";
import axios from "axios";
import { removeWishListAction } from "./wishlistActions";

export const unMountProductPageAction = () => ({
  type: UNMOUNT_PRODUCT_PAGE
});

export const setAddToCartValidationErrors = payload => ({
  type: SET_CART_VALIDATION_ERR,
  payload: payload
});

export const setProductOutOfStockError = payload => ({
  type: SET_PRODUCT_OUT_OF_STOCK_ERR,
  payload: payload
});

export const setAttributesDetailsAction = payload => ({
  type: SET_ATTRIBUTES_DETAILS,
  payload: payload
});

export const setReviewModalStateAction = payload => ({
  type: SET_REVIEW_MODAL_STATE,
  payload: payload
});

export const fetchingProductRequestSaga = id => ({
  type: GET_ITEM_FETCH_REQUEST,
  payload: { id }
});

export const addToCartModalClose = () => ({
  type: ADD_TO_CART_MODAL_CLOSE
});

export const updateCheckboxItemState = () => ({
  type: CHECKBOX_ITEM_SELECTED
});

export const setRequestingAddToCartAction = payload => ({
  type: SET_REQUESTING_ADD_TO_CART,
  payload
});

const api = link =>
  fetch(link)
    .then(res => res.json())
    .then(json => {
      return {
        json: json.__Result[0]
      };
    });

export function* fetchFunctionSaga(action) {
  let language = "en"; //getStore().getState().mainReducer.lang;
  try {
    let link = GET_ITEM_LINK;

    link = link
      .replace("$ITEMREPLACE", action.payload.id)
      .replace("$LANGUAGE", language);

    const product = yield call(api, link);

    yield put(fetchingItemSuccess(product.json, action.payload.id));
  } catch (e) {
    console.error("ERROR: fetching product", e.message);
    yield put(fetchingItemFailure(e));
  }
}

export const fetchingItemSuccess = payload => ({
  type: GET_ITEM_FETCH_SUCCESS,
  payload
});

export const fetchingItemFailure = error => ({
  type: GET_ITEM_FETCH_FAILURE,
  payload: error
});

export const changeCustomerIdAction = data => ({
  type: CHANGE_CUSTOMER_ID,
  payload: data
});
export const changeTitleAndLongDesc = json => ({
  type: CHANGE_TITLE_AND_LONGDESC,
  payload: json
});

export const setPriceInventory = payload => ({
  type: UPDATE_PRICE_INVENTORY,
  payload
});

export const fetchingProductPriceInventory = id => {
  let language = "en"; // getStore().getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json => dispatch(setPriceInventory(json.__Result[0])));
  };
};

export const fetchProductStockInfo = id => {
  let userLocation = getStore().getState().geoLocationReducer.geoLocation;
  // let userLocation = JSON.parse(localStorage.getItem("userLocation"));
  let lat = userLocation.lat;
  let long = userLocation.long;
  return dispatch => {
    fetch(GET_ITEM_STOCK_INFO(id, lat, long))
      .then(res => res.json())
      .then(json =>
        dispatch({ type: UPDATE_PRODUCT_STOCK_INFO, payload: json.__Result })
      );
  };
};

export const fetchMainProductSkusAndSkuIds = id => {
  let language = "en"; //getStore().getState().mainReducer.lang;

  let link = GET_ITEM_LINK;

  link = link.replace("$ITEMREPLACE", id).replace("$LANGUAGE", language);
  return dispatch => {
    dispatch({ type: REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS });
    fetch(link)
      .then(res => res.json())
      .then(json => {
        let skus = json.__Result[0].skus;
        let skuIds = json.__Result[0].skuids;
        dispatch({
          type: SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
          payload: { mainProductSkus: skus, mainProductSkuIds: skuIds }
        });
      })
      .catch(err => {
        dispatch({ type: FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS });
      });
  };
};

export const reFetchProductInitialState = (
  link,
  itemid = null,
  onlyCustomerId = false
) => {
  if (itemid) {
    let language = "en"; //getStore().getState().mainReducer.lang;

    link = ADD_TO_CART.replace("$PRODUCT", itemid).replace(
      "$LANGUAGE",
      language
    );
  }
  return dispatch => {
    fetch(link)
      .then(res => res.json())
      .then(json => {
        json = json && json[0];
        json.productLink = link;

        if (onlyCustomerId) {
          dispatch(changeCustomerIdAction(json.customerid));
          return;
        }

        // Filtering out the reviews where the rating is 0
        if (json && json.reviews && json.reviews.length > 0) {
          json.reviews = json.reviews.filter(review => review.rating != 0);
        }
        dispatch(changeTitleAndLongDesc(json));
      })
      .catch(err => {
        dispatch(fetchingItemFailure(err));
      });
  };
};

export const fetchDirectUrlGetItem = (url, langCode, countryCode) => {
  let tempUrl = url;
  let language = getStore().getState().mainReducer.lang;
  return dispatch => {
    tempUrl = tempUrl.includes("preview")
      ? tempUrl.replace("/preview", "")
      : tempUrl;

    if (!tempUrl.includes("product")) {
      if (tempUrl.includes(`/${langCode}/`)) {
        tempUrl = tempUrl.replace(`/${langCode}`, "");
      }
      if (marketplaces.some(market => tempUrl.includes(market[1]))) {
        let marketplaceName = marketplaces.filter(market => {
          if (tempUrl.includes(market[1])) {
            return true;
          } else {
            return false;
          }
        })[0][1];
        tempUrl = tempUrl.replace(`/${marketplaceName}`, "");
        tempUrl = `/${marketplaceName}/product${tempUrl}`;
      } else {
        tempUrl = "/product" + tempUrl;
      }
    }
    let id = "";
    let link = GET_ID_PRODUCT_LINK.replace("$PRODUCT", tempUrl).replace(
      "$LANGUAGE",
      language
    );

    if (link.includes(`/${langCode}/`)) {
      link = link.replace(`${langCode}/`, "");
    }

    if (tempUrl.includes("storeitem.html")) {
      id = tempUrl.split("iid=")[1];
      dispatch(fetchingProductRequestSaga(id));
      dispatch(fetchingProductPriceInventory(id));
      dispatch(fetchProductStockInfo(id));
    } else {
      fetch(link)
        .then(res => {
          //return res.text();
          return res.json();
        })
        .then(json => {
          json = json && json[0];
          id = json.id;

          json.productLink = link;
          // Filtering out the reviews where the rating is 0
          if (json && json.reviews && json.reviews.length > 0) {
            json.reviews = json.reviews.filter(review => review.rating != 0);
          }

          dispatch(changeTitleAndLongDesc(json));
          dispatch(fetchingProductRequestSaga(id));
          dispatch(fetchingProductPriceInventory(id));
          dispatch(fetchProductStockInfo(id));
        })
        .catch(err => {
          dispatch(fetchingItemFailure(err));
        });
    }
  };
};

export const setSupplierInfo = payload => ({
  type: SUPPLIER_INFO_SUCCESS,
  payload
});

export const getSupplierInfo = id => {
  let language = "en"; //getStore().getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_SUPPLIER_INFO.replace("$PRODUCT", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json => dispatch(setSupplierInfo(json.__Result)))
      .catch(err => console.error(err));
  };
};
export const showContinueModalAfterAddingToCartAction = (quoteMode = false) => {
  return dispatch => {
    dispatch({
      type: quoteMode ? SHOW_CONTINUE_MODAL_QUOTE : SHOW_CONTINUE_MODAL
    });
  };
};
export const addToLocalMiniCart = (title, price, qty, supplier) => {
  return dispatch => {
    dispatch({
      type: SHOW_CONTINUE_MODAL,
      payload: { title, price, qty, supplier }
    });
  };
};
export const addToLocalMiniCartQute = (title, price, qty, supplier) => {
  return dispatch => {
    dispatch({
      type: SHOW_CONTINUE_MODAL_QUOTE,
      payload: { title, price, qty, supplier }
    });
  };
};

export const getDeliveryOptions = (
  distributorId,
  invCode,
  qty,
  id,
  attributesObject,
  quoteMode = false,
  onClose
) => {
  console.log("onClose", onClose);
  return dispatch => {
    let historyID = "";
    var form = new FormData();
    form.append("basketeditmode", false);
    form.append("suppressautochooseinstock", false);
    form.append("distributorId", distributorId);
    form.append("mode", "query");
    form.append("invcode", invCode);
    form.append("invhistid", "");
    form.append("qty", qty);
    form.append("vid", VID);

    fetch(GET_DELIVERY_OPTIONS, {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(res => res.json())
      .then(json => {
        //  dispatch({ type: ADD_TO_CART_SUCCESS });
        historyID = json.__Result.invhistid;
      })
      .then(() => {
        onClose && onClose();
        dispatch(
          addToCartProduct(
            id,
            qty,
            historyID,
            distributorId,
            attributesObject,
            quoteMode,
            onClose
          )
        );
      })
      .catch(err => console.error(err));
  };
};

export const addToCartProduct = (
  id,
  qty,
  historyId,
  distributorId,
  attributesObject,
  quoteMode,
  onClose
) => {
  let language = "en"; //getStore().getState().mainReducer.lang;
  const wishListState = getStore().getState().wishListReducer.wishlist;
  return dispatch => {
    dispatch(setRequestingAddToCartAction(true));
    var form = new FormData();
    form.append("productoption", `productoption.html?vid=${VID}&cid=891&qp=0`);
    form.append("replaceditemmsg_0", "");
    form.append("viewMode", "item");
    form.append("actionMode", "buy");
    form.append("selfUri", "storeitem.html");
    form.append("targetUri", "basket.html");
    form.append("mode", `${quoteMode ? "addQuote" : "addItem"}`);
    form.append("itemscount", "1");
    form.append("_targetaddItem", `basket.html?vid=${VID}`);
    form.append("_targetaddQuote", `basket.html?vid=${VID}`);
    form.append("basketItems[0].itemId", id);
    form.append("basketItems[0].vendorId", VID);
    form.append("basketItems[0].itemToProcess", true);
    form.append("basketItems[0].quantity", qty);
    form.append("basketItems[0].inventoryHistoryId", historyId);
    form.append("basketItems[0].distributorId", distributorId);
    form.append("ajax", true);

    if (attributesObject != null) {
      let keys = Object.keys(attributesObject);
      let attributeIdandOptionIds = [];
      keys.forEach((key, keyIndex) => {
        let attribute = attributesObject[key];
        // Get only the attributeid and the optionid objects
        let attributeKeys = ["attributeid"];

        if (attribute && attribute.optionid) {
          attributeKeys.push("optionid");
        } else {
          attributeKeys.push("value");
        }

        attributeIdandOptionIds.push([
          attribute[attributeKeys[0]],
          attribute[attributeKeys[1]]
        ]);

        attributeKeys.forEach(key => {
          form.append(
            `basketItems[0].attributes[${keyIndex}].${key.replace("id", "Id")}`,
            attribute[key]
          );
        });
      });

      // append the last bit of attributeid and optonid part.
      if (attributeIdandOptionIds.length > 0) {
        for (let attributeAndOptionId of attributeIdandOptionIds) {
          if (
            attributesObject &&
            attributesObject[attributeAndOptionId[0]] &&
            attributesObject[attributeAndOptionId[0]].optionid
          ) {
            form.append(
              `attribute_${attributeAndOptionId[0]}`,
              attributeAndOptionId[1]
            );
          } else {
            let dataname = attributesObject[attributeAndOptionId[0]].dataname;
            form.append(`${dataname}`, attributeAndOptionId[1]);
          }
        }
      }
    }

    form.append("redirectMode", true);

    for (let data of form.values()) {
      console.info("Form", data);
    }

    fetch(ADD_TO_CART.replace("$PRODUCT", id).replace("$LANGUAGE", language), {
      method: "POST",
      body: form,
      headers: {
        Accept: "*/*",
        credentials: "same-origin"
      },
      mimeType: "multipart/form-data",
      data: form
    })
      .then(res => {
        return res.text();
      })
      .then(text => {
        console.info("add to cart result", text);
        console.log("wishListState", wishListState);
        if (text.includes("Product was added to cart")) {
          if (
            wishListState &&
            wishListState.some(item => item.id === String(id))
          ) {
            dispatch(removeWishListAction(id, wishListState));
            onClose && onClose();
          }
          let json = null;
          try {
            json = JSON.parse(text);
          } catch (err) {
            console.error("error parsing add to cart result", err);
          }
          dispatch(fetchingProductPriceInventory(id));

          dispatch(showContinueModalAfterAddingToCartAction(quoteMode));

          dispatch({
            type: addToCartActions.SUCCESS_ADD_TO_CART,
            payload: {
              quoteMode: quoteMode ? "addQuote" : "addItem",
              json: json
            }
          });
        } else {
          dispatch({
            type: addToCartActions.FAILURE_ADD_TO_CART
          });
        }
      })
      .then(() => {
        dispatch({ type: REQUEST_BASKET_AFTER_ADDING_TO_CART });
      })
      .catch(err => {
        console.error("Error adding to basket", err.message);
      });
  };
};

export const changeProductAttributesAction = payload => ({
  type: CHANGE_PRODUCT_ATTRIBUTES,
  payload: payload
});

export const populateAccessoryModal = payload => ({
  type: POPULATE_ACCESSORY_MODAL,
  payload: payload
});

export const closeAccessoryModal = () => ({
  type: CLOSE_ACCESSORY_MODAL
});

export const fetchingModalProductRequestSaga = id => ({
  type: GET_MODAL_ITEM_FETCH_REQUEST,
  payload: { id }
});

export function* fetchModalProductAction(action) {
  let language = getStore().getState().mainReducer.lang;
  try {
    let link = GET_ITEM_LINK;

    link = link
      .replace("$ITEMREPLACE", action.payload.id)
      .replace("$LANGUAGE", language);

    const product = yield call(api, link);

    yield put(fetchingModalItemSuccess(product.json, action.payload.id));
  } catch (e) {
    console.error("MODAL FAILED", e);
  }
}

export const fetchingModalItemSuccess = (json, id) => ({
  type: GET_MODAL_ITEM_FETCH_SUCCESS,
  payload: { json, id }
});

export const fetchingAccessoryPriceInventory = id => {
  let language = getStore().getState().mainReducer.lang;
  return dispatch => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", id).replace("$LANGUAGE", language)
    )
      .then(res => res.json())
      .then(json =>
        dispatch({
          type: UPDATE_ACCESSORY_INVENTORY,
          payload: json.__Result[0]
        })
      );
  };
};

export const submitNewReview = data => async dispatch => {
  let res;
  try {
    res = await axios.post(ITEM_REVIEW, data, {
      headers: {
        "content-type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*"
      },
      onUploadProgress: p => {
        console.log(p.loaded / p.total, 587);
        // this.setState({
        //   fileprogress: p.loaded / p.total
        // })
      }
    });
  } catch (error) {
    res = error;
  }
  return await res;
};
