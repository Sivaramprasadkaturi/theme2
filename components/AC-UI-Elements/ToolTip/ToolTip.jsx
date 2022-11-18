import React from "react";
import * as classes from "./ToolTip.module.css";
function ToolTip({ children, title, placement }) {
  return (
    <button className={classes.toolTip}>
      {children}
      <div className={classes.container + " " + classes.popper}>
        <div
          placement={placement}
          className={classes.wrapper + " " + classes.tooltip}
        >
          {title}
        </div>
      </div>
    </button>
  );
}

export default ToolTip;
