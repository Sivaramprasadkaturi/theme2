import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from "react";
import { useSelector, shallowEqual } from "react-redux";
import * as classes from "./Carousel.module.css";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Carousel({
  itemClass,
  carouselClass,
  children,
  infinite,
  showDots,
  showArrows,
  arrowsClass = "",
  autoPlay,
  autoPlaySpeed,
  responsive,
  ssr
}) {
  const containerRef = useRef(null);

  const numberOfItems = children.length;

  const [currentIndex, setCurrentIndex] = useState(0);

  const [containerWidth, setContainerWidth] = useState(
    containerRef.current && containerRef.current.clientWidth
  );

  const [transitionState, setTransitionState] = useState(true);

  const [breakPointItemsState, setBreakPointItemsState] = useState(
    ssr ? 1 : null
  );

  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );

  useEffect(() => {
    if (autoPlay) {
      setTimeout(() => {
        handleSlideNext();
      }, autoPlaySpeed);
    }
  }, [autoPlay, autoPlaySpeed, currentIndex]);

  useEffect(() => {
    setContainerWidth(containerRef.current && containerRef.current.clientWidth);
  }, [currentScreenWidthState]);

  const itemWidth = useMemo(() => {
    if (
      responsive &&
      Object.keys(responsive) &&
      currentScreenWidthState &&
      containerWidth
    ) {
      const keys = Object.keys(responsive);
      const key = keys.find(k => {
        if (
          currentScreenWidthState <= responsive[k].breakpoint.max &&
          currentScreenWidthState > responsive[k].breakpoint.min
        ) {
          return true;
        }
      });

      const breakPointItems = responsive[key].items;

      setBreakPointItemsState(breakPointItems);

      return containerWidth / breakPointItems;
    }
  }, [currentScreenWidthState, responsive, containerWidth]);

  const handleSlidePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    } else if (infinite) {
      setTransitionState(false);
      setTimeout(() => setTransitionState(true), 100);
      setCurrentIndex(numberOfItems - breakPointItemsState);
    }
  };

  const handleSlideNext = () => {
    if (currentIndex < numberOfItems - breakPointItemsState) {
      setCurrentIndex(currentIndex => currentIndex + 1);
    } else if (infinite) {
      setTransitionState(false);
      setTimeout(() => setTransitionState(true), 100);
      setCurrentIndex(0);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`${classes.wrapper}${
        carouselClass ? " " + carouselClass : ""
      }`}
    >
      {numberOfItems > 0 && breakPointItemsState && (
        <React.Fragment>
          {showArrows && numberOfItems > breakPointItemsState && (
            <button
              onClick={handleSlidePrev}
              className={[
                classes.arrowBtn,
                classes.leftArrow,
                arrowsClass
              ].join(" ")}
              aria-label="button"
            >
              <MdKeyboardArrowLeft />
            </button>
          )}
          <ul
            style={{
              width: ssr ? "100%" : "",
              transition: transitionState
                ? `transform 400ms ease-in-out 0s`
                : "",
              overflow: "unset",
              transform: `translate3d(-${itemWidth * currentIndex}px, 0px, 0px)`
            }}
            className={classes.list}
          >
            {children.map((item, index) => {
              const ariaHidden =
                index < currentIndex ||
                index >= currentIndex + breakPointItemsState;

              return (
                <li
                  aria-hidden={ariaHidden}
                  style={{
                    width: ssr && index === 0 ? "100%" : !ssr ? itemWidth : ""
                  }}
                  key={`li-${item.key}`}
                  className={`${classes.item}${
                    itemClass ? " " + itemClass : ""
                  }`}
                >
                  {item}
                </li>
              );
            })}
          </ul>
          {showArrows && numberOfItems > breakPointItemsState && (
            <button
              onClick={handleSlideNext}
              className={[
                classes.arrowBtn,
                classes.rightArrow,
                arrowsClass
              ].join(" ")}
              aria-label="button"
            >
              <MdKeyboardArrowRight />
            </button>
          )}
        </React.Fragment>
      )}
    </div>
  );
}
