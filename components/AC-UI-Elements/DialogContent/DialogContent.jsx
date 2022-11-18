import React from "react";
import * as classes from "./DialogContent.module.css";
function DialogContent({ children, style }) {
  let tempStyles = { ...style };
  return (
    <div className={classes.wrapper} style={{ ...tempStyles }}>
      {children}
    </div>
  );
}

export default DialogContent;
