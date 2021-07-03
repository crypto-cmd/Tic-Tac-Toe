import React, {useState} from "../../_snowpack/pkg/react.js";
import Board from "./Board.js";
import Button from "./Button.js";
const PlayScreen = () => {
  const [restart, setRestart] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  return /* @__PURE__ */ React.createElement("div", {
    className: "PlayScreen screen"
  }, /* @__PURE__ */ React.createElement(Board, {
    setGameOver: setIsGameOver,
    shouldRestart: restart
  }), isGameOver && /* @__PURE__ */ React.createElement(Button, {
    text: "Restart",
    onClick: () => {
      setRestart(!restart);
    }
  }));
};
export default PlayScreen;
