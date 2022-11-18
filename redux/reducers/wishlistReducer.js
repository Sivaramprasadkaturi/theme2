import {
  FETCH_WISHLIST_SUCCESS,
  WISHLIST_ADD_REDUX,
  WISHLIST_REMOVE_REDUX
} from "../types.js";

const initialState = {
  wishlist: []
};

const wishListReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case WISHLIST_ADD_REDUX:
      return {
        ...state,
        wishlist: payload
      };
    case FETCH_WISHLIST_SUCCESS:
      return {
        ...state,
        wishlist: { ...state.wishlist }
      };
    case WISHLIST_REMOVE_REDUX:
      return {
        ...state,
        wishlist: payload
      };
    default:
      return state;
  }
};

export default wishListReducer;
