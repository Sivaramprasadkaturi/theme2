import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  MdOutlineLocationOn,
  MdOutlinePhone,
  MdOutlineDirectionsCar,
  MdChevronRight,
  MdChevronLeft,
  MdPublic
} from "react-icons/md";
// import classes from "../Styles/SelectedStoreDetails.module.css";

const Wrapper = styled.div`
  .storeContainer {
    width: 275px;
    line-height: initial;
  }

  .storeWrapper {
    background-color: #fff;
  }

  .storeImage {
    height: 200px;
    display: flex;
    width: 100%;
  }

  .storeImage img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }

  .title {
    margin-top: 0px;
    padding: 20px;
    font-weight: 400;
    font-size: 17px;
  }

  .directionsBtn {
    display: flex;
    align-items: center;
    padding: 20px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .storeDetailsWrapper {
    padding: 15px 0;
  }

  .phoneWrapper,
  .addressWrapper,
  .websiteWrapper {
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }

  .direction {
    cursor: pointer;
    background-color: #1c72e8;
    color: #fff;
    border-radius: 2px;
    padding: 7px;
  }

  .phone,
  .direction,
  .address,
  .website {
    margin-left: 15px;
    font-weight: 300;
  }

  .website {
    cursor: pointer;
  }

  .phoneWrapper i,
  .directionsBtn i,
  .addressWrapper i,
  .websiteWrapper i {
    position: absolute;
    color: #1c72e8;
  }

  .collapseBtn {
    display: none;
    position: absolute;
    right: 0;
    transform: translateX(50%);
    height: 45px;
    align-items: center;
    background-color: #1c72e8;
    color: #fff;
    cursor: pointer;
    transition: transform 0.5s ease-in;
  }

  .collapseBtn::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    transform: translateY(100%);
    border-left: 12px solid #173947;
    border-bottom: 6px solid transparent;
  }

  @media all and (max-width: 768px) {
    .storeContainer {
      width: 240px;
    }

    .title {
      margin: 0;
    }

    .storeImage {
      height: 190px;
    }

    .collapseBtn {
      display: flex;
    }

    .storeWrapper {
      box-shadow: 0 1px 4px #999;
    }
  }

  @media all and (max-width: 480px) {
    .storeContainer {
      width: 220px;
    }
  }
`;

const SelectedStoreDetails = ({
  collapsed,
  setCollapsed,
  setDirectionsRequested
}) => {
  const dispatch = useDispatch();

  const selectedStoreToViewOnTheMapState = useSelector(
    state => state.storeReducer.selectedStoreToViewOnTheMap,
    shallowEqual
  );

  console.log("SEleceted store ", selectedStoreToViewOnTheMapState);

  if (selectedStoreToViewOnTheMapState) {
    const { title, image, properties } = selectedStoreToViewOnTheMapState;
    const { LineAddress1, City, ProvinceAbv, ZIPCode, Website, Phone } =
      properties;
    return (
      <Wrapper>
        <div className={"storeContainer"}>
          <div
            onClick={() => setCollapsed(!collapsed)}
            className={"collapseBtn"}
            title={collapsed ? "expand" : "collapse"}
          >
            <i className="material-icons">
              {collapsed ? <MdChevronRight /> : <MdChevronLeft />}
            </i>
          </div>

          <div className="storeWrapper">
            <div className="storeImage">
              <img src={image.replace("images", "largeimages")} alt={title} />
            </div>
            <div className="title">{title}</div>
            <div className="directionsBtn">
              <MdOutlineDirectionsCar
                style={{ fontSize: "1.5em", color: "#1c72e8" }}
              />
              <span
                className="direction"
                onClick={() => {
                  setDirectionsRequested(true);
                  setCollapsed(true);
                }}
              >
                Directions
              </span>
            </div>
            <div className="storeDetailsWrapper">
              <div className="addressWrapper">
                <MdOutlineLocationOn
                  style={{ fontSize: "2em", color: "#1c72e8" }}
                />
                <div className="address">
                  {LineAddress1}, {City}, {ProvinceAbv} {ZIPCode}
                </div>
              </div>
              {Website && (
                <div className="websiteWrapper">
                  <MdPublic style={{ fontSize: "1.5em", color: "#1c72e8" }} />
                  <a
                    href={Website}
                    target="_blank"
                    rel="noreferrer"
                    className="website"
                  >
                    {Website.replace("https://www.", "").replace("com/", "com")}
                  </a>
                </div>
              )}
              <div className="phoneWrapper">
                <MdOutlinePhone
                  style={{ fontSize: "1.5em", color: "#1c72e8" }}
                />
                <div className="phone">{Phone}</div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  } else {
    return null;
  }
};

export default SelectedStoreDetails;
