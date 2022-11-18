import {
  GET_ITEM_FETCH_REQUEST,
  GET_ITEM_FETCH_SUCCESS,
  GET_ITEM_FETCH_FAILURE,
  UPDATE_PRICE_INVENTORY,
  SUPPLIER_INFO_SUCCESS,
  ADD_TO_CART_SUCCESS,
  ADD_TO_CART_MODAL_CLOSE,
  CHANGE_PRODUCT_ATTRIBUTES,
  CHANGE_TITLE_AND_LONGDESC,
  SHOW_CONTINUE_MODAL,
  UNMOUNT_PRODUCT_PAGE,
  SET_REVIEW_MODAL_STATE,
  REQUEST_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS,
  FAILURE_MAIN_PRODUCT_SKUS_N_SKUIDS,
  SET_ATTRIBUTES_DETAILS,
  SET_CART_VALIDATION_ERR,
  POPULATE_ACCESSORY_MODAL,
  CLOSE_ACCESSORY_MODAL,
  GET_MODAL_ITEM_FETCH_SUCCESS,
  UPDATE_PRODUCT_STOCK_INFO,
  LOGOUT_SUCCESS,
  CHANGE_CUSTOMER_ID,
  UPDATE_ACCESSORY_INVENTORY,
  CHECKBOX_ITEM_SELECTED
} from "../types/product";
import {addToCartActions, confirmActions, SET_PRODUCT_OUT_OF_STOCK_ERR, SET_REQUESTING_ADD_TO_CART} from "../types";

const initialState = {
  itemDetail: {
    code: ""
  },
  priceInventory: {},
  loading: false,
  product: {
    title: "",
    price: { integer: "", decimal: "" },
    image: "",
    currency_sign: "",
    url: "",
    id: ""
  },
  noproduct: false,
  supplierInfo: {},
  requestingAddToCart: false,
  addToCartSuccess: false,
  addToCartMode: "",
  selectedProductAttributes: {},
  productInitial: {
    title: "",
    longDesc: "",
    properties: []
  },
  reviewsModalOpen: false,
  frequentlyBoughtTogether: [],
  accessories: [],
  alsoLike: [],
  accessoryModal: {
    status: false,
    loading: true,
    title: "",
    imageUrl: "",
    price: "",
    details: { longdesc: "", code: "" }
  },
  checkboxItemSelected: false,
  stockInfo: {}
};

const copyInitialState = { ...initialState };

const setPrice = price => {
  return { integer: price.integer, decimal: price.decimal };
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PRODUCT_STOCK_INFO:
      return {
        ...state,
        stockInfo: payload
      };
    case POPULATE_ACCESSORY_MODAL:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          status: true,
          title: payload.title,
          imageUrl: payload.imageUrl,
          price: payload.price
        }
      };
    case CLOSE_ACCESSORY_MODAL:
      return {
        ...state,
        accessoryModal: {
          status: false,
          loading: true,
          title: "",
          imageUrl: "",
          price: "",
          details: { longdesc: "", code: "" }
        }
      };
    case UNMOUNT_PRODUCT_PAGE:
      return {
        ...copyInitialState
      };
    case CHANGE_TITLE_AND_LONGDESC:
      return {
        ...state,
        productInitial: payload,
        frequentlyBoughtTogether: [...payload.frequentlyBoughtTogether],
        accessories: [...payload.accessories],
        alsoLike: [...payload.alsoLike]
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        productInitial: { ...state.productInitial, customerid: "" }
      };

    case CHANGE_CUSTOMER_ID: {
      return {
        ...state,
        productInitial: { ...state.productInitial, customerid: payload }
      };
    }
    case ADD_TO_CART_MODAL_CLOSE:
      return {
        ...state,
        addToCartSuccess: false
      };
    case SHOW_CONTINUE_MODAL:
      return {
        ...state,
        addToCartSuccess: true
      };
    case addToCartActions.REQUEST_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: true
      };
    case confirmActions.CONFIRM_NO: {
      return {
        ...state,
        requestingAddToCart: false
      };
    }
    case addToCartActions.SUCCESS_ADD_TO_CART:
      return {
        ...state,
        addToCartMode: payload,
        requestingAddToCart: false
      };
    case addToCartActions.FAILURE_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: false
      };
    case SET_REQUESTING_ADD_TO_CART:
      return {
        ...state,
        requestingAddToCart: payload
      };
    case ADD_TO_CART_SUCCESS:
      return {
        ...state,
        addToCartMode: payload
      };

    case GET_ITEM_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
        noproduct: false,
        addToCartSuccess: false
      };
    case GET_MODAL_ITEM_FETCH_SUCCESS:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          loading: false,
          details: payload.json
        }
      };
    case GET_ITEM_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        itemDetail: {
          ...payload,
          mainProductSkus: state.itemDetail.mainProductSkus
            ? [...state.itemDetail.mainProductSkus]
            : null,
          mainProductSkuIds: state.itemDetail.mainProductSkuIds
            ? [...state.itemDetail.mainProductSkuIds]
            : null,
          attributeDetails: state.itemDetail.attributeDetails
            ? [...state.itemDetail.attributeDetails]
            : null
        },
        noproduct: false,
        addToCartSuccess: false
      };

    case GET_ITEM_FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
        noproduct: true,
        addToCartSuccess: false
      };
    case UPDATE_ACCESSORY_INVENTORY:
      return {
        ...state,
        accessoryModal: {
          ...state.accessoryModal,
          priceInv: payload
        }
      };
    case UPDATE_PRICE_INVENTORY:
      return {
        ...state,
        priceInventory: payload
      };
    case SUPPLIER_INFO_SUCCESS:
      return {
        ...state,
        supplierInfo: payload
      };
    case CHANGE_PRODUCT_ATTRIBUTES:
      return {
        ...state,
        selectedProductAttributes: payload
      };
    case SET_ATTRIBUTES_DETAILS:
      return {
        ...state,
        itemDetail: { ...state.itemDetail, attributeDetails: [...payload] }
      };
    case SET_CART_VALIDATION_ERR:
      return {
        ...state,
        itemDetail: {
          ...state.itemDetail,
          cartValidationErrors: [...payload]
        }
      };
    case SET_PRODUCT_OUT_OF_STOCK_ERR:
      return {
        ...state,
        itemDetail: {
          ...state.itemDetail,
          productOutOfStockError: payload
        }
      };
    case SET_REVIEW_MODAL_STATE:
      return {
        ...state,
        reviewsModalOpen: payload
      };
    case SUCECSS_MAIN_PRODUCT_SKUS_N_SKUIDS:
      return {
        ...state,
        itemDetail: { ...state.itemDetail, ...payload }
      };
    case CHECKBOX_ITEM_SELECTED:
      return {
        ...state,
        checkboxItemSelected: !state.checkboxItemSelected
      };
    default:
      return state;
  }
};

export default productReducer;
