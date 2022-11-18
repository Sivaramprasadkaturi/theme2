import React, { useEffect } from "react";
import { setHTMLElementFixedPosition } from "../../../utils/functions";
import * as classes from "./Modal.module.css";

export default function Modal({ open, onClose, children }) {
  useEffect(() => {
    setHTMLElementFixedPosition(open);
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, [open]);
  if (open) {
    return (
      <React.Fragment>
        <div className={classes.wrapper}>{children}</div>
        <div className={classes.backdrop} onClick={onClose}></div>
      </React.Fragment>
    );
  } else return null;
}
