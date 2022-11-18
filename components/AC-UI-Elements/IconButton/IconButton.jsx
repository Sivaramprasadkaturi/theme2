import React from "react";
import * as classes from "./IconButton.module.css";
function IconButton({ children, ariaLabel, className, onClick, tempStyle }) {
  return (
    <div
      aria-label={ariaLabel}
      className={`${classes.wrapper + " " + className}`}
      onClick={onClick}
      style={tempStyle}
    >
      {children}
    </div>
  );
}

export default IconButton;
