import React, { useState, useEffect, useRef } from "react";
import {
  MdFavoriteBorder,
  MdFavorite,
  MdCompareArrows,
  MdLink,
  MdMoreHoriz
} from "react-icons/md";

import styled from "styled-components";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  deleteComparedItemsDetails,
  deleteCompareItem,
  fetchComparedItemDetails,
  toggleCompareAction
} from "../../redux/actions/compareActions";
import { toggleCompare } from "../Compare";
import { toggleWishListAction } from "../../redux/actions/wishlistActions";

const HamburgerMenu = ({ item }) => {
  const baseUrl = process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK;
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const [moreActive, setMoreActive] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        closeShareModal();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  const wishlistState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  let isItemWishlisted =
    wishlistState && wishlistState.some(i => i.id == item.id);

  const [favouriteState, setFavouriteState] = useState("favorite_border");

  const toggleWish = (
    id,
    title,
    code,
    desc,
    currency_sign,
    image,
    price,
    allPrices,
    // properties,
    url,
    wishlistState
  ) => {
    // e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        title,
        code,
        desc,
        currency_sign,
        image,
        price,
        allPrices,
        // properties,
        url,
        wishlistState
      )
    );
  };

  const handleToggleWishlistIcon = (e, id) => {
    e.stopPropagation();
    let wishId = String(id);
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");

    toggleWish(
      // wishId,
      item.id,
      item.title,
      item.code,
      item.desc,
      item.currency_sign,
      process.env.NEXT_PUBLIC_IMAGEKIT + "/" + item.image,
      item.price.value.integer,
      item.allPrices,
      // item.properties,
      `/${item.url}`,
      wishlistState,
      false
    );

    closeShareModal();
  };

  const closeShareModal = () => {
    setMoreActive(false);
    setIsActive(false);
  };

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  let isItemCompared =
    compareListState && compareListState.some(i => i.id == item.id);

  const [compareIconState, setCompareIconState] = useState("");

  const handleToggleCompareListIcon = (event, itemId) => {
    event.stopPropagation();
    let compareid = String(itemId);
    isItemCompared && compareIconState === ""
      ? setCompareIconState("-outlined")
      : setCompareIconState("");

    // if item's compare checkbox is not checked
    if (!isItemCompared) {
      dispatch(fetchComparedItemDetails(compareid));
    } else {
      dispatch(deleteComparedItemsDetails(compareid));
    }

    toggleCompare(
      //event,
      compareid,
      item.title,
      item.currency_sign,
      item.image,
      item.price,
      item.url,
      compareListState,
      isItemCompared,
      dispatch,
      deleteCompareItem,
      toggleCompareAction
      // translate
    );

    closeShareModal();
  };

  const toggleClass = e => {
    e.stopPropagation();
    setIsActive(true);
    // runAfterSomeTime(() => setIsActive(false),100);
  };

  const renderTheBackDrop = () => {
    return (
      isActive && (
        <div
          onClick={event => {
            event.stopPropagation();
            setMoreActive(false);
          }}
          className="backdrop"
        ></div>
      )
    );
  };

  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(url) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(
        `${baseUrl.replace("/preview", "")}/${url}`
      );
    } else {
      return document.execCommand(
        "copy",
        true,
        `${baseUrl.replace("/preview", "")}/${url}`
      );
    }
  }

  const copyLinkToClipboard = (e, url) => {
    copyTextToClipboard(url)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <Wrapper className="relative flex items-center justify-center w-full mb-3">
      <div
        onKeyDown={e => {
          if (e.code === "Enter") {
            e.target.click();
          }
        }}
        aria-describedby="show options"
        aria-expanded={isActive}
        tabIndex={"0"}
        className="bg-gray-200 border rounded-full inner"
        onClick={toggleClass}
      >
        <MdMoreHoriz className="text-gray-800 icon " />
        {renderTheBackDrop()}
      </div>

      <div
        tabIndex={isActive ? "0" : "-1"}
        className={`focusAble bg-gray-300 flex-col ${
          isActive ? "flex" : "hidden"
        }`}
        style={{
          padding: 10,
          position: "absolute",
          width: "auto",
          minWidth: 200,
          backgroundColor: "#f7f7f7",
          top: -130,
          zIndex: 10,
          borderRadius: 3,
          border: "1px solid #eee",
          boxShadow: "0px 0px 7px rgba(0, 0, 0, 0.25)"
        }}
        ref={ref}
      >
        <div
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.target.click();
            }
          }}
          tabIndex={isActive ? "0" : "-1"}
          className="focusAble flex w-full text-gray-800 cursor-pointer hover:bg-gray-300"
          style={{
            padding: "15px 10px",
            fontSize: "12px",
            alignItems: "center"
          }}
          onClick={event => handleToggleCompareListIcon(event, item.id)}
        >
          <MdCompareArrows className="text-xl" />

          <p className="mx-2 text-xs">Compare</p>
        </div>
        <div
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.target.click();
            }
          }}
          tabIndex={isActive ? "0" : "-1"}
          className="focusAble flex w-full text-gray-800 cursor-pointer hover:bg-gray-300"
          onClick={event => handleToggleWishlistIcon(event, item.id)}
          style={{
            padding: "15px 10px",
            fontSize: "12px",
            alignItems: "center"
          }}
        >
          {wishlistState.filter(wish => wish.id === item.id).length > 0 ? (
            <MdFavorite className="text-xl" />
          ) : (
            <MdFavoriteBorder className="text-xl" />
          )}
          <p className="mx-2 text-xs">Add to wishlist</p>
        </div>
        <div
          onKeyDown={e => {
            if (e.code === "Enter") {
              e.target.click();
            }
          }}
          tabIndex={isActive ? "0" : "-1"}
          className="focusAble flex w-full text-gray-800 cursor-pointer hover:bg-gray-300"
          onClick={event => {
            copyLinkToClipboard(event, item.url);
          }}
          style={{
            padding: "15px 10px",
            fontSize: "12px",
            alignItems: "center"
          }}
        >
          <MdLink className="text-xl" />
          <p className="mx-2 text-xs w-44">
            {isCopied ? (
              <span className="text-green-600">Copied to Clipboard</span>
            ) : (
              "Copy link to clipboard"
            )}
          </p>
        </div>

        {/* <div
          className="flex w-full text-gray-800 cursor-pointer hover:bg-gray-300"
          style={{
            padding: "5px 10px",
            fontSize: "12px",
            alignItems: "center"
          }}
        >
          <RiShoppingBasket2Fill className="text-xl" />

          <p className="mx-2 text-xs">Add to basket</p>
          <input
            className="w-14"
            value={quantity}
            type="number"
            onChange={e => setQuantity(e.target.value)}
          />
          <div
            onClick={() => {
              if (
                typeof window !== "undefined" &&
                localStorage.getItem("basket") !== null &&
                JSON.parse(localStorage.getItem("basket")).length > 0
              ) {
                localStorage.setItem(
                  "basket",
                  JSON.stringify([
                    ...JSON.parse(localStorage.getItem("basket")),
                    { ...item, quantity: quantity }
                  ])
                );
                setQuantity(0);
              } else {
                localStorage.setItem(
                  "basket",
                  JSON.stringify([{ ...item, quantity: quantity }])
                );
                setQuantity(0);
              }
            }}
          >
            {" "}
            <BsPlus className="text-xl" />
          </div>
        </div> */}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin: 5px 0;
  justify-content: center;
  .inner {
    width: 30px;
    height: 30px;
    line-height: 29px;
    background: #f5f5f5;
    border-radius: 100%;
    position: relative;
    text-align: center;
    border: 1px solid #aaa;
    border-radius: 45px !important;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    .icon {
      font-size: 18px;
      color: #333;
    }
  }
  .inner:hover {
    background: #fff;
    border: 1px solid #333;
  }
`;

export default HamburgerMenu;
