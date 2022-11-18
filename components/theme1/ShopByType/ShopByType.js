import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import styled from "styled-components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { setSelectedStoreToViewOnTheMapAction } from "../../../redux/actions/loginActions";
import { fetchUserData } from "../../../redux/actions/loginActions";
// import styled from "styled-components";
import { MdOutlineLocationOn } from "react-icons/md";
import classes from "./ShopByType.module.css";
import { getDistanceBetweenTwoCoords } from "../../../utils/functions";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp
} from "react-icons/md";
// import StoreCard from '../../PopularOffersoftheDayCard'


import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// import PopularOffersoftheDayCard from "../components/PopularOffersoftheDayCard";
import PopularOffersoftheDayCard from "../../../components/PopularOffersoftheDayCard";

import Grid from "../../AC-UI-Elements/Grid/Grid";

import { toggleWishListAction } from "../../../redux/actions/wishlistActions";

const HomeBanner = ({ shopby }) => {
  console.log("shopbyshopby", shopby);
  const dispatch = useDispatch();

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 4
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 2
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 2
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
        wishListState
      )
    );
  };

  const renderPlaceholderCards = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? false : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {Array(4)
          .fill(0, 0, 4)
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
      </Carousel>
    );
  };
  console.info("wwwwffff", shopby?.[1]?.items);
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      {/* <div className={classes.ShopByType}>
        <div className={classes.ShopByTypeInner}>
          <h1 className={classes.ShopByTypeHeading}>Shop by Type</h1>
          <div className={classes.ShopByTypeUl}> */}
            {/* <ul>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_198108361_cr-YtWxDZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299859" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Dresses</h1>
                  <h6>121 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_199376342_5wPM8JOk9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299895" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Tops</h1>
                  <h6>158 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_284343355_OPkPH2p8P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052305123" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Bottoms</h1>
                  <h6>450 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_259166468_hnUS1m8J4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299866" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Pantsuits and Jumpsuits</h1>
                  <h6>121 Items</h6>
                </div>
              </li>
            </ul> */}
            <div className="popularowl">
              
      <div className="browseCat-container">
        {/* <div>

        <h2 className="hr-lines">Featured Products
        </h2>
        <a href="#" className="previous">&#8249;</a>
<a href="#" className="next">&#8250;</a>
</div> */}

<div className="products-featured products-featured1">
  <div className="hr-lines">Featured Products</div>
  <div className="prev-nexticons">
  <a href="#" className="previous9 previous8" disabled>&#8249;</a>
    <a href="#" className="next9 previous8">&#8250;</a>
  </div>
</div>

{/* <div className="hr-theme-slash-2">Featured Products
  <div className="hr-line"></div>
  <div className="hr-icon">
    <a href="#" className="previous">&#8249;</a>
    <a href="#" className="next">&#8250;</a>
  </div>
</div> */}
            {shopby && shopby?.[1]?.items?.length > 0 ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={20000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["mobile", "xsMobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {shopby &&
              shopby?.[1]?.items?.map(item => (
                <div key={item.id} className="owl-item popularProducts">
                  <PopularOffersoftheDayCard key={item.id} itemCard={item} />
                </div>
              ))}
          </Carousel>
        ) : (
          renderPlaceholderCards()
        )}

          {/* </div>
        </div>
      </div> */}

</div>
    </div>
    </>
  );
};

export default HomeBanner;
// const Wrapper = styled.div`
//   font-size: 14px;
//   width: calc(100% - 10px);
//   border-radius: 4px;
//   background: #fff;
//   overflow: hidden;
//   transition: all 0.3s ease;
//   margin-bottom: 14px;
//   position: relative;
//   display: inline-block;
//   cursor: pointer;
//   // :hover {
//   //   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
//   // }
//   .image-wrapper span {
//     width: 100% !important;
//     height: 100% !important;
//   }

//   .content-wrapper {
//     text-align: center;
//   }
//   .popularImage {
//     width: 100% !important;
//     margin: 0px 0px;
//     height: 400px;
//     display: flex;
//     align-items: center;
//     position: relative;
//     margin: 0 auto;
//     margin-bottom: 10px;
//     background: #fafafa;
//   }
//   .popularImage img {
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     top: 0;
//     margin: auto;
//     opacity: 1;
//     max-width: 100%;
//     max-height: 100%;
//     object-fit: cover;
//     width: 100%;
//     height: 100%;
//     object-position: top;
//   }
//   @media only screen and (min-width: 320px) and (max-width: 767px) {
//     .popularImage {
//       height: 150px !important;
//     }
//   }
//   .popularTitle {
//     letter-spacing: 0px;
//     color: #212b36;
//     opacity: 1;
//     font-size: 14px;
//     margin-bottom: 10px;
//   }
//   .card__status {
//     letter-spacing: 0px;
//     color: #ce3c59;
//     opacity: 1;
//     font-size: 17px;
//     margin-bottom: 10px;
//     font-weight: 500;
//   }

//   // .jUjKio .popularImage img {
//   //   position: absolute !important;
//   //   /* bottom: 0; */
//   //   /* left: 0; */
//   //   right: 0 !important;
//   //   top: 0 !important;
//   //   /* margin: auto; */
//   //   /* opacity: 1; */
//   //   max-width: 100% !important;
//   //   max-height: 100% !important;
//   //   object-fit: cover !important;
//   //   /* width: 100%; */
//   //   /* height: 100%; */
//   //   object-position: top !important;
//   //   z-index: 100 !important;
//   // }
// `;

// const HomeBanner = props => {
//   const dispatch = useDispatch();

//   const userLocation = useSelector(
//     state => state.userLocationReducer,
//     shallowEqual
//   );

//   const {
//     id,
//     title,
//     code,
//     desc,
//     currency_sign,
//     image,
//     itemLargeImage,
//     price,
//     url
//   } = props.itemCard;

//   const itemUrl = `/${url}/iid/${id}`;

//   const storeProps = props.itemCard.properties;

//   console.info("xyz", desc);

//   const getHref = (text, type) => {
//     if (type == "phone") {
//       let num = text.replace(/[^a-zA-Z0-9 ]/g, "");
//       return "tel:" + num.replace(/\s/g, "");
//     } else if (type == "email") return "mailto:" + text;
//     else return null;
//   };

//   const handleStoreItemLocationIconClicked = () => {
//     if (userLocation.lat && userLocation.lng)
//       dispatch(setSelectedStoreToViewOnTheMapAction(props.itemCard));
//     else {
//       dispatch(fetchUserData());
//     }
//   };

//   const getDistance = props => {
//     let storeLat,
//       storeLng,
//       lat,
//       lng = null;

//     if (
//       props.latitude &&
//       props.longitude &&
//       userLocation.lat &&
//       userLocation.lng
//     ) {
//       storeLat = parseFloat(props.latitude);
//       storeLng = parseFloat(props.longitude);
//       lat = userLocation.lat;
//       lng = userLocation.lng;
//     }

//     if (storeLat != null && storeLng != null && lat != null && lng != null)
//       return (
//         getDistanceBetweenTwoCoords(storeLat, storeLng, lat, lng).toFixed() +
//         " Km"
//       );
//   };

//   const imageUrl = `https://ik.imagekit.io/tlp/tr:w-600,h-600/store/20180522154/assets/items/largeimages/${code}.jpg?ik-sdk-version=java-1.0.3`;
//   let storeName = title.replace(/ /g, "-").toLowerCase();

//   const supplierCode = storeProps.Supplier_Item_Code?.replace(
//     / /g,
//     "-"
//   ).toLowerCase();
//   console.log({ supplierCode, storeProps, props });
//   return (
//     <Wrapper className="popularmain">
//       <Link className="text-link" href={`${itemUrl}`}>
//         <a>
//           <div className="flex justify-center items-start">
//             <div className="flex w-full justify-center items-center flex-col content-wrapper">
//               <div className="w-full image-wrapper popularImage parent11">
//                 <img
//                   src={`https://ik.imagekit.io/ofb/themes/AdobeStock_292691963_hj7SfEZKwc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052309846`}
//                   alt={desc}
//                   className="image110"
//                 />
//                 <div className="top-left">Brand</div>

//                 <div className="top-right">15% Off</div>
//                 <div className="top-right1">
//                 <img
//                   src={`https://ik.imagekit.io/ofb/themes/Group_129_eXeZ3ZJnI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666063197242`}
//                 />
//                 </div>

                
//               </div>

//               <p className="popularDesc">{storeProps.Brand}</p>
//               <p className="font-semibold text-center popularTitle">{title}</p>

//               <span className="card__status">
//                 {currency_sign} {price.value.integer}.{price.value.decimal}
//               </span>

//               <div className="star-rating">
//                 <input type="radio" id="5-stars" name="rating" value="5" />
//                 <label htmlFor="5-stars" className="star">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="4-stars" name="rating" value="4" />
//                 <label htmlFor="4-stars" className="star">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="3-stars" name="rating" value="3" />
//                 <label htmlFor="3-stars" className="star">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="2-stars" name="rating" value="2" />
//                 <label htmlFor="2-stars" className="star">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="1-star" name="rating" value="1" />
//                 <label htmlFor="1-star" className="star">
//                   &#9733;
//                 </label>
//               </div>
//             </div>
//           </div>
//         </a>
//       </Link>

      

//     </Wrapper>
//   );
// };

// export default HomeBanner;
