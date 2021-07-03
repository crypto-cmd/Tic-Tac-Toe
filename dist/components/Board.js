import React, {useContext, useEffect, useState} from "../../_snowpack/pkg/react.js";
import "./Board.css.proxy.js";
import EventBlocker from "./EventBlocker.js";
import GlobalStateContext from "./GlobalStateContext.js";
import Square from "./Square.js";
const Board = ({shouldRestart, setGameOver}) => {
  const {socket, isPlayerOne, setIsPlayerOne, getPlayerNumber} = useContext(GlobalStateContext);
  setIsPlayerOne(getPlayerNumber() === 1);
  const xPlayer = "x";
  const oPlayer = "o";
  const [tiles, setTiles] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(isPlayerOne ? xPlayer : oPlayer);
  const [turn, setTurn] = useState(isPlayerOne);
  const [lastMove, setLastMove] = useState({index: -1, player: ""});
  const [winner, setWinner] = useState({indices: new Set()});
  const handleMove = (move, emit = true) => {
    const {index, player: player2} = move;
    const tile = tiles[index];
    if (tile)
      return;
    setLastMove({index, player: player2});
    setTurn(!turn);
    if (emit)
      socket.emit("move", {lastMove: {index, player: player2}});
  };
  const handleClick = (key) => {
    handleMove({index: key, player});
  };
  const restart = () => {
    setTiles(tiles.map(() => ""));
    setWinner({indices: new Set()});
    setLastMove({index: -1, player: ""});
    setTurn(isPlayerOne);
    setPlayer(isPlayerOne ? xPlayer : oPlayer);
    setGameOver(false);
  };
  const getWinner = () => {
    const possibleWins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const winCombination = possibleWins.find((combination) => {
      const values = new Set(combination.map((index) => tiles[index]));
      if (values.has(""))
        return false;
      return values.size === 1;
    });
    if (winCombination) {
      return {
        indices: new Set(winCombination),
        winner: tiles[winCombination[0]]
      };
    }
    const numEmptyTiles = tiles.filter((x) => !!x).length;
    return numEmptyTiles === 0 ? {indices: new Set()} : null;
  };
  useEffect(() => setPlayer(isPlayerOne ? xPlayer : oPlayer), [isPlayerOne]);
  useEffect(() => setTiles(tiles.map((value, i) => i === lastMove.index ? lastMove.player : value)), [
    player,
    lastMove
  ]);
  useEffect(() => {
    socket.on("update-lastmove", ({lastMove: lastMove2}) => handleMove(lastMove2, false));
  }, [socket]);
  useEffect(() => {
    const winnerData = getWinner();
    if (winnerData) {
      setWinner(winnerData);
    }
  }, [tiles]);
  useEffect(() => {
    if (winner.winner) {
      setGameOver(true);
    }
  }, [winner]);
  useEffect(restart, [shouldRestart]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "board-container"
  }, tiles.map((value, i) => {
    return /* @__PURE__ */ React.createElement(Square, {
      key: i,
      value,
      nextValue: player,
      onClick: () => handleClick(i),
      isWinner: winner.indices.has(i)
    });
  }), winner.indices.size > 0 && /* @__PURE__ */ React.createElement(EventBlocker, null), /* @__PURE__ */ React.createElement("p", null, "Player: ", getPlayerNumber()));
};
export default Board;
