import { useEffect } from "react";
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
      <>
        <div className={classes.wrapper}>{children}</div>
        <div className={classes.backdrop} onClick={onClose}></div>
      </>
    );
  } else return null;
}
