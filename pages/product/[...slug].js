/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useRef, useMemo } from "react";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useRouter } from "next/router";
import ExternalContentFromCMS from "../../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";

import {
  PRODUCT_DETAILS_URL,
  PRODUCT_PRICE_INVENTORY,
  PRODUCT_SUPPLIER_INFO,
  PRODUCT_URL,
  PRODUCT_VIDEO
} from "../../preScripts/links";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { i18n } from "../../next-i18next.config";

// import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import {
  fetchingItemSuccess,
  changeTitleAndLongDesc,
  setPriceInventory,
  setSupplierInfo,
  getSupplierInfo
} from "../../redux/actions/productActions";

import styled from "styled-components";
import product from "../../sample_data/product.json";
import Head from "next/head";

// Components
import Breadcrumbs from "../../components/product/Breadcrumbs";
import DesktopCarousel from "../../components/product/DesktopCarousel";
import AddToCart from "../../components/product/AddToCart";
import Reviews from "../../components/product/reviews/Reviews";
import AddToCartBox from "../../components/product/AddToCartBox";
import OtherInfoTab from "../../components/product/OtherInfoTab";

//utils
import { LINK_DISTRIBUTION } from "../../project-config";
import RecentlyViewedItems from "../../components/product/RecentlyViewedItems";
// import AddedToCartModal from "../../components/AddedToCartModal";
import Container from "../../components/shared-components/Container";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp
} from "react-icons/md";

import Link from "next/link";
import ReviewBar from "../../components/product/ReviewBar";
import translate from "../../utils/Translate";
import RelatedItems from "../../components/RelatedItems";

// const {
//   id,
//   title,
//   code,
//   desc,
//   currency_sign,
//   image,
//   itemLargeImage,
//   price,
//   url
// } = itemCard;

// const itemUrl = `/${url}/iid/${id}`;


const Product = ({
  productInitialData,
  productDetailsData,
  priceInventory,
  supplierInfo,
  productVideo,
  reviews,
  title
}) => {
  console.log("kkk", title)
  const dispatch = useDispatch();
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  const productUnavailableState = useSelector(
    state => state.productReducer.productUnavilable,
    shallowEqual
  );

  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  console.log("productDetailsData", productDetailsData, supplierInfo);
  

  const [firstDistId, setFirstDistId] = useState(0);
  const [modalState, setModalState] = useState({
    open: false,
    distributor: null
  });

  const [allProductsOfTheCategory, setAllProductsOfTheCategory] = useState([]);
  const [
    currentIndexOfProductInTheCategory,
    setCurrentIndexOfProductInTheCategory
  ] = useState(-1);

  console.log(
    "currentIndexOfProductInTheCategory",
    allProductsOfTheCategory,
    currentIndexOfProductInTheCategory
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const allProductsOfTheCategoryJSON = JSON.parse(
          localStorage.getItem("allProductsOfTheCategory")
        );

        setAllProductsOfTheCategory(allProductsOfTheCategoryJSON);
        setCurrentIndexOfProductInTheCategory(
          allProductsOfTheCategoryJSON.productUrls.findIndex(product => {
            return product.id == productInitialData.id;
          })
        );
      } catch (error) {
        console.error(
          "Error getting allProductsOfTheCategory from localStorage",
          error
        );
      }
    }
  }, [productInitialData.id]);


  // const rightColRef = useRef();
  // const showroomsRef = useRef();
  // const familyRef = useRef();
  // const specsRef = useRef();
  const reviewsRef = useRef();
  let properties = {};
  const [enquiryModalState, setEnquiryModalState] = useState(false);
  const [titleState, setTitleState] = useState("");
  const [supplierName, setSupplierName] = React.useState("");
  const [supplierCity, setSupplierCity] = React.useState("");
  const [numberOfItems, setNumberOfItems] = useState(1);
  const [stickyTop, setStickyTop] = useState(20);

  const handleEnquiryModalOpenClicked = () => {
    setEnquiryModalState(true);
  };

  const handleClose = () => {
    setModalState({ ...modalState, open: false });
  };

  const [calculatedPriceAndFoundDist, setCalculatedPriceAndFoundDist] =
    useState({ price: null, distributor: null });

  const [integer, setInteger] = useState("");
  const [decimal, setDecimal] = useState("");

  useEffect(() => {
    const priceInStr = calculatedPriceAndFoundDist.price?.listprice.toString();
    setInteger(priceInStr?.split(".")[0]);
    setDecimal(priceInStr?.split(".")[1]);
    setDecimal(decimal + "0");
  }, [calculatedPriceAndFoundDist]);

  const priceObj = {
    type: "default",
    value: {
      integer,
      decimal
    }
  };

  useEffect(() => {
    dispatch(changeTitleAndLongDesc(productInitialData));
    dispatch(fetchingItemSuccess(productDetailsData));
    dispatch(setPriceInventory(priceInventory));
    dispatch(setSupplierInfo(supplierInfo));
  }, [
    dispatch,
    priceInventory,
    productDetailsData,
    productInitialData,
    supplierInfo
  ]);

  const priceStateRedux = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const ItemCodeState = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  );

  const itemDetailIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const productInitialStateFromFetch = useSelector(
    state => state.productReducer.productInitial,
    shallowEqual
  );

  const supplierInfoReducer = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const firstSupplierVid = useMemo(() => {
    if (supplierInfo?.[0]?.distributorOrder?.length > 0) {
      const vid = supplierInfo[0].distributorOrder[0].supplier_vid;
      console.log("vid", vid);
      return vid;
    }

    return null;
  }, [supplierInfo]);

  const supplierInfoStateRedux = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  // const priceState = isBrowser ? priceStateRedux : priceInventory;
  // const supplierInfoState = isBrowser ? supplierInfoStateRedux : supplierInfo;

  // const family = productDetailsData.hiddenProperties.find(prop => {
  //   return prop.propname === "temp_Family";
  // });

  // const brand = productDetailsData.hiddenProperties.find(prop => {
  //   return prop.propname === "facet_Brand";
  // });

  if (supplierInfo && supplierInfo.length > 0) {
    properties = {
      SupplierName: supplierInfo?.[0]?.distributorOrder?.[0]?.name,
      Supplier_Code: supplierInfo?.[0]?.distributorOrder?.[0]?.code
    };
  }

  useEffect(() => {
    if (supplierInfoReducer.length > 0) {
      if (supplierInfoReducer[0].distributorOrder.length > 0) {
        setSupplierName(supplierInfoReducer[0].distributorOrder[0].name);
        setSupplierCity(supplierInfoReducer[0].distributorOrder[0].city);
      }
    }
  }, [supplierInfoReducer]);

  useEffect(() => {
    console.info("RENDER++", itemDetailState.code);
    if (typeof window !== undefined && itemDetailIdState) {
      dispatch(getSupplierInfo(itemDetailIdState));
      window.scrollTo(0, 0);
    }
  }, [itemDetailIdState]);

  useEffect(() => {
    if (productInitialStateFromFetch.title != "") {
      /*  if (productInitialState != "") {
              setTitleState(itemDetailsTitleState);
            } else { */
      setTitleState(productInitialStateFromFetch.title);
      /*       } */
    }
  }, [productInitialStateFromFetch /* , itemDetailsTitleState */]);

  const renderItemNavigationLinks = () => {
    return (
      <>
        {currentIndexOfProductInTheCategory > 0 && (
          <Link
            href={`/${
              allProductsOfTheCategory?.productUrls[
                currentIndexOfProductInTheCategory - 1
              ].url
            }`}
          >
            <a title="Previous Product">
              <MdKeyboardArrowLeft />
            </a>
          </Link>
        )}
        {currentIndexOfProductInTheCategory <
          allProductsOfTheCategory?.productUrls?.length - 1 && (
          <Link
            href={`/${
              allProductsOfTheCategory.productUrls[
                currentIndexOfProductInTheCategory + 1
              ].url
            }`}
          >
            <a title="Next Product">
              <MdKeyboardArrowRight />
            </a>
          </Link>
        )}

        {allProductsOfTheCategory?.categoryUrl && (
          <Link href={`/${allProductsOfTheCategory.categoryUrl}`}>
            <a title="Back to Category">
              <MdKeyboardArrowUp />
            </a>
          </Link>
        )}
      </>
    );
  };

  console.log(reviews.length);

  return (
    <>
      {/* <AddedToCartModal /> */}
      <Head>
        <title>{productInitialData.title}</title>
        <meta name="description" content={product.title} />
        <meta name="keywords" content={product.title} />
        <meta name="metakeywords" content={product.title} />
        <meta property="og:title" content={product.title} />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta property="og:description" content={product.title} />
        <meta property="twitter:title" content={product.title} />
        <meta property="twitter:description" content={product.title} />
        <meta property="og:url" content={LINK_DISTRIBUTION + router.asPath} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ExternalContentFromCMS
        place="product"
        position="Top"
        renderedBy="HomeBanner"
        firstSupplierVid={firstSupplierVid}
      />
      <Container>
        {/* <ProductFamily products={productInitialData.productFamily} /> */}

        <TopNavigation>
          <Breadcrumbs breadcrumbs={product.breadcrumbs} />
          {/* <div className="item-navigation">{renderItemNavigationLinks()}</div> */}
        </TopNavigation>
        {isMobileState ? (
          // <div className="flex flex-col md:flex-row">
          //   <div className="flex-auto lg:w-80 md:w-80 sm:w-96" style={{marginLeft: "20px"}}>
          //     <div>
          //       <div>
          //         <h2
          //           id="product-title"
          //           className="text-lg md:text-lg font-bold mt-5"
          //         >
          //           {productInitialData.title}
          //         </h2>
          //       </div>
          //       <DesktopCarousel
          //         code={productDetailsData.code}
          //         hiddenProps={productDetailsData.hiddenProperties}
          //         video={productVideo.records}
          //       />
          //       <div className="mt-10">
          //         <p className="md:text-sm">
          //           <span style={{ fontWeight: "700", marginRight: "5px" }}>
          //             {translate({
          //               translationFileName: "translation",
          //               translateKey: "items.code"
          //             })}
          //             :{" "}
          //           </span>
          //           <span> {productInitialData.code}</span>
          //         </p>
          //       </div>
          //       <ReviewBar
          //         reviews={reviews}
          //         reviewsRef={reviewsRef}
          //         product={productDetailsData}
          //         price={priceObj}
          //       />
          //       <AddToCartBox
          //         productUnavilable={productUnavailableState}
          //         priceInv={priceInventory}
          //         storeInfo={supplierInfo}
          //         setNumberOfItems={setNumberOfItems}
          //         numberOfItems={numberOfItems}
          //       />
          //       <AddToCart
          //         calculatedPriceAndFoundDist={calculatedPriceAndFoundDist}
          //         productUnavailable={productUnavailableState}
          //         priceInv={priceInventory}
          //         storeInfo={supplierInfo}
          //         numberOfItems={numberOfItems}
          //         productDetailsData={productDetailsData}
          //       />
          //       <OtherInfoTab
          //         longDesc={productDetailsData.longdesc}
          //         properties={productDetailsData.properties}
          //         hiddenProps={productDetailsData.hiddenProperties}
          //       />
          //     </div>
          //   </div>
          // </div>
<>
          <Breadcrumbs breadcrumbs={product.breadcrumbs} className="bredcrumb999"/>
          <div className="flex flex-col md:flex-row distanccTopImage">
            {/* <Breadcrumbs breadcrumbs={product.breadcrumbs} /> */}
            <div className="flex-auto lg:w-80 md:w-80 sm:w-96">
            {/* <Breadcrumbs breadcrumbs={product.breadcrumbs} /> */}
              <DesktopCarousel
                // className="hidden md:block"
                code={productDetailsData.code}
                hiddenProps={productDetailsData.hiddenProperties}
                video={productVideo.records}
              />
            </div>

            <div className="flex-auto lg:w-32 md:w-16">
              <div>
                <div>
                  <div className="Brand_nameWishlist">
                    {/* <h2 className="itemsbrandName">{firstDistId}</h2> */}
                    {/* <h2 className="itemsbrandName">BRAND NAME</h2> */}
                    <h2 className="itemsbrandName">CasaCraft</h2>

                    
                    {/* <h2 className="itemsbrandName">{item.properties.SupplierName ||
                  item.properties.Supplier_Code ||
                  relatedItemProp?.SupplierName ||
                  relatedItemProp?.Supplier_Code}</h2> */}

                    <div className="wishlistAndShare">
                      <img
                        src="https://ik.imagekit.io/ofb/themes/share_t9_6MEKiE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666846030396"
                        width="4%"
                        className="shareitemicons"
                      />
                      <img
                        src="https://ik.imagekit.io/ofb/themes/heart_6s-G7NVTI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666845716083"
                        width="5%"
                      />
                    </div>
                  </div>
                  <ReviewBar
                    reviews={reviews}
                    reviewsRef={reviewsRef}
                    product={productDetailsData}
                    price={priceObj}
                  />
                </div>
                <div className="product-titlebold">
                  <h2
                    id="product-title"
                    className="text-lg md:text-lg font-bold"
                  >
                    {productInitialData.title}
                  </h2>
                </div>

                <div className="borderBottomSku">
                  <p className="md:text-sm skuCodetext">
                    <span
                      className="skuColors"
                      style={{ fontWeight: "700", marginRight: "5px" }}
                    >
                      {translate({
                        translationFileName: "translation",
                        translateKey: "items.code"
                      })}
                      :{" "}
                    </span>
                    <span> {productInitialData.code}</span>
                  </p>
                </div>
              </div>
              {/* <ReviewBar
                reviews={reviews}
                reviewsRef={reviewsRef}
                product={productDetailsData}
                price={priceObj}
              /> */}
              <div style={{ display: "flex" }}>
                <div>
                  <AddToCartBox
                    productUnavilable={productUnavailableState}
                    priceInv={priceInventory}
                    storeInfo={supplierInfo}
                    setNumberOfItems={setNumberOfItems}
                    numberOfItems={numberOfItems}
                  />
                </div>
                <div>
                  <AddToCart
                    calculatedPriceAndFoundDist={calculatedPriceAndFoundDist}
                    productUnavailable={productUnavailableState}
                    priceInv={priceInventory}
                    storeInfo={supplierInfo}
                    numberOfItems={numberOfItems}
                    productDetailsData={productDetailsData}
                  />
                </div>
              </div>
              {/* <div className="topnav999">
          <a className="active" href="#home">
            Home
          </a>
          <a href="#news">Best Selling Earpods</a>
          <a href="#smartwatch">Smart Watches</a>
          <a href="#trending">Trending Wireless</a>
          <a href="#headfone">Headphones</a>
        </div> */}
              <>
                {/* <OtherInfoTab
                  longDesc={productDetailsData.longdesc}
                  properties={productDetailsData.properties}
                  hiddenProps={productDetailsData.hiddenProperties}
                /> */}
                {/* <AddToCart
                  calculatedPriceAndFoundDist={calculatedPriceAndFoundDist}
                  productUnavailable={productUnavailableState}
                  priceInv={priceInventory}
                  storeInfo={supplierInfo}
                  numberOfItems={numberOfItems}
                  productDetailsData={productDetailsData}
                /> */}
              </>
            </div>
          </div>
          </>
        ) : (
    <>
    <Breadcrumbs breadcrumbs={product.breadcrumbs} className="bredcrumb999"/>
          <div className="flex flex-col md:flex-row distanccTopImage">
            {/* <Breadcrumbs breadcrumbs={product.breadcrumbs} /> */}
            <div className="flex-auto lg:w-80 md:w-80 sm:w-96">
            {/* <Breadcrumbs breadcrumbs={product.breadcrumbs} /> */}
              <DesktopCarousel
                // className="hidden md:block"
                code={productDetailsData.code}
                hiddenProps={productDetailsData.hiddenProperties}
                video={productVideo.records}
              />
            </div>

            <div className="flex-auto lg:w-32 md:w-16">
              <div>
                <div>
                  <div className="Brand_nameWishlist">
                    {/* <h2 className="itemsbrandName">{firstDistId}</h2> */}
                    {/* <h2 className="itemsbrandName">BRAND NAME</h2> */}
                    <h2 className="itemsbrandName">CasaCraft</h2>

                    
                    {/* <h2 className="itemsbrandName">{item.properties.SupplierName ||
                  item.properties.Supplier_Code ||
                  relatedItemProp?.SupplierName ||
                  relatedItemProp?.Supplier_Code}</h2> */}

                    <div className="wishlistAndShare">
                      <img
                        src="https://ik.imagekit.io/ofb/themes/share_t9_6MEKiE.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666846030396"
                        width="4%"
                        className="shareitemicons"
                      />
                      <img
                        src="https://ik.imagekit.io/ofb/themes/heart_6s-G7NVTI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666845716083"
                        width="5%"
                      />
                    </div>
                  </div>
                  <ReviewBar
                    reviews={reviews}
                    reviewsRef={reviewsRef}
                    product={productDetailsData}
                    price={priceObj}
                  />
                </div>
                <div className="product-titlebold">
                  <h2
                    id="product-title"
                    className="text-lg md:text-lg font-bold"
                  >
                    {productInitialData.title}
                  </h2>
                </div>

                <div className="borderBottomSku">
                  <p className="md:text-sm skuCodetext">
                    <span
                      className="skuColors"
                      style={{ fontWeight: "700", marginRight: "5px" }}
                    >
                      {translate({
                        translationFileName: "translation",
                        translateKey: "items.code"
                      })}
                      :{" "}
                    </span>
                    <span> {productInitialData.code}</span>
                  </p>
                </div>
              </div>
              {/* <ReviewBar
                reviews={reviews}
                reviewsRef={reviewsRef}
                product={productDetailsData}
                price={priceObj}
              /> */}
              <div style={{ display: "flex" }}>
                <div>
                  <AddToCartBox
                    productUnavilable={productUnavailableState}
                    priceInv={priceInventory}
                    storeInfo={supplierInfo}
                    setNumberOfItems={setNumberOfItems}
                    numberOfItems={numberOfItems}
                  />
                </div>
                <div>
                  <AddToCart
                    calculatedPriceAndFoundDist={calculatedPriceAndFoundDist}
                    productUnavailable={productUnavailableState}
                    priceInv={priceInventory}
                    storeInfo={supplierInfo}
                    numberOfItems={numberOfItems}
                    productDetailsData={productDetailsData}
                  />
                </div>
              </div>
              {/* <div className="topnav999">
          <a className="active" href="#home">
            Home
          </a>
          <a href="#news">Best Selling Earpods</a>
          <a href="#smartwatch">Smart Watches</a>
          <a href="#trending">Trending Wireless</a>
          <a href="#headfone">Headphones</a>
        </div> */}
              <>
                {/* <OtherInfoTab
                  longDesc={productDetailsData.longdesc}
                  properties={productDetailsData.properties}
                  hiddenProps={productDetailsData.hiddenProperties}
                /> */}
                {/* <AddToCart
                  calculatedPriceAndFoundDist={calculatedPriceAndFoundDist}
                  productUnavailable={productUnavailableState}
                  priceInv={priceInventory}
                  storeInfo={supplierInfo}
                  numberOfItems={numberOfItems}
                  productDetailsData={productDetailsData}
                /> */}
              </>
            </div>
          </div>
          </>
        )}

        

        <div className="tabs">
          <input
            type="radio"
            className="tabs__radio"
            name="tabs-example"
            id="tab1"
            checked
          />
          <label htmlFor="tab1" className="tabs__label">
            Description
          </label>
          <div className="tabs__content">
            <OtherInfoTab
              longDesc={productDetailsData.longdesc}
            />
          </div>
          <input
            type="radio"
            className="tabs__radio"
            name="tabs-example"
            id="tab2"
          />
          <label htmlFor="tab2" className="tabs__label">
            Additional-info
          </label>
          <div className="tabs__content">
          <OtherInfoTab
              properties={productDetailsData.properties}
              hiddenProps={productDetailsData.hiddenProperties}
            />
          </div>

          <input
            type="radio"
            className="tabs__radio"
            name="tabs-example"
            id="tab3"
          />
          <label htmlFor="tab3" className="tabs__label">
            Reviews
          </label>
          <div className="tabs__content">Reviews 3</div>

          <input
            type="radio"
            className="tabs__radio"
            name="tabs-example"
            id="tab4"
          />
          <label htmlFor="tab4" className="tabs__label">
            Other-content
          </label>
          <div className="tabs__content">Other-content 1</div>

          <input
            type="radio"
            className="tabs__radio"
            name="tabs-example"
            id="tab5"
          />
          <label htmlFor="tab5" className="tabs__label">
            Comments
          </label>
          <div className="tabs__content">Comments1</div>
        </div>



{/* <div className="containerm">	
    <div className="tabs effect-3">
        <input type="radio" id="tab-1" name="tab-effect-3" checked="checked"/>
  <span>Description</span>

  <input type="radio" id="tab-2" name="tab-effect-3"/>
  <span>Additional-info</span>

  <input type="radio" id="tab-3" name="tab-effect-3"/>
  <span>Reviews</span>

  <input type="radio" id="tab-4" name="tab-effect-3"/>
  <span>Other-content</span>
  
  <input type="radio" id="tab-5" name="tab-effect-3"/>
  <span>Comments</span>

  <div className="line ease"></div>



  <div className="tab-content">
    <section id="tab-item-1">
      <h1><OtherInfoTab
              longDesc={productDetailsData.longdesc}
            /></h1>
    </section>
    <section id="tab-item-2">
      <h1>Two</h1>
    </section>
    <section id="tab-item-3">
      <h1>Three</h1>
    </section>
    <section id="tab-item-4">
      <h1>Four</h1>
    </section>
    <section id="tab-item-5">
      <h1>Five</h1>
    </section>
  </div>
</div>
</div> */}




{/* <div className="container tabs">
  <input type="radio" id="tab1" name="tab" className="tabs__radio" checked/>
  <label htmlFor="tab1" className="tabs__label"> Description</label>
  <input type="radio" id="tab2" name="tab" className="tabs__radio"/>
  <label htmlFor="tab2" className="tabs__label">Additional-info</label>
  <input type="radio" id="tab3" name="tab" className="tabs__radio"/>
  <label htmlFor="tab3" className="tabs__label">Reviews</label>
  <input type="radio" id="tab4" name="tab" className="tabs__radio"/>
  <label htmlFor="tab4" className="tabs__label">Other-content</label>
  <input type="radio" id="tab5" name="tab" className="tabs__radio"/>
  <label htmlFor="tab5" className="tabs__label">Comments</label>
  <div className="line"></div>
  <div className="content-container tabs__content">
    <div className="content tabs__content" id="c1">
    <div className="content-container">
      <OtherInfoTab
              longDesc={productDetailsData.longdesc}
            />
            <p>hiiii</p>
    </div>
    </div>
    <div className="content tabs__content" id="c2">
      <OtherInfoTab
              properties={productDetailsData.properties}
              hiddenProps={productDetailsData.hiddenProperties}
            />
    </div>
    <div className="content" id="c3">
      <h3>Reviews</h3>
      <p>Amazing product. I don't know how it works.</p>
    </div>
    <div className="content" id="c4">
      <p>This product is currently not shareable.</p>
    </div>
  </div>


</div> */}

        

        <RecentlyViewedItems />

        {/* <div ref={reviewsRef} className="review-share-block mb-3">
          <Reviews reviews={reviews} product={productInitialData} />
        </div>
        */}

        <ExternalContentFromCMS
          place="product"
          position="Middle"
          renderedBy="HomeBanner"
          firstSupplierVid={firstSupplierVid}
        />

        {/* <div ref={reviewsRef} className="review-share-block mb-3">
          <Reviews reviews={reviews} product={productInitialData} />
        </div> */}

        <RelatedItems
          items={productDetailsData?.alsoLikeItems}
          properties={properties}
        />

        <ExternalContentFromCMS
          place="product"
          position="Bottom"
          renderedBy="HomeBanner"
          firstSupplierVid={firstSupplierVid}
        />
      </Container>
    </>
  );
};

const TopNavigation = styled.div`
  .item-navigation {
    display: flex;
    align-content: center;
    justify-content: flex-end;
    font-size: x-large;
    color: #707070;
  }
  .item-navigation > a > svg {
    font-size: 30px;
  }
`;

const Wrapper = styled.main`
  .item-main {
    margin -left: 0;
    margin-right: 0;
    padding-left: 0 !important;
    letter-spacing: normal;
    word-spacing: normal;
    display: inline-block;
    width: 99.7%;
    zoom: 1;
    vertical-align: top;
    -moz-border-radius: 4px;
    -webkit-border-radius: 4px;
    -khtml-border-radius: 4px;
    border-radius: 4px;
  }

  #mainGridDiv {
    display: flex;
    align-items: flex-start;
    grid-template-columns: 1fr 2fr;
    grid-column-gap: 2%;
    padding-bottom: 20px;
    padding-top: 20px;
    flex-direction: column;
  }

  #mainGridDiv::before {
    content: "::before element";
    order: 9999;
    visibility: hidden;
    display: none;
    height: 0;
    overflow: hidden;
  }

  #mainGridDiv::after {
    content: "::after element";
    order: 9999;
    visibility: hidden;
    display: none;
    height: 0;
    overflow: hidden;
  }

  //CHECK HERE IF NOT WORKING PROPERLY
  .row {
    width: 90%;
    margin: 0 auto;
    padding-top: 0;
    margin-bottom: 0 !important;
    grid-area: row;
  }

  .brandItem {
    font -size: 17px;
    font-weight: 500;
    color: #00657d;
    float: left;
    width: 50%;
    margin-bottom: 18px;
  }

  //check this too
  .title {
    font -weight: 600 !important;
    font-size: 14px !important;
    //margin-top: 30px !important;
    margin-bottom: 30px !important;
  }

  #leftGrid {
    display: flex;
    flex-direction: column;
    width: 45%;
    padding-right: 2%;
    position: sticky;
    top: 0;
    border-right: 1px solid #dfdfdf;
    z-index: 1;
    grid-area: leftGrid;
  }

  #rightGrid {
    //display: flex;
    flex -direction: column;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas: "titleGrid titleGrid addToCardGrid" "optionsPriceGrid optionsPriceGrid addToCardGrid" "locationGrid locationGrid addToCardGrid" "nationalityGrid nationalityGrid addToCardGrid" "callForPriceGrid callForPriceGrid addToCardGrid" "otherInfoGrid otherInfoGrid addToCardGrid";
    width: 53%;
    grid-area: rightGrid;
  }

  .review-share-block {
    display: flex;
    align-items: center;
    margin: 12px 0 10px;
  }

  .shareBtn {
    margin: 0 10px;
  }

  #titleGrid {
    margin -bottom: 10px;
    padding: 0 !important;
    grid-area: titleGrid;
    padding-right: 15px;
    //margin-top: 20px;
  }

  #titleGrid p {
    line -height: 1.5em;
  }
  

  //margin: 30px auto 0;
  //
  //@media only screen and (min-width: 769px) {
  //  display: grid;
  //  grid-template-columns: repeat(16, 1fr);
  //  column-gap: var(--gutter-width);
  //  padding: 0 var(--padding-x);
  //  --gutter-width: 32px;
  //  margin-top: 30px;
  //
  //  .desktopLeft {
  //    grid-column: span 11 / auto;
  //  }
  //
  //  .desktopRight {
  //    grid-column: 12 / -1;
  //    position: relative;
  //  }
  //
  //  .sticky {
  //    position: relative;
  //    position: -webkit-sticky;
  //    position: sticky;
  //    top: 20px;
  //  }
  //}
  //
  //@media screen and (max-width: 768px) {
  //  .desktopLeft {
  //    margin-top: 30px;
  //  }
  //
  //  .desktopRight {
  //    width: 100% !important;
  //  }

  #product-title{
    font-size: 19px;
    color: #37455E;
  }

  .Brand_nameWishlist{
    display: flex;
    min-width: max-content;
    margin-bottom: -21px;
  }
  .wishlistAndShare{
    display: flex !important;
    justify-content: end !important;
  }
  // .itemsbrandName{
  //   color: #37455E;
  //   font-weight: 500;
  // }
//   .bulb {
//     color: #FFC107 !important;
// }







.tabs{
  justify-content: space-around !important;
    padding-right: 35% !important;
    padding-left: 4% !important;
}









`;

export const getStaticPaths = async ({ locales }) => {
  let useCache = process && process.env.NODE_ENV === "development";
  const allItems = []; //await getAllItems(useCache);

  /*   const filteredItems = allItems.filter(url => {
    return url !== "product/installation-services-ainmgp9rb2";
  });
 */
  /*   const paths = filteredItems.map(item => {
    return {
      params: { slug: item.split("/") }
    };
  }); */

  // const path =
  //   "product/by-Brand/CWI-Lighting/CWI-Lighting-Ceiling-Lights/CWI-Lighting-Chandeliers/1273p44-5-101-rc-ain6c23s83";

  // const paths = [{ params: { slug: path.split("/") } }];

  return {
    // paths,
    paths: [],
    fallback: "blocking"
  };
};

export const getStaticProps = async ({ params, locale }) => {
  const { slug } = params;
  let productSlug = slug;

  if (!productSlug.includes("product")) {
    productSlug.unshift("product");
  }

  try {
    const productUrl = PRODUCT_URL(productSlug.join("/"));

    console.log("PRODUCT URL ", productUrl);

    const res = await fetch(productUrl);
    const data = await res.json();

    console.log("product data", data);
    // console.log({ productSlug, productUrl, reviews: data[0].reviews });

    let productInitialData = null;
    let productDetailsData = null;

    let priceInventory = {};
    let supplierInfo = {};
    let productVideo = null;
    let reviews = [];
    if (data && data[0] && data[0].id) {
      const id = data[0].id;

      productInitialData = data[0];
      reviews = data[0].reviews;
      // product details
      const productDetailsUrl = PRODUCT_DETAILS_URL(id);
      const productRes = await fetch(productDetailsUrl);
      productDetailsData = await productRes.json();
      productDetailsData =
        productDetailsData &&
        productDetailsData.__Result &&
        productDetailsData.__Result[0];

      // price inventory
      const priceInventoryUrl = PRODUCT_PRICE_INVENTORY(id);
      const priceInventoryRes = await fetch(priceInventoryUrl);

      priceInventory = await priceInventoryRes.json();
      priceInventory =
        priceInventory && priceInventory.__Result && priceInventory.__Result[0];

      // supplier info
      const supplierInfoUrl = PRODUCT_SUPPLIER_INFO(id);
      const supplierInfoRes = await fetch(supplierInfoUrl);

      supplierInfo = await supplierInfoRes.json();
      supplierInfo = supplierInfo && supplierInfo.__Result;

      // product video
      const productVideoUrl = PRODUCT_VIDEO(id);
      const productVideoRes = await fetch(productVideoUrl);

      productVideo = await productVideoRes.json();
      // productVideo = productVideo && productVideo.__Result;
    }

    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        productInitialData,
        productDetailsData,
        priceInventory,
        supplierInfo,
        productVideo,
        reviews,
        productUrl
      },
      // Re-generate the product data at most once per week
      // if a request comes in
      revalidate: 604800 // 1 week
    };
  } catch (err) {
    console.error("Error product page", err);
    return {
      notFound: true
    };
  }
};

export default Product;
