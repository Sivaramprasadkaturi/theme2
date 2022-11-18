import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { getMeasureProps, getReqProps } from "./measurements";
import * as classes from "./OtherInfoSpecs.module.css";

const OtherInfoSpecs = () => {
  const [specs, setSpecs] = useState(null);

  const propertyState = useSelector(
    state => state.productReducer.itemDetail.properties,
    shallowEqual
  );

  const hiddenPropertiesState = useSelector(
    state => state.productReducer.itemDetail.hiddenProperties,
    shallowEqual
  );

  const unitsState = useSelector(state => state.unitsReducer, shallowEqual);

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
    let specs = [];

    if (propertyState) {
      specs.general = propertyState.filter(
        prop => prop.propgroup == "General Info" && prop.propvalue != ""
      );
      specs.dimming = propertyState.filter(
        prop => prop.propgroup == "Dimming Info" && prop.propvalue != ""
      );
      specs.finish = propertyState.filter(
        prop => prop.propgroup == "Finish & Color" && prop.propvalue != ""
      );
      specs.measurement = propertyState.filter(
        prop => prop.propgroup == "Measurement & Weight" && prop.propvalue != ""
      );
      specs.certification = propertyState.filter(
        prop => prop.propgroup == "Certification Info" && prop.propvalue != ""
      );
      specs.fixture = propertyState.filter(
        prop => prop.propgroup == "Fixture Details" && prop.propvalue != ""
      );
      specs.more = propertyState.filter(
        prop => prop.propgroup == "More Information" && prop.propvalue != ""
      );
      setSpecs(specs);
    }
  }, [propertyState]);

  function getProps(specs) {
    if (specs.propname === "specM_Format_Canopy") {
      // return null;
      return (
        <li className={classes.specList}>
          <div className={classes.specName}>{specs.propdesc}</div>
          <div className={classes.specValue}>
            {composeInstMeasurements(getMeasureProps(specs.propvalue))}
          </div>
        </li>
      );
    }

    // else if (specs.propdesc === "INSTALLED MEASUREMENTS") {
    else if (specs.propname === "specM_Format_Fixture") {
      return (
        <li className={classes.specList}>
          <div className={classes.specName}>{specs.propdesc}</div>
          <div className={classes.specValue}>
            {composeInstMeasurements(getMeasureProps(specs.propvalue))}
          </div>
        </li>
      );
    } else {
      if (
        unitsState.measurement == false &&
        !specs.propname.includes("Fractions")
      ) {
        return (
          <li className={classes.specList}>
            <div className={classes.specName}>{specs.propdesc}</div>
            <div className={classes.specValue}>
              {specs.propvalue.replaceAll("&quot;", '"')}&quot;
            </div>
          </li>
        );
      }
      if (
        unitsState.measurement == true &&
        !specs.propname.includes("Decimals")
      ) {
        return (
          <li className={classes.specList}>
            <div className={classes.specName}>{specs.propdesc}</div>
            <div className={classes.specValue}>
              {specs.propvalue.replaceAll("&quot;", '"')}&quot;
            </div>
          </li>
        );
      }
    }

    return null;
  }

  return (
    // <div style={{ display: display ? "" : "none" }} className={classes.wrapper}>
    <div className={classes.wrapper}>
      {specs ? (
        <>
          <div className={classes.twoColumns}>
            <div>
              {specs.general.length > 0 ? (
                <div className={classes.specGroupWrapper}>
                  <span className={classes.specGroup}>General Info</span>
                  <ul className={classes.specsUl}>
                    {specs.general.map((spec, i) => (
                      <li key={i} className={classes.specList}>
                        <div className={classes.specName}>
                          {spec.propdesc.toLowerCase()}
                        </div>
                        <div className={classes.specValue}>
                          {spec.propvalue.replaceAll("&quot;", '"')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {specs.dimming.length > 0 ? (
                <div className={classes.specGroupWrapper}>
                  <span className={classes.specGroup}>Dimming Info</span>
                  <ul className={classes.specsUl}>
                    {specs.dimming.map((spec, i) => (
                      <li key={i} className={classes.specList}>
                        <div className={classes.specName}>
                          {spec.propdesc.toLowerCase()}
                        </div>
                        <div className={classes.specValue}>
                          {spec.propvalue.replaceAll("&quot;", '"')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div>
              {specs.finish.length > 0 ? (
                <div className={classes.specGroupWrapper}>
                  <span className={classes.specGroup}>Finish & Color</span>
                  <ul className={classes.specsUl}>
                    {specs.finish.map((spec, i) => (
                      <li key={i} className={classes.specList}>
                        <div className={classes.specName}>
                          {spec.propdesc.toLowerCase()}
                        </div>
                        <div className={classes.specValue}>
                          {spec.propvalue.replaceAll("&quot;", '"')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {specs.measurement.length > 0 ? (
                <div className={classes.specGroupWrapper}>
                  <span className={classes.specGroup}>Measurements</span>
                  <ul className={classes.specsUl}>
                    {specs.measurement.map(
                      spec => getProps(spec)
                      // <li className={classes.specList}>

                      //   <div className={classes.specName}>{spec.propdesc}</div>
                      //   <div className={classes.specValue}>
                      //     {/* {getPropValue(spec.propdesc)} */}
                      //     {/* {spec.propvalue.replaceAll("&quot;","\"")} */}
                      //     {spec.propdesc === "INSTALLED MEASUREMENTS"
                      //       ? composeInstMeasurements(
                      //           getMeasureProps(spec.propvalue)
                      //         )
                      //       : "Hello"}
                      //   </div>
                      // </li>
                    )}
                  </ul>
                </div>
              ) : null}
              {specs.certification.length > 0 ? (
                <div className={classes.specGroupWrapper}>
                  <span className={classes.specGroup}>Certifications</span>
                  <ul className={classes.specsUl}>
                    {specs.certification.map((spec, i) => (
                      <li key={i} className={classes.specList}>
                        <div className={classes.specName}>
                          {spec.propdesc.toLowerCase()}
                        </div>
                        <div className={classes.specValue}>
                          {spec.propvalue.replaceAll("&quot;", '"')}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
          <div>
            {specs.fixture.length > 0 ? (
              <div className={classes.specGroupWrapper}>
                <hr className={classes.hr} />
                <span className={classes.specGroup}>Fixture Details</span>
                <ul>
                  {specs.fixture.map((spec, i) => (
                    <li key={i} className={classes.specList2}>
                      <div className={classes.specName}>
                        {spec.propdesc.toLowerCase()}
                      </div>
                      <div
                        style={{ lineHeight: "1.4em" }}
                        className={classes.specValue}
                      >
                        {spec.propvalue.replaceAll("&quot;", '"')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {specs.more.length > 0 ? (
              <div className={classes.specGroupWrapper}>
                <hr className={classes.hr} />
                <span className={classes.specGroup}>More Information</span>
                <ul>
                  {specs.more.map((spec, i) => (
                    <li key={i} className={classes.specList2}>
                      <div className={classes.specName}>
                        {spec.propdesc.toLowerCase()}
                      </div>
                      <div
                        style={{ lineHeight: "1.4em" }}
                        className={classes.specValue}
                      >
                        {spec.propvalue.replaceAll("&quot;", '"')}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default OtherInfoSpecs;
