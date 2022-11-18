import React from "react";
import * as classes from "./TypoGraphy.module.css";
function TypoGraphy({ children, style, className }) {
  return (
    <div className={className + " " + classes.wrapper} style={style}>
      {children}
    </div>
  );
}

export default TypoGraphy;
