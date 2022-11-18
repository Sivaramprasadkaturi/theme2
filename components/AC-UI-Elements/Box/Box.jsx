import React from "react";
import * as classes from "./Box.module.css";
function Box({
  children,
  flex,
  display,
  justifyContent,
  p,
  flexDirection,
  customClassName,
  customStyle
}) {
  let tempStyles = {
    flex,
    display,
    flexDirection,
    justifyContent,
    padding: `${p * 8}px`
  };
  return (
    <div
      className={customClassName || classes.wrapper}
      style={customStyle ? { ...customStyle } : { ...tempStyles }}
    >
      {children}
    </div>
  );
}

export default Box;
