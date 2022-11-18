import { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import styled from "styled-components";
import { getMeasureProps, getReqProps } from "./measurements";

const Specifications = ({
  isBrowser,
  productItemDetailStateRedux,
  props,
  hiddenProps
}) => {
  const propsState = isBrowser ? productItemDetailStateRedux.properties : props;

  const hiddenPropsState = isBrowser
    ? productItemDetailStateRedux.hiddenProperties
    : hiddenProps;

  const unitsState = useSelector(state => state.unitsReducer, shallowEqual);

  const composeInstMeasurements = mProps => {
    let properties = getReqProps(
      mProps,
      hiddenPropsState,
      propsState,
      unitsState.measurement
    );
    let comp = "";

    if (properties.length == mProps.length) {
      properties.map((prop, index) => {
        if (index != properties.length - 1)
          comp = comp + prop.prefix + prop.propvalue + '" x ';
        else comp = comp + prop.prefix + prop.propvalue + '"';
      });
    }
    return comp;
  };

  const twoColumnGroups = [
    "General Info",
    "Dimming Info",
    "Finish & Color",
    "Measurement & Weight",
    "Certification Info"
  ];

  const oneColumnGroups = ["Fixture Details", "More Information"];
  const [showInfo, setShowInfo] = useState(false);
  function getSpecGroup(group) {
    return propsState.filter(
      prop => prop.propgroup === group && prop.propvalue != ""
    );
  }

  function renderSpecsByGroup(groups, type) {
    return groups.map((group, i) => (
      <div
        key={i}
        className="group"
        style={{ display: getSpecGroup(group).length > 0 ? "block" : "none" }}
      >
        <h3 className="title">{group}</h3>
        <ul className={`grid grid-cols-1 specList ${type}-ul`}>
          {getSpecGroup(group).map((spec, i) => renderSpec(spec, i, type))}
        </ul>
      </div>
    ));
  }

  function renderSpec(spec, i, type) {
    if (
      unitsState.measurement == false &&
      !spec.propname.includes("Fractions")
    ) {
      return (
        <li key={i} className={`item ${type}`}>
          <div className="itemKey">{spec.propdesc.toLowerCase()}</div>
          <div className="itemValue">
            {/* {spec.propvalue.split("&quot;").join('"')} */}
            {getSpecValue(spec)}
            {addSuffix(spec.propdesc)}
          </div>
        </li>
      );
    }
    if (unitsState.measurement == true && !spec.propname.includes("Decimals")) {
      return (
        <li key={i} className={`item ${type}`}>
          <div className="itemKey">{spec.propdesc.toLowerCase()}</div>
          <div className="itemValue">
            {/* {spec.propvalue.split("&quot;").join('"')} */}
            {getSpecValue(spec)}
            {addSuffix(spec.propdesc)}
          </div>
        </li>
      );
    }
  }

  function getSpecValue(specs) {
    if (
      specs.propname === "specM_Format_Canopy" ||
      specs.propname === "specM_Format_Fixture"
    )
      return composeInstMeasurements(getMeasureProps(specs.propvalue));
    else return specs.propvalue.split("&quot;").join('"');
  }

  function addSuffix(spec) {
    if (spec.includes("INSTALL")) return <>&quot;</>;
    else if (spec.includes("LUMEN")) return <> lm</>;
    else if (spec.includes("KELVIN")) return <> K</>;
    else if (spec.includes("WATTAGE")) return <> W</>;
    else if (spec.includes("VOLTAGE")) return <> V</>;
    else return null;
  }

  return (
    <Wrapper>
      <h2 className="specs-title flex items-center justify-between w-full px-4 py-4 mt-0 font-medium uppercase border border-gray-300 md:mt-5 bg-main-gary md:px-0 md:border-none md:bg-white">
        specifications
        <span
          className="flex text-2xl cursor-pointer text-main-orange md:hidden"
          onClick={e => setShowInfo(!showInfo)}
        >
          {showInfo ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </span>
      </h2>
      <div
        className={`content w-full p-4 ${
          showInfo ? "hidden" : ""
        } border border-gray-300 md:block specs bg-main-gary md:border-none`}
      >
        <div className="twoColumns">
          {renderSpecsByGroup(twoColumnGroups, "two-columns")}
        </div>
        <div className="oneColumn">
          {renderSpecsByGroup(oneColumnGroups, "one-column")}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  h2 {
    letter-spacing: 0.5px;
    -webkit-font-smoothing: antialiased;
    color: #333;
    font-size: 18px;
  }
  .specs {
    .twoColumns {
      display: grid;
      .group {
        margin-bottom: 30px;
        .title {
          letter-spacing: 0.5px;
          display: block;
          color: var(--secondary-color);
          margin-bottom: 15px;
          font-size: 1em;
          font-weight: 600;
          text-transform: uppercase;
        }
        .specList {
          padding-left: 0;
          list-style-type: none;
          .item {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 5%;
            padding: 10px 0;
            margin-bottom: 0 !important;
            .itemKey {
              font-weight: 500;
              font-size: 0.95em;
              padding-bottom: 1px;
              text-transform: capitalize;
              display: flex;
              align-items: center;
              height: 24px;
            }
            .itemValue {
              font-size: 0.85em;
              height: 24px;
              display: flex;
              align-items: center;
            }
          }
          .block {
            display: block !important;
          }
        }
      }
    }
    .oneColumn {
      .group {
        margin-bottom: 30px;
        .title {
          letter-spacing: 0.5px;
          display: block;
          color: var(--secondary-color);
          margin-bottom: 15px;
          font-size: 1em;
          font-weight: 600;
          text-transform: uppercase;
        }
        .specList {
          padding-left: 0;
          list-style-type: none;
          .item {
            display: grid;
            grid-template-columns: 21% 1fr;
            grid-gap: 5%;
            padding: 10px 0;
            margin-bottom: 0 !important;
            .itemKey {
              font-weight: 500;
              font-size: 0.95em;
              padding-bottom: 1px;
              text-transform: capitalize;
              display: flex;
              align-items: center;
              height: 24px;
            }
            .itemValue {
              font-size: 0.85em;
              height: 24px;
              display: flex;
              align-items: center;
              line-height: 16px;
            }
          }
          .block {
            display: block !important;
          }
        }
      }
    }
  }
  .one-colum-ul {
    display: block;
    .one-column {
      grid-template-columns: 22% auto !important;
    }
  }
  .two-columns-ul {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 768px) {
    h2 {
      font-size: 16px;
    }
    .content {
      border-top: none;
    }
    .two-columns-ul {
      display: grid;
      grid-template-columns: 1fr;
    }
  }
`;

export default Specifications;
