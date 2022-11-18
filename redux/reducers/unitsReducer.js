import { SET_WEIGHT_UNIT, SET_MEASUREMENT_UNIT } from "../types.js";

let weight = null;
if (typeof window !== "undefined") {
  weight = window.localStorage.getItem("weightUnit");
}
if (weight === null) {
  weight = false;
} else {
  weight = JSON.parse(weight);
}

let measurement = null;
if (typeof window !== "undefined") {
  measurement = window.localStorage.getItem("measurementUnit");
}

if (measurement === null) {
  measurement = false;
} else {
  measurement = JSON.parse(measurement);
}

const initialState = {
  weight: weight,
  measurement: measurement
};

const unitsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WEIGHT_UNIT:
      return {
        ...state,
        weight: payload
      };
    case SET_MEASUREMENT_UNIT:
      return {
        ...state,
        measurement: payload
      };
    default:
      return state;
  }
};

export default unitsReducer;
