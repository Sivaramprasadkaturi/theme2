import { useRef, useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const MobileCarousel = ({ code, hiddenProps, className, video }) => {
  const YOUTUBE_IMAGE_URL = videoId => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };
  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT;

  const numImgsObj = (
    (itemDetailState && itemDetailState.hiddenProperties) ||
    hiddenProps
  ).find((prop, index) => {
    if (prop.propname == "Sys_Num_Images") return true;
  });

  const numImgs = parseInt(numImgsObj.propvalue);

  const settings = {
    // customPaging: function (i) {
    //   return (
    //     <a className="w-full h-full " key={i}>
    //       <Image
    //         src={`${baseUrl}/store/20180522154/assets/items/thumbnails/${
    //           itemDetailState && itemDetailState.code
    //         }${i > 0 ? `-${i + 1}.jpg` : `.jpg`}`}
    //         width="100"
    //         height="100"
    //         alt={"product " + code}
    //         layout="responsive"
    //       />
    //     </a>
    //   );
    // },
    dots: true,
    lazyLoad: true,
    infinite: true,
    dotsClass: "slick-dots slick-thumb",

    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    width: "100%"
  };

  const wrapperRef = useRef();
  const [height, setHeight] = useState(null);

  useEffect(() => {
    if (wrapperRef && wrapperRef.current && wrapperRef.current.clientWidth) {
      setHeight(wrapperRef.current.clientWidth);
    }
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        marginBottom: 40
      }}
    >
      {/* <div className="w-full mb-36"> */}
      <Slider {...settings}>
        {" "}
        <div className="w-full p-2" style={{ width: "100%", padding: "2px" }}>
          <img
            src={`${baseUrl}/store/20180522154/assets/items/largeimages/${
              (itemDetailState && itemDetailState.code) || code
            }.jpg`}
            alt=""
          />{" "}
        </div>
        {numImgs > 0 &&
          [...Array(numImgs)].map((e, i) => {
            if (i > 0) {
              return (
                <div key={i} className="w-full p-2" style={{ width: "100%" }}>
                  <Image
                    src={`${baseUrl}/store/20180522154/assets/items/largeimages/${
                      itemDetailState && itemDetailState.code
                    }${i > 0 ? `-${i + 1}.jpg` : `.jpg`}`}
                    width="100"
                    height="100"
                    alt={"product " + code}
                    layout="responsive"
                  />
                </div>
              );
            }
          })}
        {video.map((v, i) => {
          return (
            <div
              key={i}
              className="w-full p-2"
              style={{
                display: "block",
                width: "100%",
                height: height !== null ? height : null,
                marginBottom: "30px",
                padding: "2px"
              }}
            >
              <div style={{ paddingBottom: "30px" }}>
                <iframe
                  id={`main-img-${code}`}
                  width="100%"
                  height={height !== null ? height : null}
                  src={`//www.youtube.com/embed/${v.code}?rel=0`}
                  frameBorder={0}
                  iv_load_policy="3"
                  modestbranding="1"
                  allowFullScreen={true}
                ></iframe>
              </div>
            </div>
          );
        })}
      </Slider>
      {/* </div> */}
    </div>
  );
};

export default MobileCarousel;
