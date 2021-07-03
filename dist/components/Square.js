import React, {useState} from "../../_snowpack/pkg/react.js";
import "./Square.css.proxy.js";
const Square = ({nextValue, value, onClick, isWinner}) => {
  const [hovered, setHovered] = useState(false);
  const solid = value ? "solid" : "";
  const ghost = hovered ? "ghost" : "";
  const solidOrGhost = solid || ghost;
  const winner = isWinner ? "winner" : "";
  return /* @__PURE__ */ React.createElement("a", {
    className: `square ${value || nextValue} ${solidOrGhost} ${winner}`,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onClick
  });
};
export default Square;
