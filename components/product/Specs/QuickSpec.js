import React, { useEffect, useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getMeasureProps, getReqProps } from "./measurements";
import * as classes from "./QuickSpec.module.css";

const QuickSpec = () => {
  const [quickSpec, setQuickSpec] = useState([]);
  const [weight, setWeight] = useState([]);

  const unitsState = useSelector(state => state.unitsReducer, shallowEqual);

  const propertyState = useSelector(
    state => state.productReducer.itemDetail.properties,
    shallowEqual
  );

  const hiddenPropertiesState = useSelector(
    state => state.productReducer.itemDetail.hiddenProperties,
    shallowEqual
  );

  const composeInstMeasurements = mProps => {
    let props = getReqProps(
      mProps,
      hiddenPropertiesState,
      propertyState,
      unitsState.measurement
    );
    let comp = "";

    if (props.length == mProps.length) {
      props.map((prop, index) => {
        if (index != props.length - 1)
          comp = comp + prop.prefix + prop.propvalue + '" x ';
        else comp = comp + prop.prefix + prop.propvalue + '"';
      });
    }
    return comp;
  };

  useEffect(() => {
    if (hiddenPropertiesState && unitsState) {
      let weight = hiddenPropertiesState.filter(prop => {
        if (
          prop.propname === "specM_Install_Weight_Kilograms" &&
          unitsState.weight === true
        )
          return true;
        else if (
          prop.propname === "specM_Install_Weight_Pounds" &&
          unitsState.weight === false
        )
          return true;
      });
      setWeight(weight);
    }
  }, [hiddenPropertiesState, unitsState]);

  useEffect(() => {
    if (propertyState) {
      let quick = propertyState.filter(prop => {
        // if (prop.propname === "specI_Finish") return true;
        if (prop.propname === "specM_Format_Fixture") return true;
        // else if (prop.propname == "spec_Glass_Color") return true;
        // else if (prop.propname == "specI_Type_Fixture") return true;
        else if (prop.propname == "specT_Lamping") return true;
        // else if (prop.propname == "specT_Number_of_Bulb_Lights") return true;
        // else if (prop.propname == "specC_Certification_Type") return true;
        // else if (prop.propname == "specP_Max_Wattage") return true;
        // else if (prop.propname == "specP_Kelvin") return true;
        // else if (prop.propname == "specP_Initial_Lumens") return true;
        // else if (prop.propname == "specP_CRI") return true;
        // else if (prop.propname == "specP_Voltage") return true;
        else {
          return false;
        }
      });
      setQuickSpec(quick);
    }
  }, [propertyState]);

  return (
    <div id="specGrid">
      <div
        style={{
          // borderBottom: "solid 1px #cdcdcd",
          marginTop: "-15px",
          paddingBottom: "5px"
        }}
      >
        <h4 className={classes.title}>Quick Specification</h4>
        <div
          className={classes.quickSpecsList}
          style={{ margin: "10px 0" }}
          id="quick-specs"
        >
          {quickSpec.map((quick, index) => {
            let value = quick.propvalue;
            let desc = quick.propdesc;
            if (value && value !== "") {
              if (quick.propdesc === "KELVIN") {
                value = value + " K";
              } else if (quick.propdesc === "VOLTAGE") {
                value = value + " V";
              } else if (quick.propdesc === "INITIAL LUMENS") {
                value = value + " lm";
              } else if (quick.propdesc === "MAX WATTAGE") {
                value = value + " W";
              } else if (
                quick.propdesc === "INSTALLED MEASUREMENTS" ||
                quick.propdesc === "INSTALLED"
              ) {
                // value = getMeasureProps("Pendant2")[0].prefix;
                value = composeInstMeasurements(
                  getMeasureProps(quick.propvalue)
                );
                desc = "Measurements";
              }
              return (
                <div key={index} className={classes.specWrapper}>
                  <span className={classes.specName}>
                    {desc.toLowerCase()}:{" "}
                  </span>
                  <span
                    className="quick-specvalue"
                    id="qs-specM_Format_Fixture"
                  >
                    {value}
                  </span>
                </div>
              );
            } else return null;
          })}
          {weight.map((w, index) => {
            let value = w.propvalue;
            let desc = "Installed Weight";
            if (value && value !== "") {
              if (w.propname === "specM_Install_Weight_Kilograms") {
                value = value + " KG";
              } else if (w.propname === "specM_Install_Weight_Pounds") {
                value = value + " LB";
              }
              return (
                <div key={index} className={classes.specWrapper}>
                  <span className={classes.specName}>
                    {desc.toLowerCase()}:{" "}
                  </span>
                  <span
                    className="quick-specvalue"
                    id="qs-specM_Format_Fixture"
                  >
                    {value}
                  </span>
                </div>
              );
            } else return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickSpec;
