import React, { useEffect, useState, useRef } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { LINK_DISTRIBUTION } from "../../../project-config";

import classes from "./Dropdown.module.css";

export default function Dropdown({
  state,
  savedInputsState,
  setState,
  label,
  options,
  type,
  name,
  firstOptionIsCheckedByDefault,
  progressState,
  setProgressState,
  fontSelect,
  required,
  selectLabel,
  setValidations,
  failedValidations,
  selectorAttr,
  displayActive
}) {
  const wrapperRef = useRef(null);
  const activeOptionRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (wrapperRef && wrapperRef.current && expanded) {
      console.log("wrapper", options);
      let index = 0;
      if (activeOptionRef && activeOptionRef.current) {
        const id = activeOptionRef.current.id;
        index = options.findIndex(o => o.id === id);
        // activeOptionRef.current.focus();
      }

      const container = document.getElementById("chequeCustomizationContainer");

      setTimeout(() => {
        if (container) container.scrollTo(0, container.offsetHeight - 100);
        if (wrapperRef && wrapperRef.current) {
          wrapperRef.current.scroll(0, index * 33);
        }
      }, 50);
    }
  }, [expanded]);

  const [validationMessage, setValidationMessage] = useState(null);

  useEffect(() => {
    const previouslyChecked = options.find(
      b => b.checked === true || savedInputsState?.[name] == b.id
    );

    if (previouslyChecked) {
      if (fontSelect) {
        setProgressState({
          setSelectedFont: true,
          value: previouslyChecked.label
        });
      }
      setState({ [name]: previouslyChecked.id });
    } else if (options && options[0] && firstOptionIsCheckedByDefault) {
      let defaultOptionIndex = null;
      let option;
      if (fontSelect) {
        defaultOptionIndex = 31;
        option = (options && options[defaultOptionIndex]) || options[0];
        setProgressState({
          setSelectedFont: true,
          value: option.label
        });
      }
      setState({ [name]: option.id });
    }

    if (required) {
      setValidations({ [name]: "required" });
    }
  }, []);

  useEffect(() => {
    if (failedValidations && failedValidations.validationType === "required") {
      setValidationMessage("Required");
    } else {
      setValidationMessage(null);
    }
  }, [failedValidations]);

  const handleOnClick = (e, name, id, btnLabel) => {
    if (fontSelect) {
      setProgressState({
        inputs: { ...progressState.inputs, [name]: id },
        font: { ...progressState.font, selectedFont: btnLabel }
      });
    } else {
      setState({ [name]: id });
    }

    setExpanded(false);
  };

  const handleArrowKeySelectOption = key => {
    if (activeOptionRef && activeOptionRef.current) {
      const firstIndex = 0;
      const lastIndex = options.length - 1;
      const currentIndex = options.findIndex(
        b => b.id === activeOptionRef.current.id
      );

      console.log("currentIndex", currentIndex);

      let indexToGo = null;

      if (key === "ArrowUp") {
        indexToGo = currentIndex > firstIndex ? currentIndex - 1 : null;
        console.log(indexToGo);
      } else if (key === "ArrowDown") {
        indexToGo = currentIndex < lastIndex ? currentIndex + 1 : null;
      }
      if (indexToGo !== null) {
        const btn = options[indexToGo];

        if (fontSelect) {
          setProgressState({
            inputs: { ...progressState.inputs, [name]: btn.id },
            font: { ...progressState.font, selectedFont: btn.label }
          });
        } else {
          setState({ [name]: btn.id });
        }

        if (expanded && wrapperRef && wrapperRef.current) {
          // const scrollTop = wrapperRef.current.scrollTop - 300;
          wrapperRef.current.scroll(0, indexToGo * 33);
        }
      }
    } else {
      const btn = options[0];

      if (fontSelect) {
        setProgressState({
          inputs: { ...progressState.inputs, [name]: btn.id },
          font: { ...progressState.font, selectedFont: btn.label }
        });
      } else {
        setState({ [name]: btn.id });
      }

      if (expanded && wrapperRef && wrapperRef.current) {
        wrapperRef.current.scroll(0, 0);
      }
    }
  };

  const handleSelectClicked = () => {
    setExpanded(!expanded);
  };

  const handleSelectedLogoOption = () => {
    if (state && Object.keys(state).length > 0 && state[name]) {
      let selectedId = state[name];

      let selectedOption = options.find(
        option => option.detailID === selectedId
      );

      console.log("selectedOption", selectedId, options);

      if (selectedOption && type === "image") {
        let selectedImage = selectedOption.detailImg;
        let selectedPreviewValue = selectedOption.previewVal;
        return (
          <img
            src={LINK_DISTRIBUTION + "/" + selectedImage}
            alt={selectedPreviewValue}
          ></img>
        );
      } else {
        return selectedOption.detailDesc;
      }
    } else if (selectLabel) {
      return selectLabel;
    }

    return null;
  };

  const handleKeyDown = (key, modifier, upOrDownArrowKeys) => {
    console.log(key, modifier);

    if (key === "Enter") {
      handleSelectClicked();
    } else if (key === "Tab" && expanded) {
      handleSelectClicked();
    } else if (upOrDownArrowKeys) {
      handleArrowKeySelectOption(key);
    }
  };

  return (
    <div className={classes.container}>
      <div id={name} className={classes.wrapper}>
        {label && (
          <p aria-required={true}>
            <label>
              {label}
              {required && (
                <span aria-label="Required" style={{ color: "red" }}>
                  &nbsp;*
                </span>
              )}
              :
            </label>
          </p>
        )}
        <div
          data-selector={selectorAttr ? "true" : "false"}
          role="listbox"
          aria-label={`${label}${
            required && !validationMessage ? " required" : ""
          }${validationMessage ? " " + validationMessage : ""}`}
          aria-activedescendant={`default-${name}`}
          onKeyDown={e => {
            const key = e.key;
            const upOrDownArrowKeys = key === "ArrowUp" || key === "ArrowDown";
            if ((expanded && key === "Tab") || upOrDownArrowKeys)
              e.preventDefault();
            const modifier = e.getModifierState("Shift");
            handleKeyDown(key, modifier, upOrDownArrowKeys);
          }}
          tabIndex={displayActive ? "0" : "-1"}
          onClick={handleSelectClicked}
          aria-expanded={expanded}
          className={`focusAble ${classes.selectWrapper}${
            validationMessage ? " " + classes.inputValidationFailed : ""
          }`}
        >
          <div role="option" id={`default-${name}`} className={classes.select}>
            {handleSelectedLogoOption()}
          </div>
          <em className="material-icons">
            {expanded ? <MdExpandLess /> : <MdExpandMore />}
          </em>
        </div>
        <div
          ref={wrapperRef}
          className={`${classes.dropdownWrapper}${
            expanded ? " " + classes.expanded : ""
          }`}
        >
          {options.map((btn, btnIdx) => {
            const active = (state[name] && state[name]) === btn.id;
            return (
              <div
                data-index={btnIdx}
                data-value={btn.id}
                aria-selected={active}
                role="option"
                aria-label={`${btn.label}`}
                ref={active ? activeOptionRef : null}
                onClick={e => handleOnClick(e, name, btn.id, btn.label)}
                id={btn.id}
                name={btn.id}
                key={btn.id}
                className={`${classes.optionWrapper}${
                  active ? " " + classes.active : ""
                }${type ? " " + classes[type] : ""}`}
                tabIndex={expanded ? "0" : "-1"}
              >
                {btn.children ? btn.children : null}
                {type === "color" && (
                  <React.Fragment>
                    <img
                      src={LINK_DISTRIBUTION + "/" + btn.altLabel}
                      alt={btn && btn.label}
                    ></img>
                  </React.Fragment>
                )}
                {type === "image" && (
                  <img
                    src={LINK_DISTRIBUTION + "/" + btn.altLabel}
                    alt={btn && btn.label}
                  ></img>
                )}
                {type !== "image" && (
                  <label htmlFor={btn.id}>{btn.label}</label>
                )}
              </div>
            );
          })}
        </div>
        {validationMessage && (
          <span className={classes.validationMessage}>{validationMessage}</span>
        )}
      </div>
    </div>
  );
}
