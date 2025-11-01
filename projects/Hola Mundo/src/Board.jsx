import { useState } from "react"
import { Square } from "./Square"

export default function Board({ squares: propSquares, onMove, roomId, playerId }) {
  const [localSquares, setLocalSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const squares = propSquares ?? localSquares;

  const result = calculateWinner(squares);
  const winner = result ? result.winner : null;
  const winningLine = result ? result.line : [];

  function handleClick(i) {
    if (squares[i] || winner) return;
    if (onMove) {
      onMove(i);
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setLocalSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  const board = [0, 1, 2].map((row) => {
    const startIndex = row * 3;
    const squaresRow = [0, 1, 2].map((col) => {
      const i = startIndex + col;
      return (
        <Square
          key={i}
          value={squares[i]}
          onSquareClick={() => handleClick(i)}
          isWinning={winningLine.includes(i)}
        />
      );
    });

    return (
      <div key={row} className="board-row">
        {squaresRow}
      </div>
    );
  });

  const lineCoords = winningLine.length === 3 ? (() => {
    const indexToPos = (i) => {
      const row = Math.floor(i / 3);
      const col = i % 3;
      const x = ((col * 2 + 1) / 6) * 100;
      const y = ((row * 2 + 1) / 6) * 100;
      return { x, y };
    };

    const start = indexToPos(winningLine[0]);
    const end = indexToPos(winningLine[2]);
    return { start, end };
  })() : null;

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-container">
        <div className="board">{board}</div>
        {lineCoords && (
          <svg className="winning-line" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
            <line
              x1={`${lineCoords.start.x}%`}
              y1={`${lineCoords.start.y}%`}
              x2={`${lineCoords.end.x}%`}
              y2={`${lineCoords.end.y}%`}
              stroke="#ff0"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </>
  );

  function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], line: lines[i] };
      }
    }
    return null;
  }
}