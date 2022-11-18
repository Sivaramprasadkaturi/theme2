import React, { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
// import HamburgerMenu from "../category/HamburgerMenu";
import { shallowEqual, useSelector } from "react-redux";
import { MdFavorite } from "react-icons/md";
import Image from "next/image";
import htmldecoder from "../../utils/htmlDecoder";
import { useTranslation } from "next-i18next";
import translate from "../../utils/Translate";
// import { useDispatch } from "react-redux";
// import {fetchComparedItemDetails, toggleCompareAction, deleteCompareItem} from "../../redux/actions/compareActions";
// import {toggleCompare} from "../Compare"
const ItemCard = ({
  item,
  hasBorder = true,
  relatedItem = false,
  relatedItemProp,
  menu
}) => {
  const { t } = useTranslation("currency-formatting");

  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);




  // const compareListState = useSelector(
  //   state => state.compareListReducer.compareList,
  //   shallowEqual
  // );



  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const baseUrl = process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK;
  console.log(
    "item3",
    item,
    `${process.env.NEXT_PUBLIC_IMAGEKIT}/${
      item.itemLargeImage || item.cimage
    }?tr=dpr-1,pr-true,w-200,q-70`
  );

// compare
  // const dispatch = useDispatch();
// compare
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  const [isCopied, setIsCopied] = useState(false);


  useEffect(() => {
    if (item?.price?.value?.integer) {
      const integer = Number(item.price.value.integer.replace(/[,.]/g, ""));
      const decimal = Number(item.price.value?.decimal);
      const price = integer + decimal / 100;
      setPrice(price);
    } else {
      setPrice(null);
    }
  }, [item]);

  useEffect(() => {
    if (item && item.price) {
      // setDiscountPrice(item.price.value.integer);
    }
  }, [item]);

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  // console.log("price33", discountPrice, price, item.price, item.price.value);
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


  // compare
  // let isItemCompared =
  //   compareListState && compareListState.some(i => i.id == item.id);

  // const [compareIconState, setCompareIconState] = useState("");


  // const handleToggleCompareListIcon = (event, itemId) => {
  //   event.stopPropagation();
  //   let compareid = String(itemId);
  //   isItemCompared && compareIconState === ""
  //     ? setCompareIconState("-outlined")
  //     : setCompareIconState("");

  //   if (!isItemCompared) {
  //     dispatch(fetchComparedItemDetails(compareid));
  //   } else {
  //     dispatch(deleteComparedItemsDetails(compareid));
  //   }

    // toggleCompare(
    //   compareid,
    //   item.title,
    //   item.currency_sign,
    //   item.image,
    //   item.price,
    //   item.url,
    //   compareListState,
    //   isItemCompared,
    //   dispatch,
    //   deleteCompareItem,
    //   toggleCompareAction
    // );

  //   closeShareModal();
  // };



  return (
  <>
    <Wrapper className="wishlistHoverall">
      <div
        className="item"
        style={{
          borderBottom: hasBorder ? "1px solid rgb(221, 221, 221)" : "none",
          paddingBottom: hasBorder ? "20px" : "0",
          height: relatedItem ? "100% " : "none"
        }}   
      >
        <div className="itemBrandName">
          <div className="itemBrandSupliern">{item.properties.SupplierName ||
                  item.properties.Supplier_Code ||
                  relatedItemProp?.SupplierName ||
                  relatedItemProp?.Supplier_Code}</div>
          <div className="itemBrandDiscount">
          {/* <div className="discountFigure">15% off</div> */}
          <div>
            <button className="discountFigure">15% off</button>
          </div>
          <div>
          <img
          
                  src={`https://ik.imagekit.io/ofb/themes/Group_129_eXeZ3ZJnI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666063197242`}
                  // alt={desc}
                  className="image110 shareicon-items"
                  // onClick={event => handleToggleCompareListIcon(event, item.id)}
                />

          </div>
          </div>
        </div>
        {/* {isCopied ? (
              <span className="text-green-600">Copied to Clipboard</span>
            ) : (
              "Copy link to clipboard"
            )} */}

        <div className="wishlistHoverall">
          {wishListState.filter(w => w.id == item.id).length > 0 ? (
            <MdFavorite
              style={{
                color: "#fe4f00",
                fontSize: "1.5rem",
                position: "absolute",
                // marginRight:"1200px",
                margin: "10px",
                zIndex: 1
              }}
            />
          ) : null}
          {/* <Link href={`${baseUrl.replace("/preview", "")}/${item.url}`}> */}
          <Link href={`/${item.url}`} prefetch={false}>
            <a tabIndex={"-1"} className="image-link">
              <Image
                src={
                  relatedItem
                    ? `${item.image}?tr=dpr-1,pr-true,w-200,q-70`
                    : `${process.env.NEXT_PUBLIC_IMAGEKIT}/${item.itemLargeImage}?tr=dpr-1,pr-true,w-200,q-70`
                }
                className="cardProductsImg"
                width={200}
                height={200}
                alt={item.title}
                loading="lazy"
                layout="intrinsic"
                placeholder="blur"
                blurDataURL={
                  relatedItem
                    ? `${item.image}?tr=dpr-1,pr-true,w-200,q-70`
                    : `${process.env.NEXT_PUBLIC_IMAGEKIT}/${item.itemLargeImage}?tr=dpr-1,pr-true,w-50,q-4`
                }
              />
            </a>
          </Link>
          {/* {!relatedItem && <HamburgerMenu item={item} />} */}
          <Link href={`/${item.url}`} prefetch={false}>
            <a
              className="item-detail"
              style={{
                paddingTop: relatedItem ? "10px" : "0"
              }}
            >
              {/* <div style={{width: "max-content"}} className> */}
              <p className="itemFamily">{item.title && item.title.length>32
              ? item.title.substring(0, 32) + '...'
              : item.title}</p>
              {/* <p className="itemFamily">{item.title}</p> */}

              <p className="itemBrand itemBrandBy">
                {translate({
                  translationFileName: "translation",
                  translateKey: "text.by"
                })}
                {item.properties.facet_Brand}
              </p>
              {/* <span className="itemTitle">
                {item.properties.SupplierName ||
                  item.properties.Supplier_Code ||
                  relatedItemProp?.SupplierName ||
                  relatedItemProp?.Supplier_Code}
              </span> */}
              {!relatedItem && (
                <div className="itemPrice">
                  {discountPrice && discountPrice !== price ? (
                    <div className="discounted-price" key="discountedPrice">
                      <span style={{ textDecoration: "line-through" }}>
                        {price
                          ? `${t("currency", {
                              val: price,
                              style: "currency",
                              currency: "EUR"
                            }).replace(/[\,\.]00/, "")}`
                          : null}
                      </span>
                      <span style={{ marginLeft: "10px" }}>
                        ${discountPrice}
                      </span>
                    </div>
                  ) : (
                    <div className="price" key="regularPrice">
                      {t("currency", {
                        val: price,
                        style: "currency",
                        currency: currencyState,
                        locale: langState
                      }).replace(/[\,\.]00/, "")}
                    </div>
                  )}
                </div>
              )}
            </a>
          </Link>

          <div className="star-rating">
                <input type="radio" id="5-stars" name="rating" value="5" />
                <label htmlFor="5-stars" className="star1">
                  &#9733;
                </label>
                <input type="radio" id="4-stars" name="rating" value="4" />
                <label htmlFor="4-stars" className="star1">
                  &#9733;
                </label>
                <input type="radio" id="3-stars" name="rating" value="3" />
                <label htmlFor="3-stars" className="star1">
                  &#9733;
                </label>
                <input type="radio" id="2-stars" name="rating" value="2" />
                <label htmlFor="2-stars" className="star1">
                  &#9733;
                </label>
                <input type="radio" id="1-star" name="rating" value="1" />
                <label htmlFor="1-star" className="star1">
                  &#9733;
                </label>
              </div>

              <div className="addToCartProducts">
                <div className="wishlist_iconss">
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950`}
                    // alt={desc}
                    className="wishlistIicons"
                  />
                </div>
                <div className="">
                  <button className="button-add1">Add to Cart</button>
                </div>
              </div>

          {/*<div className="share-wrapper">*/}
          {/*  <div className="icon-container">*/}
          {/*    <HiOutlineDotsHorizontal className="icon" />*/}
          {/*  </div>*/}
          {/*</div>*/}
          {/*<div className="product-info">*/}
          {/*  /!*<div className="title">{item.properties.temp_Family}</div>*!/*/}
          {/*  /!*<p className="brand">by {item.properties.facet_Brand}</p>*!/*/}
          {/*  <span className="code">{item.title}</span>*/}
          {/*  <div className="price">*/}
          {/*    /!*${item.price.value.integer}.{item.price.value.decimal}*!/*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  margin-bottom: 20px;
  width: 100%;
  box-shadow: 0 0 5px #cdcdcd;
  //border-radius: 25px;

  .item-detail {
    margin: 0 10px;
  }

  .image-link {
    height: 200px;
  }

  .image-link span {
    height: 100% !important;
    width: 100% !important;
  }
  .image-link img {
    object-fit: cover !important;
  }
  .item {
    height: 420px;
    position: relative;
    box-shadow: 0 0 1px #cdcdcd;
  }

  .item:hover {
    box-shadow: 0px 0px 2px 0px rgba(54, 54, 54, 0.2),
      0 2px 2px 0px rgba(54, 54, 54, 0.2), 0px 0px 10px 2px #c8c8c8;
  }

  img {
    width: 100%;
  }

  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      text-align: center;
    }
  }

  .infinite-scroll-component {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    width: 100%;
    margin-top: 30px;
  }

  .itemFamily {
    
    font-size: 15px !important;
    color: #37455E !important;
    height: 25px;
    margin-top: 25px;
  }

  .itemBrand {
    font-size: 12px;
    margin-bottom: 0.6rem;
    margin-top: 0.6rem;
    font-style: italic;
    color: rgb(102, 102, 102);
  }

  .itemTitle {
    display: block;
    font-size: 12px;
    color: rgb(102, 102, 102);
  }

  .itemPrice {
    font-size: 16px !important;
    text-align: left !important;
    font-weight: 400 !important;
    float: left !important;
    // margin-top: 10px;
    width: 100% !important;
    justify-content: center;
    
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;
    color: #a20202;
  }

  @media only screen and (max-width: 768px) {
    .itemFamily {
      font-size: 26px;
    }

    .infinite-scroll-component {
      grid-template-columns: repeat(2, 1fr);

      .item {
        width: 100%;
      }
    }
  }

  .wishlistIicons{
    width: 80%;
    margin-top: 5px;
  }
  
`;

export default ItemCard;
