import React, {useState} from "../../_snowpack/pkg/react.js";
import "./Square.css.proxy.js";
const Square = ({nextValue, value, onClick, isWinner}) => {
  const [hovered, setHovered] = useState(false);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("a", {
    className: `square ${value || nextValue} ${value ? "solid" : hovered ? "ghost" : ""} ${isWinner ? "winner" : ""}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick
  }));
};
export default Square;
