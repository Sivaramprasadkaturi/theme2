import React, { useEffect, useState } from "react";
import Link from "next/link";
import MobileStepper from "@material-ui/core/MobileStepper";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import LazyLoad from "react-lazyload";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import Image from "next/image";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

// const banners = [
//   {
//     label: "",
//     imgPath: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/bannerMain-CWI-Full.jpg`,
//     imgPathMobile: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/bannerMain-CWI-Mobile.jpg`,
//     redirectUrl: `/`
//   },
//   {
//     label: "",
//     imgPath: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/bannerMain-PageOne-Full.jpg`,
//     imgPathMobile: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/bannerMain-PageOne-Mobile.jpg`,
//     redirectUrl: `/`
//   },
//   {
//     label: "",
//     imgPath: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/bannerMain-Tubicen-Full.jpg`,
//     imgPathMobile: `${process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK}/store/${process.env.NEXT_PUBLIC_VID}/assets/images/storefront/tubicen-min.jpg`,
//     redirectUrl: "/"
//   }
// ];

const HomeSlider = ({ carousel }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  // const maxSteps = banners.length;

  const breakpoint = 1367;
  const [homeCarousel, setHomeCarousel] = useState(carousel[0].Carousel);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleStepChange = step => {
    setActiveStep(step);
  };

  return (
    <>
      <AutoPlaySwipeableViews
        interval={6000}
        axis={"x"}
        style={
          currentScreenWidthState >= breakpoint
            ? { width: "auto", height: 360 }
            : { width: "auto", height: "auto" }
        }
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {!isMobileState
          ? homeCarousel.map((item, index) => {
              return (
                <div key={index}>
                  <Link href={item.URL}>
                    <a>
                      <Image
                        layout="responsive"
                        priority={true}
                        src={item.image_desktop.url}
                        width="100%"
                        height="28px"
                        alt={item.image_desktop.name}
                      />
                      {/* <img
                  alt={item.image_desktop.name}
                  loading="lazy"
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  srcSet={`${item.image_mobile.url} 500w, ${item.image_desktop.url} 1024w`}
                  src={item.image_desktop.url}
                /> */}
                      {/*<picture>*/}
                      {/*  <source*/}
                      {/*    media="(min-width: 769px)"*/}
                      {/*    srcSet={item.image_desktop.url}*/}
                      {/*  />*/}
                      {/*  <source*/}
                      {/*    media="(min-width: 350px)"*/}
                      {/*    srcSet={item.image_mobile.url}*/}
                      {/*  />*/}
                      {/*  <img*/}
                      {/*    src={item.image_desktop.url}*/}
                      {/*    alt={item.image_desktop.name}*/}
                      {/*  />*/}
                      {/*</picture>*/}
                    </a>
                  </Link>
                </div>
              );
            })
          : //  homeCarousel.map(i => i.image_mobile[0].url)
            homeCarousel.map((item, index) => (
              <div key={index}>
                <Link href="/">
                  <a>
                    <Image
                      layout="responsive"
                      priority={true}
                      src={item.image_mobile[0].url}
                      width="100%"
                      height="50px"
                      alt={item.image_mobile[0].name}
                    />
                  </a>
                </Link>
              </div>
            ))}
      </AutoPlaySwipeableViews>
      <LazyLoad>
        <MobileStepper
          steps={homeCarousel.length}
          position="static"
          variant="text"
          activeStep={activeStep}
          // nextButton=""
          // backButton=""
          nextButton={
            <button
              size="small"
              onClick={handleNext}
              disabled={activeStep === homeCarousel.length - 1}
            >
              <MdKeyboardArrowRight
                style={{
                  fontSize: "3.6em",
                  background: "rgba(255,255,255,0.4)",
                  border: "1px solid white"
                }}
              />
            </button>
          }
          backButton={
            <button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <MdKeyboardArrowLeft
                style={{
                  fontSize: "3.6em",
                  background: "rgba(255,255,255,0.4)",
                  border: "1px solid white"
                }}
              />
            </button>
          }
          style={
            currentScreenWidthState >= breakpoint
              ? {
                  top: "-200px",
                  position: "relative",
                  background: "transparent",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0",
                  color: "transparent"
                }
              : {
                  top: "-75px",
                  position: "relative",
                  background: "transparent",
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "0",
                  color: "transparent",
                  zIndex: 1
                }
          }
        />
      </LazyLoad>
    </>
  );
};

export default HomeSlider;
