import React from "react";
import * as classes from "./Drawer.module.css";

export default function Drawer({
  customClass,
  children,
  open,
  anchor,
  onClose
}) {
  console.log("customClass", customClass);
  console.log("openFaruk123", open);
  return (
    <div
      aria-hidden={open ? "false" : "true"}
      tabIndex={open ? "0" : "-1"}
      open={open}
      className={`${classes.container} ${customClass}`}
      onClick={event => {
        console.log("event", onClose, event.target);
        onClose(event);
      }}
    >
      <div
        onClick={event => {
          event.stopPropagation();
        }}
        className={classes.wrapper}
      >
        {children}
      </div>
    </div>
  );
}
