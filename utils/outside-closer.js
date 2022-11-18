import React, { useRef, useEffect } from "react";

function useOutsideCloser(ref, props) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        props.onClose();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, props]);
}

const OutsideCloser = props => {
  const wrapperRef = useRef(null);
  useOutsideCloser(wrapperRef, props);
  return (
    <div className={props.className} ref={wrapperRef}>
      {props.children}
    </div>
  );
};

export default OutsideCloser;
