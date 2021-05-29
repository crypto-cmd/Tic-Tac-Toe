import React, {useEffect, useState} from "../../_snowpack/pkg/react.js";
import Square from "./Square.js";
import "./Board.css.proxy.js";
import EventBlocker from "./EventBlocker.js";
const Board = ({shouldRestart}) => {
  const xPlayer = "x";
  const oPlayer = "o";
  const [tiles, setTiles] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(xPlayer);
  const [lastMove, setLastMove] = useState({index: -1, player: ""});
  const [winner, setWinner] = useState({indices: new Set()});
  const handleClick = (key) => {
    const tile = tiles[key];
    if (tile)
      return;
    setLastMove({index: key, player});
    setPlayer(player == xPlayer ? oPlayer : xPlayer);
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
    return tiles.filter((x) => !!x).length == 0 ? {indices: new Set()} : null;
  };
  useEffect(() => {
    setTiles(tiles.map((value, i) => {
      if (i === lastMove.index)
        return lastMove.player;
      return value;
    }));
  }, [player, lastMove]);
  useEffect(() => {
    const winnerData = getWinner();
    if (winnerData) {
      setWinner(winnerData);
    }
  }, [tiles]);
  useEffect(() => {
    if (winner.winner) {
      console.log(winner);
    }
  }, [winner]);
  useEffect(() => {
    setTiles(tiles.map(() => ""));
    setWinner({indices: new Set()});
    setLastMove({index: -1, player: ""});
    setPlayer(xPlayer);
  }, [shouldRestart]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "board-container"
  }, tiles.map((value, i) => {
    return /* @__PURE__ */ React.createElement(Square, {
      key: i,
      value,
      nextValue: player,
      onClick: () => handleClick(i),
      isWinner: winner.indices.has(i)
    });
  }), winner.indices.size > 0 && /* @__PURE__ */ React.createElement(EventBlocker, null)));
};
export default Board;
