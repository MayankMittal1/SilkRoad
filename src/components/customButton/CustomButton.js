import React from "react";
import "./Button.css";

const CustomButton = (props) => {
  return (
    <button class="button-72" role="button">{props.title}</button>
  );
};

export default CustomButton;
