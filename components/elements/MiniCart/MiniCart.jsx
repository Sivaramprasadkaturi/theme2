import React, { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
// import useWindowDimensions from "../../functions/useWindowDimensions";
import { PREVIEW, PROJECT_LINK, VID } from "../../../project-config";
// import { I18nContext } from "../../i18n";

import { handleDeleteProductFromBasket } from "./handleDeleteProductFromBasket";
import LinearLoading from "../LinearLoading/LinearLoading";
import { useRouter } from "next/router";
import classes from "./MiniCart.module.css";
import { CurrenyFormatCad } from "../../../utils/functions";
import { FETCH_BASKET } from "../../../redux/types";
import { MdClose, MdDelete, MdOutlineDeleteForever } from "react-icons/md";
import Translate from "../../../utils/Translate";

export default function MiniCart({ close }) {
  const dispatch = useDispatch();
  // const { translate, currency, priceConvert, langCode } =
  //   useContext(I18nContext);
  const router = useRouter();
  console.log("router", router);
  // const { height, width } = useWindowDimensions();
  const [isLocal, setisLocal] = useState("");

  const [quotesExpanded, setQuotesExpanded] = useState(true);

  const basketLoadingState = useSelector(
    state => state.sessionReducer.basketLoading,
    shallowEqual
  );

  const suppliersBasketState = useSelector(
    state => state.sessionReducer.suppliersBasket,
    shallowEqual
  );

  console.log("suppliersBasketState", suppliersBasketState);

  const mainSuppliersBasket = useSelector(
    state => state.sessionReducer.basket,
    shallowEqual
  );
  console.log("main suppliersBasketState", mainSuppliersBasket);

  const basketQuoteProductsState = useSelector(
    state => state.sessionReducer.basket.quoteproducts,
    shallowEqual
  );
  const totalPriceProductsState = useSelector(
    state => state.sessionReducer.basket.totalPriceProducts,
    shallowEqual
  );

  const totalPriceQuoteProductsState = useSelector(
    state => state.sessionReducer.basket.totalPriceQuoteProducts,
    shallowEqual
  );

  const languageState = useSelector(
    state => state.mainReducer.lang,
    shallowEqual
  );

  const isBrowser = typeof window !== "undefined";

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  useEffect(() => {
    if (isBrowser) {
      let languageParam =
        languageState == "en" ? `&ml=${languageState}` : `&iu=${languageState}`;

      setisLocal(`${PROJECT_LINK}/basket.html?vid=${VID}${languageParam}`);

      dispatch({ type: FETCH_BASKET });
    }
  }, []);

  const getUrlToCheckBoxOfTheSupplier = vid => {
    let languageParam =
      languageState == "en" ? `&ml=${languageState}` : `&iu=${languageState}`;
    return `${PROJECT_LINK}/basket.html?vid=${vid}${languageParam}`;
  };

  const handleDeleteItemFromBasket = (event, vid, id, dispatch) => {
    event.stopPropagation();
    handleDeleteProductFromBasket(suppliersBasketState[vid], vid, id, dispatch);
  };

  const handleEditIconClicked = (event, quoteBasket, vendorid = null) => {
    event.stopPropagation();
    let urlToBasket = isLocal;

    if (vendorid) {
      urlToBasket = getUrlToCheckBoxOfTheSupplier(vendorid);
    }

    if (basketQuoteProductsState.length > 0) {
      window.open(
        urlToBasket + quoteBasket ? "&groupmode=quote" : "&groupmode=checkout",
        "_blank"
      );
    } else {
      if (typeof window !== "undefined") window.location.replace(urlToBasket);
    }
  };

  const renderProductImage = (itemCode, title) => {
    return (
      <div className={classes.productImageWrapper}>
        <img
          className={classes.productImage}
          src={`https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${itemCode}.jpg?tr=w-100,h-100,dpr-1,pr-true,f-auto`}
          alt={`${title}`}
        />
      </div>
    );
  };

  const renderMainSupplierBasket = () => {
    if (
      mainSuppliersBasket &&
      mainSuppliersBasket.products &&
      mainSuppliersBasket.products.length > 0
    ) {
      const handleCheckoutBtnClicked = () => {
        trackCheckOutItems(suppliersBasketState);
        identifyUser();
        const win = window.open(isLocal + "&groupmode=checkout", "_blank");
        win.focus();
      };

      return (
        <>
          <ul className={classes.cartItems} onClick={e => e.stopPropagation()}>
            <div className={classes.supplierWrapper}>
              <h1 className={classes.itemDistName}>
                B2C - Starter Marketplace
              </h1>
              {mainSuppliersBasket.products.map(
                (
                  {
                    id,
                    imageurl,
                    title,
                    price,
                    qty,
                    distName,
                    itemid,
                    itemcode,
                    vendorid
                  },
                  index
                ) => {
                  return (
                    <li className={classes.itemWrapper} key={itemid}>
                      <span
                        className={classes.itemDelete}
                        style={{ float: "right" }}
                        onClick={e => {
                          e.stopPropagation();
                          handleDeleteProductFromBasket(
                            mainSuppliersBasket,
                            vendorid,
                            id,
                            dispatch
                          );
                          console.log("delete clicked");
                        }}
                      >
                        <MdOutlineDeleteForever className="mb-2" />
                      </span>
                      {renderProductImage(itemcode, title)}
                      <p className={classes.itemDistName}>{distName}</p>
                      <p>{title.replace("&quot;", '"')}</p>
                      <div className={classes.price}>
                        <p className="currency-p">
                          <b style={{ float: "right" }}>{qty}</b>
                          <b>{CurrenyFormatCad(price)}</b>
                        </p>
                      </div>
                    </li>
                  );
                }
              )}
              <div className={classes.supplierTotal}>
                <p>
                  <b>
                    Total
                    <span>
                      {CurrenyFormatCad(mainSuppliersBasket.totalPriceProducts)}
                    </span>
                  </b>
                </p>
                <div className={classes.checkoutBtnWrapper}>
                  <span
                    onClick={() => handleCheckoutBtnClicked()}
                    className={classes.checkoutBtn}
                  >
                    Checkout
                  </span>
                </div>
              </div>
            </div>
          </ul>
        </>
      );
    }
  };

  const renderSuppliersProducts = keyVid => {
    let totalPriceForTheSupplier = suppliersBasketState[keyVid].products.reduce(
      (a, { price, qty }) => {
        a += price * qty;
        return a;
      },
      0
    );

    const handleSupplierCheckOutBtnClicked = () => {
      trackCheckOutItems(suppliersBasketState);
      identifyUser();
      const win = window.open(
        getUrlToCheckBoxOfTheSupplier(keyVid) + "&groupmode=checkout",
        "_blank"
      );
      win.focus();
    };

    const handleAttributeTextRender = attributes => {
      let attributeText = "";
      if (attributes && attributes.length > 0) {
        attributeText = "-";
        attributeText += attributes.reduce((a, c) => {
          a += ` ${c.ddText}`;
          return a;
        }, "");
      }
      return attributeText;
    };

    return (
      <>
        {suppliersBasketState[keyVid].products.map(
          ({
            imageurl,
            title,
            price,
            qty,
            distName,
            vendorid,
            itemid,
            itemcode,
            attributes,
            id
          }) => {
            return (
              <li key={itemid}>
                {renderProductImage(itemcode, title)}
                <div className="mini-cart-icon-title-wrapper">
                  <p>
                    {title.replace("&quot;", '"')}{" "}
                    <span className="minit-cart-attribute">
                      {handleAttributeTextRender(attributes)}
                    </span>
                  </p>
                  <i
                    title="Remove"
                    style={{ float: "right" }}
                    onClick={event =>
                      handleDeleteItemFromBasket(event, vendorid, id, dispatch)
                    }
                    className={`material-icons-outlined minicart-item-edit-icon${
                      isMobileState ? " mobile" : ""
                    }`}
                  >
                    <MdDelete />
                  </i>
                </div>
                <div className={classes.price}>
                  <p className="currency-p">
                    <b style={{ float: "right" }}>{qty}</b>

                    <b>{price}</b>
                  </p>
                </div>
              </li>
            );
          }
        )}
        <div className={classes.supplierTotal}>
          <p>
            <b>
              Total
              <span>$ {totalPriceForTheSupplier}</span>
            </b>
          </p>
          <div className={classes.checkoutBtnWrapper}>
            <span
              onClick={() => handleSupplierCheckOutBtnClicked()}
              className={classes.checkoutBtn}
            >
              Checkout
            </span>
          </div>
        </div>
      </>
    );
  };

  const renderQuoteRequests = () => {
    if (basketQuoteProductsState.length > 0) {
      return (
        <>
          <div
            style={{
              backgroundColor: "#000000",
              color: "white",
              cursor: "pointer"
            }}
            onClick={event => {
              event.stopPropagation();
              setQuotesExpanded(!quotesExpanded);
            }}
          >
            <h6 className="minicart-title">
              Quote Requests
              <i
                className="material-icons"
                style={{ cursor: "pointer", fontSize: "38px" }}
              >
                keyboard_arrow_down
              </i>
            </h6>
          </div>
          <div
            className={`quote-requests-wrapper${
              quotesExpanded ? ` expanded` : ``
            }`}
          >
            {basketQuoteProductsState.map(
              ({ imageurl, title, price, qty, distName, itemid }, index) => {
                return (
                  <li key={itemid}>
                    <p className={classes.itemDistName}>
                      {distName}
                      <i
                        onClick={event => handleEditIconClicked(event, true)}
                        className="material-icons minicart-item-edit-icon"
                      >
                        edit
                      </i>
                    </p>
                    <p>{title.replace("&quot;", '"')}</p>
                    <div className={classes.price}>
                      <p className="currency-p">
                        <b style={{ float: "right" }}>{qty}</b>
                        <b>${price}</b>
                      </p>
                    </div>
                  </li>
                );
              }
            )}
            {renderTotalPriceSection(true)}
            <div className="continue-check text-center">
              <span>
                <button
                  onClick={event => event.stopPropagation()}
                  target={basketQuoteProductsState.length > 0 ? "_blank" : ""}
                  href={isLocal + "&groupmode=quote"}
                  style={{
                    borderRadius: 0
                  }}
                  className={"checkout-btn active"}
                >
                  Continue
                </button>
              </span>
            </div>
          </div>
        </>
      );
    } else {
      return null;
    }
  };

  const renderMiniCartContent = () => {
    return (
      <>
        {suppliersBasketState &&
        Object.keys(suppliersBasketState).length === 0 &&
        mainSuppliersBasket &&
        mainSuppliersBasket.products &&
        mainSuppliersBasket.products.length === 0 ? (
          <span className={classes.cartCount}>
            <Translate
              translationFileName="translation"
              translateKey="minicart.noitems"
            />
          </span>
        ) : null}

        <ul className={classes.cartItems} onClick={e => e.stopPropagation()}>
          {suppliersBasketState && Object.keys(suppliersBasketState).length > 0
            ? Object.keys(suppliersBasketState).map((keyVid, index) => {
                return (
                  <div key={keyVid} className={classes.supplierWrapper}>
                    <p className={classes.itemDistName}>
                      {suppliersBasketState[keyVid].marketpaceName}
                    </p>
                    {renderSuppliersProducts(keyVid)}
                  </div>
                );
              })
            : null}
          {renderMainSupplierBasket()}
          {/*         {basketQuoteProductsState.length > 0
            ? renderTotalPriceSection()
            : null}
          {basketQuoteProductsState.length > 0 ? renderCheckoutButton() : null}
          {renderQuoteRequests()} */}
        </ul>
      </>
    );
  };

  const renderTotalPriceSection = (renderForQuote = false) => {
    if (suppliersBasketState.length > 0 && !renderForQuote) {
      return (
        <div
          className="cd-cart-total"
          style={{
            backgroundColor: "#4e4e4e",
            color: "white",
            position: basketQuoteProductsState.length === 0 ? "fixed" : ""
          }}
        >
          <p>
            <b>
              Total
              <span>{totalPriceProductsState}</span>
            </b>
          </p>
        </div>
      );
    } else if (basketQuoteProductsState.length > 0 && renderForQuote) {
      return (
        <div
          className={"cd-cart-total quote"}
          style={{ backgroundColor: "#4e4e4e", color: "white" }}
        >
          <p>
            <b>
              Total
              <span>${totalPriceQuoteProductsState}</span>
            </b>
          </p>
        </div>
      );
    } else {
      return null;
    }
  };

  const renderCheckoutButton = () => {
    return (
      <div className="continue-check text-center">
        <span>
          <button
            onClick={event => event.stopPropagation()}
            target={basketQuoteProductsState.length > 0 ? "_blank" : ""}
            href={isLocal + "&groupmode=checkout"}
            style={{
              borderRadius: 0
            }}
            className={
              "checkout-btn" +
              `${suppliersBasketState.length > 0 ? " active" : ""}`
            }
            disabled={suppliersBasketState.length !== 0 ? false : true}
          >
            {suppliersBasketState.length !== 0 ? "Checkout" : "Continue"}
          </button>
        </span>
      </div>
    );
  };

  const renderBasketLoading = () => {
    if (basketLoadingState) {
      return (
        <div
          onClick={e => e.stopPropagation()}
          className="minicart-loading-container"
        >
          <LinearLoading />
        </div>
      );
    } else {
      return null;
    }
  };

  const loginNameState = useSelector(
    state => state.loginReducer.loginname,
    shallowEqual
  );
  const userInfoState = useSelector(
    state => state.loginReducer.userInfo,
    shallowEqual
  );
  const userInfoLogin = useSelector(state => state.loginReducer, shallowEqual);

  const trackCheckOutItems = items => {
    typeof window !== "undefined" &&
      window.analytics &&
      window.analytics.track("Checkout button click", {
        length: items.length,
        items: items.products
      });
  };

  const identifyUser = () => {
    typeof window !== "undefined" &&
      window.analytics &&
      window.analytics.identify(loginNameState, {
        user: userInfoState,
        name: userInfoLogin.firstName + " " + userInfoLogin.lastName,
        email: userInfoLogin.loginName
      });
  };

  const eventPage = () => {
    if (
      typeof window !== "undefined" &&
      window.rudderanalytics &&
      window.rudderanalytics.identify
    ) {
      window.rudderanalytics.identify(
        {
          type: "identify",
          title: "MiniCart",
          loginname: loginNameState,
          details: mainSuppliersBasket,
          userinfo: userInfoState
        },
        () => {}
      );
    }
  };

  /*   useEffect(() => {
    eventPage();
  });
 */
  return (
    <div className="minicart-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "white"
        }}
      >
        {renderBasketLoading()}
        <div>
          <div style={{ backgroundColor: "#000000", color: "white" }}>
            <h6 className={classes.title}>
              <Translate
                translationFileName="translation"
                translateKey="minicart.title"
              />
              <i
                onKeyDown={e => {
                  if (e.code === "Enter") {
                    e.target.click();
                  }
                }}
                tabIndex={"0"}
                className="focusAbleWhite material-icons"
                onClick={() => close()}
                style={{ cursor: "pointer", fontSize: "38px" }}
              >
                <MdClose />
              </i>
            </h6>
          </div>

          <div
            className={`${
              basketQuoteProductsState.length === 0 ? "no-quote " : ""
            }${classes.contentWrapper}${
              isMobileState ? " scroll-bar-thin-style" : ""
            }`}
          >
            {renderMiniCartContent()}
          </div>
          {/*      {basketQuoteProductsState.length === 0
              ? renderTotalPriceSection()
              : null} */}
        </div>
        {/*       {basketQuoteProductsState.length === 0
            ? renderCheckoutButton()
            : null} */}
      </div>
    </div>
  );
}
