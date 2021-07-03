import React from "../../_snowpack/pkg/react.js";
import "./Button.css.proxy.js";
const Button = ({onClick, text}) => {
  return /* @__PURE__ */ React.createElement("a", {
    className: "btn",
    onClick
  }, text);
};
export default Button;
