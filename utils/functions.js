import { useEffect, useRef } from "react";

export const isArray = obj => {
  return Object.prototype.toString.call(obj) === "[object Array]";
};

export const isObject = obj => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

export const setHTMLElementFixedPosition = (enable = true) => {
  if (enable) {
    document.querySelector("html").setAttribute("aria-hidden", "true");
  } else {
    document.querySelector("html").setAttribute("aria-hidden", "false");
  }
};

export const trimString = (text = "", length) =>
  text.length > length ? `${text.slice(0, Math.max(0, length - 3))}...` : text;

export const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const runAfterSomeTime = (func, miliseconds) => {
  setTimeout(func, miliseconds);
};

export const getBase64 = (
  file,
  callbackSetImage,
  callbackSetLoading = null
) => {
  let reader = new FileReader();
  if (callbackSetLoading) callbackSetLoading(true);
  reader.readAsDataURL(file);
  reader.onload = () => {
    callbackSetImage(reader.result);
    if (callbackSetLoading) callbackSetLoading(false);
  };
  reader.onerror = function (error) {
    if (callbackSetLoading) callbackSetLoading(false);
    console.log("Error: ", error);
  };
};

export const getDistanceBetweenTwoCoords = (lat1, lon1, lat2, lon2) => {
  const toRad = Value => {
    return (Value * Math.PI) / 180;
  };
  const R = 6371; // km
  let dLat = toRad(lat2 - lat1);
  let dLon = toRad(lon2 - lon1);
  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d;
};

export const CurrenyFormatCad = value => {
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2
  }).format(value);
};
