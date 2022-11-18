import { SET_WEIGHT_UNIT, SET_MEASUREMENT_UNIT } from "../types.js";

export const setWeightUnit = unit => ({
  type: SET_WEIGHT_UNIT,
  payload: unit
});

export const setMeasurementUnit = unit => ({
  type: SET_MEASUREMENT_UNIT,
  payload: unit
});
