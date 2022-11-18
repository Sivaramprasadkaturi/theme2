import React from "react";
import classes from "./LinearLoading.module.css";

export default function LinearLoading() {
  return (
    <div className={classes.wrapper}>
      <div className={[classes.bar, classes.first].join(" ")}></div>
      <div className={[classes.bar, classes.second].join(" ")}></div>
    </div>
  );
}
