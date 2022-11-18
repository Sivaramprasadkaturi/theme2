import React from "react";
import styled from "styled-components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  setWeightUnit,
  setMeasurementUnit
} from "../../redux/actions/unitsActions";

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .top-icons {
    display: flex;
    height: 100%;
    align-items: center;
    float: right;
    font-size: 12px;
    padding: 10px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    color: #f7f7f7;
  }

  .divLK,
  .divDF {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    cursor: default;
    /* margin-right: 20px; */
    margin-left: 30px;
  }
  .switch {
    --uiSwitchSize: var(--switchSize, 20x);
    --uiSwitchBgColor: var(--switchBgColor, #4ed164);
    --uiSwitchBgColorActive: var(--switchBgColorActive, #4ed164);
    --uiSwitchBorderColorActive: var(--switchBorderColorActive, white);
    --uiSwitchBorderColorFocus: var(--switchBgColorFocus, white);
    --uiSwitchButtonBgColor: var(--switchButtonBgColor, #fff);

    display: inline-block;
    position: relative;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    margin: 0 8px;
  }

  .switch__label {
    display: block;
    width: 100%;
    height: 100%;
  }

  .switch_1toggle,
  .switch_2toggle {
    width: 20px !important;
    height: 10px !important;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
  }

  .switch_1toggle:focus ~ .switch__label {
    box-shadow: 0 0 0 var(--uiSwitchThickFocus, 1px)
      var(--uiSwitchBorderColorFocus);
  }
  .switch_2toggle:focus ~ .switch__label {
    box-shadow: 0 0 0 var(--uiSwitchThickFocus, 1px)
      var(--uiSwitchBorderColorFocus);
  }

  .switch_1toggle:checked:focus ~ .switch__label {
    box-shadow: 0 0 0 var(--uiSwitchThickFocus, 1px)
      var(--uiSwitchBorderColorActive);
  }
  .switch_2toggle:checked:focus ~ .switch__label {
    box-shadow: 0 0 0 var(--uiSwitchThickFocus, 1px)
      var(--uiSwitchBorderColorActive);
  }

  .switch__label:before,
  .switch__label:after {
    content: "";
    cursor: pointer;

    position: absolute;
    top: 0;
    left: 0;
  }

  .switch__label:before {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--uiSwitchBgColor);
  }

  .switch__label:after {
    top: 50%;
    z-index: 3;
    transition: transform 0.4s cubic-bezier(0.44, -0.12, 0.07, 1.15);
  }

  .switch_type1 {
    --uiSwitchBorderRadius: var(--switchBorderRadius, 60px);

    width: var(--uiSwitchSize);
    height: calc((var(--uiSwitchSize) / 2));
    border-radius: var(--uiSwitchBorderRadius);
    background-color: var(--uiSwitchBgColorActive);
  }

  .switch_type1 .switch__label {
    border-radius: var(--uiSwitchBorderRadius);
  }

  .switch_type1 .switch__label:before {
    border-radius: var(--uiSwitchBorderRadius);
    transition: opacity 0.2s ease-out 0.1s, transform 0.2s ease-out 0.1s;
    transform: scale(1);
    opacity: 1;
  }

  .switch_type1 .switch_1toggle:checked ~ .switch__label:before {
    transform: scale(0);
    opacity: 0.7;
  }
  .switch_type1 .switch_2toggle:checked ~ .switch__label:before {
    transform: scale(0);
    opacity: 0.7;
  }

  .switch_type1 .switch__label:after {
    width: calc(var(--uiSwitchSize) / 2);
    height: calc(var(--uiSwitchSize) / 2);
    transform: translate3d(0, -50%, 0);

    background-color: var(--uiSwitchButtonBgColor);
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }

  .switch_type1 .switch_1toggle:checked ~ .switch__label:after {
    transform: translate3d(100%, -50%, 0);
  }
  .switch_type1 .switch_2toggle:checked ~ .switch__label:after {
    transform: translate3d(100%, -50%, 0);
  }

  .switch {
    --switchSize: 20px;
  }

  @media only screen and (max-width: 768px) {
    .top-icons {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: center;
      margin-bottom: 50px;
    }
    .divLK {
      margin-left: 0px;
    }
  }
`;

const UnitSelector = () => {
  const dispatch = useDispatch();

  const unitsState = useSelector(state => state.unitsReducer, shallowEqual);

  const handleWeightUnitChange = event => {
    localStorage.setItem("weightUnit", !unitsState.weight);
    dispatch(setWeightUnit(!unitsState.weight));
  };

  const handleMeasurementUnitChange = event => {
    localStorage.setItem("measurementUnit", !unitsState.measurement);
    dispatch(setMeasurementUnit(!unitsState.measurement));
  };

  return (
    <Wrapper>
      <div className="top-icons">
        <div className="divLK">
          <span style={{ marginRight: "10px" }}>Weight: </span>
          <div>
            <span
              className="lb-span"
              style={{
                fontWeight: "bold",
                color: !unitsState.weight ? "rgb(42, 168, 65)" : "#f7f7f7"
              }}
            >
              LB
            </span>
            <label className="switch switch_type1 l-k" role="switch">
              <input
                type="checkbox"
                className="switch_1toggle unit-toggle-system l-k"
                checked={unitsState.weight}
                id="kl"
                onChange={handleWeightUnitChange}
              />
              <span className="switch__label l-k"></span>
            </label>
            <span
              className="kgs-span"
              style={{
                fontWeight: "bold",
                color: unitsState.weight ? "rgb(42, 168, 65)" : "#f7f7f7"
              }}
            >
              KGS
            </span>
          </div>
        </div>

        <div className="divDF">
          <span style={{ marginRight: "10px" }}>Measurement: </span>
          <div>
            <span
              className="d-span"
              style={{
                fontWeight: "bold",
                color: !unitsState.measurement ? "rgb(42, 168, 65)" : "#f7f7f7"
              }}
            >
              D
            </span>
            <label className="switch switch_type1 d-f" role="switch">
              <input
                type="checkbox"
                className="switch_2toggle unit-toggle-system d-f"
                id="df"
                checked={unitsState.measurement}
                onChange={handleMeasurementUnitChange}
              />
              <span className="switch__label d-f"></span>
            </label>
            <span
              className="f-span"
              style={{
                fontWeight: "bold",
                color: unitsState.measurement ? "rgb(42, 168, 65)" : "#f7f7f7"
              }}
            >
              F
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default UnitSelector;
