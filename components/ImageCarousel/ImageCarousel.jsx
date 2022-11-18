import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import {
  Magnifier,
  GlassMagnifier,
  SideBySideMagnifier,
  MagnifierContainer,
  MagnifierPreview,
  MagnifierZoom,
  PictureInPictureMagnifier,
  MOUSE_ACTIVATION,
  TOUCH_ACTIVATION
} from "react-image-magnifiers";

import classes from "./Styles/ImageCarousel.module.css";

import { GET_ITEM_VIDEO } from "../../redux/links";

const ImageCarousel = () => {
  const [mainImage, setMainImage] = useState("");
  const [galleryImagesCount, setGalleryImagesCount] = useState([]);
  const [sysNumImages, setSysNumImages] = useState(0);
  const [itemVideos, setItemVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({
    display: false,
    videoId: ""
  });

  const [displayVideoFirst, setDisplayVideoFirst] = useState(false);

  const productInitialState = useSelector(
    state => state.productReducer.product,
    shallowEqual
  );

  const itemIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const productCode = useSelector(
    state => state.productReducer.itemDetail.code,
    shallowEqual
  );

  const loadingState = false; /* useSelector(
    state => state.productReducer.loading,
    shallowEqual
  ); */

  const hiddenPropertiesState = useSelector(
    state => state.productReducer.itemDetail.hiddenProperties,
    shallowEqual
  );

  const propertiesState = useSelector(
    state => state.productReducer.itemDetail.properties,
    shallowEqual
  );

  // Fetch the item videos on component mount
  useEffect(() => {
    if (itemIdState) {
      fetch(GET_ITEM_VIDEO.replace("$ITEMID", itemIdState))
        .then(data => data.json())
        .then(json => setItemVideos(json))
        .catch(err => {
          console.error("err fetching item videos", err);
        });
    }
  }, [itemIdState]);

  useEffect(() => {
    if (displayVideoFirst) {
      let firstVideoId =
        itemVideos &&
        itemVideos.records &&
        itemVideos.records.length > 0 &&
        itemVideos.records.filter(video => video.active);

      if (firstVideoId) firstVideoId = firstVideoId[0];

      if (firstVideoId) {
        firstVideoId = getVideoIdFromVideo(firstVideoId);
        setSelectedVideo({ display: true, videoId: firstVideoId });
      }
    } else {
      setSelectedVideo({ display: false, videoId: "" });
    }
  }, [displayVideoFirst, itemVideos]);

  useEffect(() => {
    setMainImage(productCode);
  }, [productCode]);

  useEffect(() => {
    if (propertiesState) {
      let tempNumber = propertiesState.filter(prop => {
        if (prop.propname === "Sys_Gallery_Images") {
          return true;
        } else {
          return false;
        }
      });
      tempNumber = tempNumber && tempNumber[0] && tempNumber[0].propvalue;
      let tempArray = [];

      for (let i = 1; i < Number(tempNumber); i++) {
        tempArray.push(i);
      }

      setGalleryImagesCount(tempArray);
    }
  }, [propertiesState]);

  useEffect(() => {
    if (hiddenPropertiesState) {
      let prop = hiddenPropertiesState.find(prop => {
        return prop.propname == "Sys_Num_Images";
      });

      let displayVideoFirstProp = hiddenPropertiesState.find(prop => {
        return prop.propname == "display_video_first";
      });
      if (parseInt(prop.propvalue) >= 1) {
        setSysNumImages(parseInt(prop.propvalue));
      }
      if (displayVideoFirstProp) {
        setDisplayVideoFirst(displayVideoFirstProp.propvalue === "true");
      } else {
        setDisplayVideoFirst(false);
      }
    }
  }, [hiddenPropertiesState]);

  let renderMagnifier;

  let renderVideo;

  if (selectedVideo.display && selectedVideo.videoId) {
    renderVideo = (
      <div
        id="youtube-video"
        style={{
          display: selectedVideo.display ? "block" : "none",
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%"
        }}
      >
        <iframe
          id={`${selectedVideo.videoId}-vid`}
          width="100%"
          height="100%"
          src={`//www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
          frameBorder={0}
          iv_load_policy="3"
          modestbranding="1"
          allowFullScreen={true}
        ></iframe>
      </div>
    );
  } else {
    renderVideo = null;
  }

  let displayMagnifier = !selectedVideo.display;

  // if (isMobileState) {
  if (true) {
    renderMagnifier = (
      <Magnifier
        cursorStyle="zoom-in"
        className="input-position"
        imageSrc={`${mainImageUrl}${mainImage}.jpg`}
        imageAlt={`${productInitialState.title}`}
        largeImageSrc={
          mainImageUrl.includes("demob2b2c.avetti")
            ? `${mainImageUrl}${mainImage}.jpg`
            : `${mainImageUrl.replace("images", "largeimages")}${mainImage}.jpg`
        }
        mouseActivation={MOUSE_ACTIVATION.CLICK}
        touchActivation={TOUCH_ACTIVATION.TAP}
        dragToMove={true}
      />
    );
  } else {
    renderMagnifier = (
      <MagnifierContainer className="magnifier-container">
        <div className="magnifier-preview-wrapper">
          <MagnifierPreview
            className="magnifier-preview"
            imageSrc={`${mainImageUrl}${mainImage}.jpg`}
            imageAlt={`${productInitialState.title}`}
          />
        </div>
        {
          <div className="magnifier-zoom-wrapper">
            <MagnifierZoom
              className="magnifier-zoom"
              imageSrc={
                mainImageUrl.includes("demob2b2c.avetti")
                  ? `${mainImageUrl}${mainImage}.jpg`
                  : `${mainImageUrl.replace(
                      "images",
                      "largeimages"
                    )}${mainImage}.jpg`
              }
            />
          </div>
        }
      </MagnifierContainer>
    );
  }

  const getVideoIdFromVideo = video => {
    let videoId = "";
    if (video.link.includes("watch?v="))
      videoId = video.link.split("watch?v=")[1];
    else videoId = video.link.split("be/")[1];

    return videoId;
  };

  const renderItemVideos = () => {
    return (
      itemVideos &&
      itemVideos.records &&
      itemVideos.records.map((video, index) => {
        if (video.active) {
          let videoId = getVideoIdFromVideo(video);

          return (
            <li key={index}>
              <i className="material-icons play-icon-item-video">play_arrow</i>
              {/* <img
                className="img-thumb"
                src={YOUTUBE_IMAGE_URL(videoId)}
                alt={video.title}
                // style={{
                //   border: "1px solid #333"
                // }}
                onClick={() => handleImageChange(videoId, "video")}
              ></img> */}
            </li>
          );
        } else {
          return null;
        }
      })
    );
  };

  const renderGalleryImages = () => {
    if (galleryImagesCount.length > 0) {
      return galleryImagesCount.map(num => (
        <li key={num}>
          {/* <img
            className="img-thumb"
            src={`${gallery_images_url}${productCode}-${num}.jpg`}
            alt=""
            // style={{
            //   border: "1px solid #333"
            // }}
            onClick={() =>
              handleImageChange(`${productCode}-${num}`, "gallery")
            }
          /> */}
        </li>
      ));
    } else if (sysNumImages > 0) {
      return [...Array(sysNumImages)].map((e, num) => {
        let image = productCode + (num > 0 ? `-${num + 1}` : "");
        return (
          // ? additionalImages.map((img, index) => (
          <li key={num}>
            {/* <img
              className="img-thumb"
              src={`${image_store_url}${image}.jpg`}
              alt=""
              // style={{
              //   border: "1px solid #333"
              // }}
              onClick={() => handleImageChange(`${image}`)}
            /> */}
          </li>
        );
      });
    }
  };

  if (!loadingState && mainImage) {
    return (
      // <div id="imageGrid">
      <div className={classes.wrapper}>
        <div id="product_carousel">
          <div className="controls dis-none">
            <a href="" className="prev">
              <span className="glyphicon glyphicon-arrow-left"></span>
            </a>
            <a href="" className="next">
              <span className="glyphicon glyphicon-arrow-right"></span>
            </a>
          </div>
          <div
            className="jcarousel thumbs"
            id="jcarousel-thumbs"
            data-jcarousel="true"
          >
            <ul
              className="image-carousel-list-wrapper"
              style={{
                left: "0px",
                top: "0px",
                display:
                  galleryImagesCount.length == 0 && sysNumImages == 1
                    ? "none"
                    : ""
              }}
            >
              {renderGalleryImages()}
              {renderItemVideos()}
            </ul>
          </div>
        </div>

        <div className="preview" id="item-img">
          <div
            style={{
              display: selectedVideo.display ? "block" : "none",
              width: "100%",
              position: "relative",
              paddingTop: "100%"
            }}
            className="video-outer-container"
          >
            {renderVideo}
          </div>

          <div
            className="magnify-container"
            style={{ display: displayMagnifier ? "block" : "none" }}
          >
            {renderMagnifier}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="imageGrid">
        <div className="preview" id="item-img">
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "100%",
              background: "white"
            }}
          >
            <div></div>
          </div>

          {/* <span id="itemImg22" style={{ display: "inline-block" }}>
            <img
              id="js-item-image-267578"
              name="slika"
              src={productInitialState.image}
              className="img-responsive"
              style={{
                cursor: "pointer",
                float: "left",
                border: "1px solid #333"
              }}
              title={productInitialState.title}
            />
          </span> */}
        </div>
      </div>
    );
  }
};

export default ImageCarousel;
