import React, { useMemo } from "react";
import * as classes from "./Slide.module.css";
function Slide({ children, open }) {
  let tempStyles;
  //   let result = useMemo(() => {
  //     switch (direction) {
  //       case "left":
  //         return {
  //           transform: "translateX(-100%)",
  //           transition: "transform 0.5s ease-in-out"
  //         };
  //       case "right":
  //         return {
  //           transform: "translateX(100%)",
  //           transition: "transform 0.5s ease-in-out"
  //         };
  //       case "up":
  //         return {
  //           transform: "translateY(-100%)",
  //           transition: "transform 0.5s ease-in-out"
  //         };
  //       case "down":
  //         return {
  //           transform: "translateY(100%)",
  //           transition: "transform 0.5s ease-in-out"
  //         };
  //       default:
  //         return {
  //           transform: "translateX(0)",
  //           transition: "transform 0.5s ease-in-out"
  //         };
  //     }
  //   }, [direction]);
  //   if (result) {
  //     tempStyles = {
  //       ...result,
  //       ...style
  //     };
  //   } else {
  //     tempStyles = {
  //       ...style
  //     };
  //   }

  return (
    <div open={open} className={classes.wrapper}>
      {children}
    </div>
  );
}

export default Slide;
