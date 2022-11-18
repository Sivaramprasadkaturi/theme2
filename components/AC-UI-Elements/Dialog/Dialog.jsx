import React from "react";
import * as classes from "./Dialog.module.css";
function Dialog({
  children,
  fullScreen,
  ariaLabel,
  onClose,
  open,
  className,
  maxWidth
}) {
  return (
    <div
      className={classes.wrapper + " " + className}
      aria-label={ariaLabel}
      onClick={onClose}
    >
      {children}{" "}
    </div>
  );
}

export default Dialog;
