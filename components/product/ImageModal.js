import React, { useRef, useEffect, useCallback, useState } from "react";
import styled from "styled-components";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import {
  MdArrowBackIosNew,
  MdOutlineArrowForwardIos,
  MdClose
} from "react-icons/md";

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
  color: #000;
`;

export const ImageModal = ({
                             showModal,
                             setShowModal,
                             image,
                             itemDetailState
                           }) => {
  const modalRef = useRef();
  const [index, setIndex] = useState(0);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT;

  const [mainImage, setMainImage] = useState("");
  const [zoom, setZoom] = useState(false);
  const [isImage, setIsImage] = useState(true);

  console.log("ITEM DETAIL STATE ", itemDetailState);

  useEffect(() => {
    setMainImage(image);
    if (image.includes("-")) {
      setIndex(image.split("-")[1]?.split(".jpg")[0] - 1);
    } else {
      setIndex(0);
    }
  }, [image]);

  const closeModal = e => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  const handleLeftArrowClick = (code, i) => {
    setIndex((i += 1));
    if (index < itemDetailState?.additionalImages?.split(",").length) {
      setMainImage(
        `${baseUrl}/store/20180522154/assets/items/largeimages/${
          itemDetailState && itemDetailState.code
        }-${i + 1}.jpg`
      );
      if (!isImage) setIsImage(true);
    } else {
      setIndex(0);
      setMainImage(
        `${baseUrl}/store/20180522154/assets/items/largeimages/${
          code || (itemDetailState && itemDetailState.code)
        }.jpg`
      );
    }
  };

  const handleRightArrowClick = (code, i) => {
    setIndex((i -= 1));
    if (index > 1) {
      setMainImage(
        `${baseUrl}/store/20180522154/assets/items/largeimages/${
          itemDetailState && itemDetailState.code
        }-${i + 1}.jpg`
      );
      if (!isImage) setIsImage(true);
    } else if (index === 0) {
      setIndex(itemDetailState?.additionalImages?.split(",").length);
      setMainImage(
        `${baseUrl}/store/20180522154/assets/items/largeimages/${
          itemDetailState && itemDetailState.code
        }-${itemDetailState?.additionalImages?.split(",").length + 1}.jpg`
      );
    } else {
      setMainImage(
        `${baseUrl}/store/20180522154/assets/items/largeimages/${
          itemDetailState && itemDetailState.code
        }.jpg`
      );
    }
  };

  const keyPress = useCallback(
    e => {
      if (e.key === "Escape" && showModal) {
        setShowModal(false);
        setIndex(0);
        setMainImage(image);
      }
    },
    [setShowModal, showModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            ref={modalRef}
            onClick={closeModal}
          >
            <div className={`relative my-6 mx-auto`}>
              <div className="border-0 mt-20 relative flex flex-col w-full">
                <div style={{ zIndex: "100" }}>
                  <InnerImageZoom
                    src={mainImage}
                    zoom={mainImage}
                    className="max-w-5xl"
                    width={zoom ? 1280 : 600}
                    height={zoom ? 250 : 150}
                    afterZoomIn={() => setZoom(true)}
                    afterZoomOut={() => setZoom(false)}
                  />
                  <CloseModalButton
                    onClick={() => {
                      setShowModal(prev => !prev);
                      setIndex(0);
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  background: "transparent",
                  color: "transparent",
                  position:"absolute",
                  top: "0",
                  bottom: "0",
                  left: "0",
                  right: "0",
                  margin: "auto",
                  height: "20px",
                }}
              >
                <div
                  style={{
                    // display: "block"
                    // justifyContent: "space-between"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                  }}>
                    <MdArrowBackIosNew
                      style={{
                        fontSize: "3em",
                        color: "black",
                        zIndex: "101",
                        background: "rgba(255, 255, 255, 0.4)",
                        border: "2px solid #d3d3d3"
                      }}
                      onClick={() =>
                        handleLeftArrowClick(itemDetailState.code, index)
                      }
                    />
                    <MdOutlineArrowForwardIos
                      style={{
                        fontSize: "3em",
                        color: "black",
                        zIndex: "101",
                        background: "rgba(255, 255, 255, 0.4)",
                        border: "2px solid #d3d3d3"
                      }}
                      onClick={() =>
                        handleRightArrowClick(itemDetailState.code, index)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};
