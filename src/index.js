import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Square = ({ value, onClick }) => {
  return (
    <button className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xOrO, setXOrO] = useState("X");

  const handleClick = (i) => {
    const boardSquares = squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    boardSquares[i] = xOrO;
    setSquares(boardSquares);
    if (xOrO === "X") {
      setXOrO("O");
    } else {
      setXOrO("X");
    }
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player: " + xOrO;
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
    </div>
  );
};

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
