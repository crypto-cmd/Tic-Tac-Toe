import React, {useContext} from "../../_snowpack/pkg/react.js";
import GlobalStateContext from "./GlobalStateContext.js";
const SplashScreen = ({joinRoom}) => {
  const {socket} = useContext(GlobalStateContext);
  return /* @__PURE__ */ React.createElement("div", {
    className: "SplashScreen screen"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "intro"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "title"
  }, "Tic Tac Toe!"), /* @__PURE__ */ React.createElement("p", {
    className: "subtitle"
  }, " This is a two player game!")), /* @__PURE__ */ React.createElement("div", {
    className: "instructions"
  }, /* @__PURE__ */ React.createElement("p", null, "Paste this code ", /* @__PURE__ */ React.createElement("code", null, socket.id), " into another game room."), /* @__PURE__ */ React.createElement("p", null, "OR"), /* @__PURE__ */ React.createElement("p", null, "Enter room key here: ", /* @__PURE__ */ React.createElement("input", {
    onChange: joinRoom,
    type: "text"
  }))));
};
export default SplashScreen;
