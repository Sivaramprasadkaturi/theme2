import React, { useMemo } from "react";
import * as classes from "./Grid.module.css";

export default function Grid({
  item,
  justifyContent,
  alignItems,
  container,
  categoryFlag,
  xs,
  sm,
  md,
  lg,
  xl,
  children,
  className,
  tempStyle
}) {
  const style = { justifyContent, alignItems, ...tempStyle };
  console.log("tempStyle", tempStyle, style);
  console.log("classes", classes, container);
  const breakPointClasses = useMemo(() => {
    const tempClasses = [];
    const breakPoints = {
      extraSmall: xs,
      small: sm,
      medium: md,
      large: lg,
      extraLarge: xl
    };
    const getSize = (key, value) => {
      if (value) {
        return `${classes[`${key}${value}`]}`;
      }
    };

    Object.keys(breakPoints).forEach(key => {
      const tempClass = getSize(key, breakPoints[key]);
      if (tempClass) tempClasses.push(tempClass);
    });

    return tempClasses;
  }, [xs, sm, md, lg, xl]);

  console.log("breakPointClasses", breakPointClasses);

  return (
    <div
      style={{ ...style }}
      className={`${classes.wrapper} ${breakPointClasses.join(" ")}${
        className ? ` ${className}` : ""
      }`}
      container={container}
      categoryFlag={categoryFlag}
      item={item}
    >
      {children}
    </div>
  );
}
