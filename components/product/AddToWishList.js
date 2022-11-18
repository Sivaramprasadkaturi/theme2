import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector, shallowEqual } from "react-redux";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { toggleWishListAction } from "../../redux/actions/wishlistActions";
import styled from "styled-components";
import { useRouter } from "next/router";

const AddToWishList = ({ product, price, family, brand }) => {
  const dispatch = useDispatch();
  const [favouriteState, setFavouriteState] = useState("favorite_border");
  const itemDetail = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const router = useRouter();

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const productPrice = useSelector(
    state => state.productReducer.priceInventory
  );

  let isItemWishlisted =
    wishListState.length > 0
      ? wishListState.some(w => w.id == itemDetail.itemId)
      : false;

  const toggleWish = e => {
    e.preventDefault();

    dispatch(
      toggleWishListAction(
        product.itemid,
        product.title,
        product.shortdesc,
        (product.currency_sign = "$"),
        (product.image = `https://s3.ca-central-1.amazonaws.com/sls3.avetti.ca/${product.cimage}`),
        price,
        { family, brand },
        router.asPath,
        wishListState,
        false
      )
    );
  };

  const handleToggleWishlistIcon = e => {
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");
    toggleWish(e);
  };

  return (
    <Wrapper onClick={event => handleToggleWishlistIcon(event, itemDetail.id)}>
      {wishListState.filter(w => w.id == product.itemid).length > 0 ? (
        <p>Remove from wishlist</p>
      ) : (
        <p style={{ color: "#2AA841" }}>Add to wishlist</p>
      )}
      <div>
        {wishListState.filter(w => w.id == product.itemid).length > 0 ? (
          <MdFavorite
            style={{
              color: "#fe4f00",
              fontSize: "1.1rem",

              zIndex: 99
            }}
          />
        ) : (
          <MdFavoriteBorder
            style={{
              color: "#fe4f00",
              fontSize: "1.1rem",

              zIndex: 99
            }}
          />
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 30px auto;
  color: #333;
  align-items: center;
  cursor: pointer;

  p {
    margin-right: 10px;
    text-decoration: underline;
  }

  p:hover {
    color: #fe4f00;
  }
`;

export default AddToWishList;
