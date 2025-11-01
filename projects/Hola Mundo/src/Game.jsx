// GameRoom.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { createWsClient } from "./client";
import Board from "./Board";

export default function GameRoom({ roomId, player, wsUrl = "http://localhost:8080/ws" }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const wsRef = useRef(null);

  const winnerInfo = useMemo(() => calculateWinner(squares), [squares]);
  const winner = winnerInfo?.winner ?? null;

  const next = useMemo(() => {
    const xs = squares.filter(v => v === "X").length;
    const os = squares.filter(v => v === "O").length;
    return xs === os ? "X" : "O";
  }, [squares]);

  useEffect(() => {
    const ws = createWsClient({
      wsUrl,
      roomId,
      onMove: ({ row, col, player: p }) => {
        const idx = row * 3 + col;
        setSquares(prev => {
          if (prev[idx]) return prev;   
          const next = prev.slice();
          next[idx] = p;
          return next;
        });
      },
    });

    ws.connect();
    wsRef.current = ws;

    return () => ws.disconnect();
  }, [roomId, wsUrl]);

  function handleMove(index) {
    if (winner) return;
    if (squares[index]) return;

    const row = Math.floor(index / 3);
    const col = index % 3;

    wsRef.current?.sendMove({ row, col, player: next });
    }

  return (
    <div style={{ fontFamily: "system-ui", maxWidth: 360 }}>
      <div style={{ marginBottom: 8 }}>
        Sala: <b>{roomId}</b> · Tú eres: <b>{player}</b>
      </div>
      <Board squares={squares} onMove={handleMove} roomId={roomId} playerId={player} />
    </div>
  );
}

function calculateWinner(sq) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines) {
    if (sq[a] && sq[a] === sq[b] && sq[a] === sq[c]) {
      return { winner: sq[a], line: [a,b,c] };
    }
  }
  return null;
}
