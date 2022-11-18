import { useState, useEffect, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import "react-multi-carousel/lib/styles.css";

import StoreCard from "../components/StoreCard";
import Grid from "./AC-UI-Elements/Grid/Grid";

import {
  fetchingCategoryRequest,
  fetchingCategoryRequestSaga
} from "../redux/actions/categoryActions";

import { toggleWishListAction } from "../redux/actions/wishlistActions";

import dynamic from "next/dynamic";
import Translate from "../utils/Translate";

const DynamicCarousel = dynamic(() =>
  import("../components/uiElements/Carousel/Carousel")
);

function FeaturedSellers({ stores }) {
  const dispatch = useDispatch();

  const storesState = useSelector(
    state => state.storeReducer.stores,
    shallowEqual
  );

  const storeItemsAreLoading = useSelector(
    state => state.storeReducer.loading,
    shallowEqual
  );

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const distanceState = useSelector(
    state => state.categoryReducer.distance,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const navCatsState = useSelector(
    state => state.menuReducer.navCats,
    shallowEqual
  );

  // Listen to changes of navCats once it is populated, if the stores are not populated then populate the stores
  useEffect(() => {
    if (navCatsState && navCatsState.childs && storesState === undefined) {
      let storesNavCat = navCatsState.childs.find(navCat =>
        navCat.URL.includes("stores")
      );

      console.info("stores fetch", storesNavCat);
      if (storesNavCat) {
        console.info("stores fetch2", storesNavCat);
        let parent = [[storesNavCat.name, storesNavCat.cid, storesNavCat.URL]];
        //dispatch(setStoresNavCatAction(storesNavCat));
        dispatch(
          fetchingCategoryRequestSaga(
            storesNavCat.cid,
            storesNavCat.name,
            parent,
            "",
            storesNavCat
          )
        );
      }
    }
  }, [navCatsState]);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 3
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 3
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 1
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1
    }
  };

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const toggleWish = (e, id, title, desc, currency_sign, image, price, url) => {
    e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        url,
        wishListState,
        false
      )
    );
  };

  const renderLocation = () => {
    if (userLocationState.city != userLocationState.state) {
      return `${userLocationState.city}, ${userLocationState.state}`;
    } else {
      return `${userLocationState.city}, ${userLocationState.country}`;
    }
  };
  const handleChangeBtnClicked = () => {
    const button = document.getElementById("locationChangeBtn");
    button.click();
  };

  const renderPlaceholderCards = () => {
    return (
      <DynamicCarousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? true : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {Array(6)
          .fill(0, 0, 6)
          .map((v, i) => (
            <Grid key={i} item className="item-card-item" xs={12}>
              <div
                className="placeholder-item-card-wrapper"
                style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    height: "400px"
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      height: "40px"
                    }}
                  ></div>
                </div>
              </div>
            </Grid>
          ))}
      </DynamicCarousel>
    );
  };

  return (
    <div>
      <div className="header-container">
        <br />
        <br />
        <h3 className="browseCat">
          <Translate
            translationFileName={"translation"}
            translateKey={"home.shopByBrand"}
          />
          &nbsp;
          {/* {distanceState && userLocationState.lat && userLocationState.lng ? (
            <span>
              Within <b>{distanceState} KM</b> of {renderLocation()}
            </span>
          ) : (
            "- Global "
          )}
          <span
            onClick={handleChangeBtnClicked}
            className="itemsShow-changeBtn"
          >
            Change
          </span> */}
        </h3>
        {stores && stores.items?.length > 0 ? (
          <DynamicCarousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay={isMobileState ? true : false}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["mobile", "xsMobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {stores &&
              stores?.items?.map(item => (
                <div key={item.id} className="owl-item item-card-itemFeatured">
                  <StoreCard key={item.id} itemCard={item} />
                </div>
              ))}
          </DynamicCarousel>
        ) : (
          renderPlaceholderCards()
        )}
      </div>
    </div>
  );
}

export default FeaturedSellers;
