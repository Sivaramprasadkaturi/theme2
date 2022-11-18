import { useRef, useEffect } from "react";
import classes from "./Drawer.module.css";
export default function Drawer({
  customClass,
  children,
  open,
  anchor,
  onClose,
  style
}) {
  const wrapperRef = useRef();
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        wrapperRef?.current.focus();
      }, 500);
    }
  }, [open]);

  return (
    <div
      aria-hidden={open ? "false" : "true"}
      open={open}
      className={`${classes.container} ${customClass}`}
      onClick={event => {
        onClose(event);
      }}
    >
      <div
        ref={wrapperRef}
        tabIndex={open ? "0" : "-1"}
        onClick={event => {
          event.stopPropagation();
        }}
        className={classes.wrapper}
        style={style}
      >
        {children}
      </div>
    </div>
  );
}
