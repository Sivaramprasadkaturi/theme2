import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  addFunctionWishList,
  toggleWishListAction
} from "../../redux/actions/wishlistActions";
import { MdClose } from "react-icons/md";
import Link from "next/link";

const WishList = ({ showWishList, setWishlist, onClose }) => {
  const dispatch = useDispatch();
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const productPrice = useSelector(
    state => state.productReducer.priceInventory
  );

  const toggleWish = (
    id,
    title,
    desc,
    currency_sign,
    image,
    price,
    properties,
    url
  ) => {
    // e.preventDefault();
    dispatch(
      toggleWishListAction(
        // e,
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        properties,
        url,
        wishListState
      )
    );
  };

  useEffect(() => {
    let storedWishListString = localStorage.getItem("wishList");
    let storedWishListObject = JSON.parse(storedWishListString);
    if (storedWishListObject != null)
      dispatch(addFunctionWishList([...storedWishListObject]));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListState));
  }, [wishListState]);

  return (
    <Modal
      className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center w-full h-full"
      style={{ backgroundColor: "rgba(0,0,0,.3)" }}
    >
      <div
        className="wishModal relative z-20 w-10/12 p-5 overflow-auto bg-white "
        style={{
          maxHeight: "90vh",
          boxShadow: "0 0 4px 1px rgb(0 0 0 / 30%)"
        }}
      >
        <div className="flex justify-space-between items-center">
          <div className="modalTitle">My Wishlist</div>
          <div className="flex justify-end w-full" onClick={onClose}>
            <MdClose
              style={{ float: "right", fontSize: "1.5em", cursor: "pointer" }}
            />
          </div>
        </div>
        <Wrapper>
          {wishListState.length > 0 ? (
            wishListState.map(item => (
              <div
                className="p-6 my-3 overflow-hidden border wishlist-container"
                key={item.id}
              >
                <span className="product">PRODUCT</span>
                <span className="details">DETAILS</span>
                <span className="price">PRICE</span>
                {/*<h1*/}
                {/*  className="cursor-pointer fas"*/}
                {/*  onClick={() => {*/}
                {/*    setWishlist(wishListState.filter(wish => wish.id !== item.id));*/}
                {/*  }}*/}
                {/*>*/}
                {/*  X*/}
                {/*</h1>*/}
                <div className="product-image">
                  <Link href={`/${item.url}`}>
                    <a onClick={onClose}>
                      <img
                        src={item?.image?.replace(
                          "https://s3.ca-central-1.amazonaws.com/sls3.avetti.ca",
                          process.env.NEXT_PUBLIC_IMAGEKIT
                        )}
                        width={100}
                        alt={item.title}
                      />{" "}
                    </a>
                  </Link>
                </div>
                <div className="product-details">
                  {item.properties.temp_Family ? (
                    <p className="productName">{item.properties.temp_Family}</p>
                  ) : (
                    <p className="productName">
                      {item.properties.family.propvalue}
                    </p>
                  )}
                  <p className="productDescription">{item.desc} </p>
                  {item.properties?.facet_Brand ? (
                    <p className="productDealer">
                      by {item.properties?.facet_Brand}
                    </p>
                  ) : (
                    <p className="productDealer">
                      by {item.properties?.brand.propvalue}
                    </p>
                  )}
                  <div className="product-price-mobile">
                    <span>{item.currency_sign} </span>
                    <span> {item.price?.value?.integer}.</span>
                    <span> {item.price?.value?.decimal}</span>
                  </div>
                </div>
                <div className="product-price">
                  <span>{item.currency_sign} </span>
                  <span> {item.price?.value?.integer}.</span>
                  <span> {item.price?.value?.decimal}</span>
                </div>
                <div className="remove-button">
                  <h1
                    className="cursor-pointer remove"
                    onClick={e => {
                      toggleWish(
                        item.id,
                        item.title,
                        item.desc,
                        item.currency_sign,
                        item.image,
                        item.price,
                        item.properties,
                        item.url,
                        wishListState,
                        false
                      );
                      setWishlist(
                        wishListState.filter(wish => wish.id !== item.id)
                      );
                      localStorage.setItem(
                        "wishList",
                        JSON.stringify([
                          ...JSON.parse(
                            localStorage.getItem("wishList")
                          ).filter(w => w.id !== item.id)
                        ])
                      );
                    }}
                  >
                    Remove
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <div style={{ height: "200px" }}>
              <h1
                style={{
                  color: "#10601f",
                  textAlign: "center",
                  fontSize: "1.5em",
                  fontWeight: "600"
                }}
              >
                No item in the wishlist
              </h1>
            </div>
          )}
        </Wrapper>
      </div>
    </Modal>
  );
};

const Modal = styled.div`
  .modalTitle {
    width: 50%;
    font-weight: 500;
    text-transform: uppercase;
  }

  @media only screen and (max-width: 768px) {
    .wishModal {
      width: 100%;
      height: 100%;
      max-height: 100vh !important;
    }
  }
`;

const Wrapper = styled.div`
  .wishlist-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;
    margin: 0 auto;
    margin-top: 20px;
  }

  .product {
    /* place this div in first row and first column */
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    display: flex;
    color: green;
    justify-content: center;
  }

  .details {
    /* place this div in first row and second column */
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    display: flex;
    color: green;
  }

  .price {
    /* place this div in first row and third column */
    grid-row: 1 / 2;
    grid-column: 3 / 4;
    display: flex;
    color: green;
    justify-content: center;
  }

  .fas {
    /* place this div in first row and fourth column */
    grid-row: 1 / 2;
    grid-column: 4 / 5;
    display: flex;
    justify-content: flex-end;
    font-size: 30px;
  }

  .product-image {
    /* place this div in second row and first column */
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    display: flex;
    justify-content: center;
  }

  .product-details {
    /* place this div in second row and second column */
    grid-row: 2 / 3;
    grid-column: 2 / 3;
    display: flex;
    flex-direction: column;
    /* space items about 5px apart */
    justify-content: flex-start;

    p {
      margin: 4px;
    }

    .productName {
      display: block;
      font-size: 15px;
      font-weight: 500;
      color: #333;
    }

    .productDescription {
      font-size: 10px;
      color: #333;
    }

    .productDealer {
      font-size: 12px;
      font-style: italic;
      text-decoration: underline;
      color: #333;
    }

    .productDetail {
      font-size: 10px;
    }
  }

  .product-price {
    /* place this div in second row and third column */
    grid-row: 2 / 3;
    grid-column: 3 / 4;
    display: flex;
    color: #fe4f00;
    justify-content: center;
  }

  .product-price-mobile {
    display: none;
  }

  .remove-button {
    /* place this div in second row and fourth column */
    grid-row: 2 / 3;
    grid-column: 4 / 5;
    display: flex;
    /* make font underlined */
    text-decoration: underline;
    font-size: 12px;
  }

  @media only screen and (max-width: 768px) {
    .product,
    .details,
    .price {
      display: none;
    }

    .wishlist-container {
      padding: 0;
      border: none;
      grid-template-columns: auto;
    }

    .product-price-mobile {
      display: block;
      margin-top: 10px;
      color: #fe4f00;
    }

    .product-price {
      display: none;
    }
  }
`;

export default WishList;
