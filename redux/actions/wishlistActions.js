import {
  FETCH_WISHLIST_SUCCESS,
  TOGGLE_WISHLIST_SUCCESS,
  WISHLIST_ADD_REDUX,
  WISHLIST_REMOVE_REDUX
} from "../types.js";

export const addFunctionWishList = wishlist => ({
  type: WISHLIST_ADD_REDUX,
  payload: wishlist
});

export const fetchWishListAction = wishlist => ({
  type: FETCH_WISHLIST_SUCCESS,
  payload: { wishlist: wishlist }
});

export const removeFunctionWishList = wishlist => ({
  type: WISHLIST_REMOVE_REDUX,
  payload: wishlist
});

export const toggleWishListAction = (
  id,
  title,
  code,
  desc,
  currency_sign,
  image,
  price,
  allPrices,
  url,
  wishListState,
  hasAttributes
) => {
  return dispatch => {
    id = String(id);

    if (!wishListState?.some(w => w.id == id)) {
      dispatch(
        addFunctionWishList([
          ...wishListState,
          {
            id,
            title,
            code,
            desc,
            currency_sign,
            image,
            price,
            allPrices,
            url,
            hasAttributes
          }
        ])
      );
    } else {
      let tempWishList = wishListState.filter(w => w.id != id);
      dispatch(addFunctionWishList([...tempWishList]));
    }
  };
};

export const removeWishListAction = (id, wishListState) => {
  return dispatch => {
    id = String(id);
    let wishListTemp = wishListState || [];
    if (wishListState.length > 0 && wishListTemp.some(w => w.id == id)) {
      let tempWishList = wishListTemp.filter(w => w.id != id);
      console.log("tempWishList", tempWishList);
      // localStorage.setItem("wishList", JSON.stringify(tempWishList));
      dispatch(removeFunctionWishList([...tempWishList]));
    }
  };
};
