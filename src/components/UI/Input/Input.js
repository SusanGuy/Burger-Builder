import React from "react";
import classes from "./Input.module.css";

const input = props => {
  let inputElement = null;
  let validationError = null;
  const cssRules = [classes.InputElement];
  if (props.invalid && props.shouldValidate && props.touched) {
    cssRules.push(classes.Invalid);
    validationError = (
      <p className={classes.ValidationError}>Please enter a valid value!</p>
    );
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={cssRules.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={cssRules.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          className={cssRules.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
      {validationError}
    </div>
  );
};

export default input;