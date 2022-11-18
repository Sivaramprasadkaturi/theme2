// import React, { useState } from "react";
// import Link from "next/link";
// import { useSelector, shallowEqual, useDispatch } from "react-redux";

// import { getDistanceBetweenTwoCoords } from "../utils/functions";
// import {
//   MdKeyboardArrowLeft,
//   MdKeyboardArrowRight,
//   MdKeyboardArrowUp
// } from "react-icons/md";
// import { setSelectedStoreToViewOnTheMapAction } from "../redux/actions/storesAction";
// import { fetchUserData } from "../redux/actions/loginActions";
// import styled from "styled-components";
// import { MdOutlineLocationOn } from "react-icons/md";
// import Image from "next/image";

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

// const StoreCard = props => {
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
//         <div className="itemBrandName">
//           <div className="itemBrandSupliern">{title}</div>
//           <div className="itemBrandDiscount">
//           <div className="discountFigure">15% off</div>
//           <div>

//           <img

//                   src={`https://ik.imagekit.io/ofb/themes/Group_129_eXeZ3ZJnI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666063197242`}
//                   className="image110 shareicon-items"
//                 />
//           </div>
//           </div>
//         </div>

//           <div className="flex justify-center items-start">
//             <div className="flex w-full justify-center items-center flex-col content-wrapper">

//               <div className="w-full image-wrapper popularImage parent11">
//                 <img
//                   src={`https://ik.imagekit.io/ofb/themes/AdobeStock_292691963_hj7SfEZKwc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052309846`}
//                   alt={desc}
//                   className="image110"
//                 />

//               <p className="popularDesc">{storeProps.Brand}</p>
//               <p className="font-semibold text-center popularTitle">{title}</p>

//               <span className="card__status">
//                 {currency_sign} {price.value.integer}.{price.value.decimal}
//               </span>

//               <div className="star-rating">
//                 <input type="radio" id="5-stars" name="rating" value="5" />
//                 <label htmlFor="5-stars" className="star1">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="4-stars" name="rating" value="4" />
//                 <label htmlFor="4-stars" className="star1">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="3-stars" name="rating" value="3" />
//                 <label htmlFor="3-stars" className="star1">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="2-stars" name="rating" value="2" />
//                 <label htmlFor="2-stars" className="star1">
//                   &#9733;
//                 </label>
//                 <input type="radio" id="1-star" name="rating" value="1" />
//                 <label htmlFor="1-star" className="star1">
//                   &#9733;
//                 </label>
//               </div>

//               <div className="addToCartProducts">
//                 <div className="wishlist_iconss">
//                   <img
//                     src={`https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950`}
//                     alt={desc}
//                   />
//                 </div>
//                 <div className="">
//                   <button className="button-add1">Add to Cart</button>
//                 </div>
//               </div>

//             </div>
//           </div>
//           </div>
//         </a>
//       </Link>

//     </Wrapper>
//   );
// };

// export default StoreCard;

import React, { useState } from "react";
import Link from "next/link";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getDistanceBetweenTwoCoords } from "../utils/functions";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowUp
} from "react-icons/md";
import { setSelectedStoreToViewOnTheMapAction } from "../redux/actions/storesAction";
import { fetchUserData } from "../redux/actions/loginActions";
import styled from "styled-components";
import { MdOutlineLocationOn } from "react-icons/md";
import Image from "next/image";

const Wrapper = styled.div`
  font-size: 14px;
  width: calc(100% - 10px);
  border-radius: 4px;
  background: #fff;
  overflow: hidden;
  transition: all 0.3s ease;
  // margin-bottom: 14px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  // :hover {
  //   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  // }
  .image-wrapper span {
    width: 100% !important;
    height: 100% !important;
  }

  .content-wrapper {
    text-align: center;
  }
  .popularImage {
    width: 100% !important;
    margin: 0px 0px;
    height: 350px;
    display: flex;
    align-items: center;
    position: relative;
    margin: 0 auto;
    margin-bottom: 10px;
    background: #fafafa;
  }
  .popularImage img {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    margin: auto;
    opacity: 1;
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    width: 100%;
    height: 100%;
    object-position: top;
  }
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    .popularImage {
      height: 150px !important;
    }
  }
  .popularTitle {
    letter-spacing: 0px;
    color: #212b36;
    opacity: 1;
    font-size: 14px;
    // margin-bottom: 10px;
  }
  .card__status {
    letter-spacing: 0px;
    color: #ce3c59;
    opacity: 1;
    font-size: 17px;
    margin-bottom: 10px;
    font-weight: 500;
  }

  .itemBrandSupliern8{
    width: 65%;
    padding: 10px 15px !important;
  }

  .discountFigurek{
    margin-left: -45px;
  }
  .imageLeft{
    margin-left: 8px;
  }

  .itemTitles {
    display: flex;
    // width: 32rem !important;
    margin-bottom: 8px;
}

.wishlist_iconss{
    margin-right: 11px !important;
    width: 21% !important;
}
`;

const StoreCard = props => {
  const dispatch = useDispatch();

  const userLocation = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const {
    id,
    title,
    code,
    desc,
    currency_sign,
    image,
    itemLargeImage,
    price,
    url
  } = props.itemCard;

  const itemUrl = `/${url}/iid/${id}`;

  const storeProps = props.itemCard.properties;

  console.info("xyz", desc);

  const getHref = (text, type) => {
    if (type == "phone") {
      let num = text.replace(/[^a-zA-Z0-9 ]/g, "");
      return "tel:" + num.replace(/\s/g, "");
    } else if (type == "email") return "mailto:" + text;
    else return null;
  };

  const handleStoreItemLocationIconClicked = () => {
    if (userLocation.lat && userLocation.lng)
      dispatch(setSelectedStoreToViewOnTheMapAction(props.itemCard));
    else {
      dispatch(fetchUserData());
    }
  };

  const getDistance = props => {
    let storeLat,
      storeLng,
      lat,
      lng = null;

    if (
      props.latitude &&
      props.longitude &&
      userLocation.lat &&
      userLocation.lng
    ) {
      storeLat = parseFloat(props.latitude);
      storeLng = parseFloat(props.longitude);
      lat = userLocation.lat;
      lng = userLocation.lng;
    }

    if (storeLat != null && storeLng != null && lat != null && lng != null)
      return (
        getDistanceBetweenTwoCoords(storeLat, storeLng, lat, lng).toFixed() +
        " Km"
      );
  };

  //const imageUrl = `https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/10673544/2019/9/24/6b9c7688-7ca2-4d11-9e5b-a3745ecd8f761569310358973-The-Indian-Garage-Co-Men-Shirts-8481569310357131-1.jpg`;
  const imageUrl = `https://ik.imagekit.io/tlp/tr:w-600,h-600/store/20180522154/assets/items/largeimages/${code}.jpg?ik-sdk-version=java-1.0.3`;
  let storeName = title.replace(/ /g, "-").toLowerCase();

  const supplierCode = storeProps.Supplier_Item_Code?.replace(
    / /g,
    "-"
  ).toLowerCase();
  console.log({ supplierCode, storeProps, props });
  return (
    <Wrapper className="popularmain">
      <Link className="text-link" href={`${itemUrl}`}>
        <a className="hiii">
          <div className="flex justify-center items-start items-startb">
            <div className="flex w-full justify-center items-center flex-col content-wrapper">
              {/* <div className="itemTitles">
                <div className="itemBrandSupliern itemBrandSupliern8">
                  <p>{title}</p></div>
                <div className="itemTitlesOff">
                  <h3 className="discountFigure discountFigurek">15% off</h3>
                <span className="imageLeft">
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/Group_129_eXeZ3ZJnI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666063197242`}
                    className="image110 shareicon-items"
                  />
                </span>
                </div>
              </div> */}
              <div style={{display: "flex", justifyContent: "space-between", padding: "0 10px", width: "-webkit-fill-available"}} className="itemwithoffer"> 
                <div>
                <h3 style={{marginTop: "6px", color: "#37455E",
    fontWeight: "500"}}>{title}</h3>
                </div>
                <div style={{display: "flex"}} className="discountflex">
                  <div className="discountCouponOff">
                  <h3 style={{marginTop: "6px", color: "#37455E", padding: "2px 14px",
    background: "#FDDA06", marginRight: "-11px"}}>15% off</h3>
                </div>
                <div style={{paddingLeft: "20px"}}>
                {/* <span className="imageLeft"> */}
                  <img
                    src={`https://ik.imagekit.io/ofb/themes/Group_129_eXeZ3ZJnI.png?ik-sdk-version=javascript-1.4.3&updatedAt=1666063197242`}
                    className="image110 shareicon-items"
                  />
                  </div>
                {/* </span> */}
                </div>

              </div>
              

              <div className="w-full image-wrapper popularImage">
                <img
                  src={`https://ik.imagekit.io/ofb/themes/AdobeStock_292691963_hj7SfEZKwc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052309846`}
                  alt={desc}
                  className="imgWrapperProductsItem"
                />
              </div>

              <p className="popularDesc">{storeProps.Brand}</p>
              <p className="font-semibold text-center popularTitle">{title}</p>

              <span className="card__status">
                {currency_sign} {price.value.integer}.{price.value.decimal}
              </span>

              <div className="star-rating star-ratingsz">
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
                  />
                </div>
                <div className="">
                  <button className="button-add1">Add to Cart</button>
                </div>
              </div>





            </div>
          </div>
        </a>
      </Link>
    </Wrapper>
  );
};

export default StoreCard;
