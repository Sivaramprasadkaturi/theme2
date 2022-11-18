import React, { useState } from "react";
import { getDeliveryOptions } from "../../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { MdOutlineAddShoppingCart } from "react-icons/md";
function WishListAddToCart({ onClose, products, handleWishItemClicked }) {
  const dispatch = useDispatch();

  const handleAddToCartFromWishList = (quoteMode = false) => {
    dispatch(
      getDeliveryOptions(
        "",
        products.code,
        products.qty,
        products.id,
        "",
        quoteMode,
        onClose
      )
    );

    //   dispatch(
    //     addToCartProduct(
    //       products.id,
    //       1 || products.qty,
    //       "",
    //       "",
    //       "",
    //       quoteMode,
    //       products.vid,
    //       "",
    //       onClose
    //     )
    //   );
    // };
  };
  return (
    <MdOutlineAddShoppingCart
      style={{
        height: "30px",
        width: "30px",
        cursor: "pointer"
      }}
      onClick={e => {
        e.stopPropagation();
        if (products.hasAttributes) {
          handleWishItemClicked();
        } else {
          handleAddToCartFromWishList();
        }
      }}
    />
  );
}

export default WishListAddToCart;
