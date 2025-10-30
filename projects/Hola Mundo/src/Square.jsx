export function Square({ value, onSquareClick, isWinning }) {
  return (
    <button
      className={`square ${isWinning ? 'highlight' : ''}`}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
