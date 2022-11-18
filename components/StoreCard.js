import React, { useState } from "react";
import Link from "next/link";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

import { getDistanceBetweenTwoCoords } from "../utils/functions";

import { setSelectedStoreToViewOnTheMapAction } from "../redux/actions/storesAction";
import { fetchUserData } from "../redux/actions/loginActions";
import styled from "styled-components";
import { MdOutlineLocationOn } from "react-icons/md";
import Image from "next/image";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .image-wrapper span {
    width: 100% !important;
    height: 100% !important;
  }

  .image-wrapper img {
    object-fit: cover !important;
  }

  .content-wrapper {
    text-align: center;
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

  const storeProps = props.itemCard.properties;
  const tel = "(705) 722-0333";

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

  const imageUrl = `https://ik.imagekit.io/ofb/dev/store/20180522154/assets/items/largeimages/${code}.jpg`;
  let storeName = title.replace(/ /g, "-").toLowerCase();

  const supplierCode = storeProps.Supplier_Item_Code?.replace(
    / /g,
    "-"
  ).toLowerCase();
  console.log({ supplierCode, storeProps, props });
  const storeUrl = `/store/${supplierCode}/`;
  return (
    <Wrapper style={{ border: "1px solid rgb(232, 228, 228)", margin: "5px 0px 5px 0px" }}>
      <Link
        className="text-link"
        href={{ pathname: storeUrl, query: { storeCode: code } }}
        /*    href={`${url.replace("product/stores/", "/store/").split("-ain")[0]}`} */
      >
        <a>
          <div className="flex justify-center items-start">
            <div className="flex w-full justify-center items-center flex-col content-wrapper">
              <div
                className="w-full image-wrapper"
                style={{ backgroundColor: "#fff", width: "50%" }}
              >
                <Image
                  width={300}
                  height={300}
                  layout="intrinsic"
                  alt={storeName}
                  src={`${imageUrl}?tr=w-300,h-300,cm-pad_resize,bg-FFFFFF, q-80`}
                  placeholder="blur"
                  blurDataURL={`${imageUrl}?tr=w-30,h-30,cm-pad_resize,bg-FFFFFF, q-60`}
                />
                {/*     <img
                  className="h-full w-auto object-contain"
                  style={{ margin: "0 auto" }}
                
                  alt="image"
                /> */}
              </div>

              {/* <p className="font-semibold text-center mt-3 mb-3">{title}</p>
              <p className="text-xs p-1">{storeProps.LineAddress1}</p>
              <p className="text-xs p-1">{storeProps.Phone}</p> */}
            </div>
          </div>
        </a>
      </Link>
      {/* <div
        onClick={handleStoreItemLocationIconClicked}
        className="storeItemLocationIcon"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "0.5em",
          marginBottom: "0.7em",
          zIndex: "1"
        }}
      >
        <MdOutlineLocationOn
          style={{
            fontSize: "2.2em",
            fontWeight: "bold",
            color: "#B94F39",
            cursor: "pointer"
          }}
        />
      </div> */}
    </Wrapper>

    // <Wrapper>
    //   <div className="wrapper">
    //     <div className="imageWrapper">
    //       <Link
    //         href={"/asd"}
    //       >
    //         <a>
    //           <img
    //             src={imageUrl}
    //             className="img-responsive"
    //             alt={`${title} Image`}
    //           />
    //         </a>
    //       </Link>
    //     </div>
    //     {props.renderedBy === "sellers-page" && (
    //       <div
    //         onClick={handleStoreItemLocationIconClicked}
    //         className="storeItemLocationIcon"
    //       >
    //         <img src={Location} />
    //       </div>
    //     )}
    //     <div className="titleWrapper">
    //       <div className="flex">
    //       <span className="title" title={title}>
    //         {title}
    //       </span>
    //         {/* {userLocation.lat && userLocation.lng && (
    //         <span className={classes.distance}>{getDistance(storeProps)}</span>
    //       )} */}
    //       </div>
    //
    //       {storeProps.LineAddress1 ? (
    //         <span className="addressSpan" title={storeProps.LineAddress1}>
    //         {storeProps.LineAddress1}
    //       </span>
    //       ) : (
    //         <span></span>
    //       )}
    //
    //       {/* <span className={classes.addressSpan}>
    //       <b>{storeProps.City ? storeProps.City + ", " : null}</b>
    //       <b>{storeProps.ProvinceAbv ? storeProps.ProvinceAbv + " " : null}</b>
    //       <b>{storeProps.PostalCode ? storeProps.PostalCode : null}</b>
    //     </span> */}
    //
    //       <span className="withIcon">
    //       {storeProps.Phone ? (
    //         <>
    //           <a
    //             className="phone"
    //             href={getHref(storeProps.Phone, "phone")}
    //           >
    //             {storeProps.Phone}
    //           </a>
    //         </>
    //       ) : null}
    //     </span>
    //       {/* <span className={classes.withIcon}>
    //       {storeProps.Email ? (
    //         <>
    //           <i className="material-icons">email</i>
    //           <a
    //             className={classes.phone}
    //             href={getHref(storeProps.Email, "email")}
    //           >
    //             {storeProps.Email}
    //           </a>
    //         </>
    //       ) : null}
    //     </span> */}
    //     </div>
    //   </div>
    // </Wrapper>
  );
};

export default StoreCard;
