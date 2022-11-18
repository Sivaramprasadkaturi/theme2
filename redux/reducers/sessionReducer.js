import {
  FETCH_BASKET_SUCCESS,
  SHOW_CONTINUE_MODAL,
  SHOW_CONTINUE_MODAL_QUOTE,
  SET_BASKET_LOADING_AFTER_UPDATE,
  SET_SUPPLIER_BASKET
} from "../types.js";

const initialState = {
  basket: {
    itemsCount: 0,
    products: [],
    quoteproducts: [],
    totalPriceProducts: 0,
    totalPriceQuoteProducts: 0
  },
  suppliersBasket: {},
  basketLoading: false
};

const setTotal = products => {
  let totalPrice = 0;
  products.map(({ price, qty }) => {
    totalPrice += price * qty;
  });
  return totalPrice;
};

const menuReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    /*   case SHOW_CONTINUE_MODAL_QUOTE:
      return {
        ...state,
        itemsCount: state.basket.itemsCount + payload.qty,
        quoteproducts: [
          ...state.basket.quoteproducts,
          {
            distName: payload.supplier,
            price: payload.price,
            title: payload.title,
            qty: payload.qty
          }
        ],
        totalPriceQuoteProducts: setTotal([
          ...state.basket.quoteproducts,
          {
            price: payload.price,
            qty: payload.qty
          }
        ])
      };
    case SHOW_CONTINUE_MODAL:
      return {
        ...state,
        basket: {
          ...state.basket,
          itemsCount: state.basket.itemsCount + payload.qty,
          products: [
            ...state.basket.products,
            {
              distName: payload.supplier,
              price: payload.price,
              title: payload.title,
              qty: payload.qty
            }
          ],
          totalPriceProducts: setTotal([
            ...state.basket.products,
            {
              price: payload.price,
              qty: payload.qty
            }
          ])
        }
      }; */
    case SET_BASKET_LOADING_AFTER_UPDATE:
      return {
        ...state,
        basketLoading: payload
      };
    case FETCH_BASKET_SUCCESS:
      return {
        ...state,
        basket: {
          ...state.basket,
          itemsCount: payload.products.length + payload.quoteproducts.length,
          products: payload.products,
          quoteproducts: payload.quoteproducts,
          totalPriceProducts: setTotal(payload.products),
          totalPriceQuoteProducts: setTotal(payload.quoteproducts)
        }
      };
    case SET_SUPPLIER_BASKET:
      return {
        ...state,
        selectedBasket: payload
      };
    default:
      return state;
  }
};

export default menuReducer;
