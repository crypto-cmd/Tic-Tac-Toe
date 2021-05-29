import React, {useState} from "../_snowpack/pkg/react.js";
import "./App.css.proxy.js";
import Board from "./components/Board.js";
import Button from "./components/Button.js";
function App() {
  const [restart, setRestart] = useState(false);
  return /* @__PURE__ */ React.createElement("div", {
    id: "app"
  }, /* @__PURE__ */ React.createElement(Board, {
    shouldRestart: restart
  }), /* @__PURE__ */ React.createElement(Button, {
    text: "Restart",
    onClick: () => {
      setRestart(!restart);
    }
  }));
}
export default App;
