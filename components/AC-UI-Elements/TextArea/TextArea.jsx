import React from "react";
import * as classes from "./TextArea.module.css";
function TextArea({ value, onChange, minRows, placeholder, children, style }) {
  let height = { height: `${minRows * 15}px` };
  let tempStyles = { height, ...style };
  return (
    <textarea
      className={classes.wrapper}
      rows={minRows}
      placeholder={placeholder}
      style={tempStyles}
      onChange={onChange}
    >
      {value}
    </textarea>
  );
}

export default TextArea;
