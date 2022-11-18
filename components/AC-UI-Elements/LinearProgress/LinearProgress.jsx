import React from "react";
import * as classes from "./LinearProgress.module.css";
function LinearProgress({ color, variant, value, className }) {
  return (
    <span className={classes.wrapper}>
      <span className={classes.bar1}>
        <span className={classes.bar2}></span>
      </span>
    </span>
  );
}

export default LinearProgress;
