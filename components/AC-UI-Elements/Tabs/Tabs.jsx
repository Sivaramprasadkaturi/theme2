import React, { useMemo } from "react";
import * as classes from "./Tabs.module.css";
function Tabs({ children, value, onChange, ariaLabel }) {
  let indWidth =
    typeof document !== "undefined" &&
    document.getElementById("tabsBar")?.offsetWidth / children.length;

  let indDistance = useMemo(() => {
    switch (value) {
      case 0:
        return 0;
      case 1:
        return 1 * indWidth;
      case 2:
        return 2 * indWidth;
    }
  }, [value]);

  console.log("Tabs Valuie", value, indWidth, indDistance);
  return (
    <header className={classes.appBar}>
      <div className={classes.tabs}>
        <div className={classes.tabsScroller}>
          <div className={classes.tabsFlexContainer} id="tabsBar">
            {children}
          </div>
          <span
            id="indicator"
            className={classes.indicator}
            style={{ left: `${indDistance}px`, width: `${indWidth}px` }}
          ></span>
        </div>
      </div>
    </header>
  );
}

export default Tabs;
