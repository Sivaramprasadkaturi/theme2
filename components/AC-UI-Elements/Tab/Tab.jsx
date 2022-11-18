import React from "react";
import * as classes from "./Tab.module.css";
function Tab({ children, value, index, label, onChange, ariaLabel, ...other }) {
  return (
    <button
      onClick={() => onChange(index)}
      className={
        classes.TabRoot +
        " " +
        classes.TabFullWidth +
        " " +
        (value === index ? classes.TabSelected : "")
      }
      id={other.id}
      ariaLabel={other.ariaControls}
    >
      <span>{label}</span>
      <span></span>
    </button>
  );
}

export default Tab;
