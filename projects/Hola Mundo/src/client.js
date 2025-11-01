// wsClient.js
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

export function createWsClient({ wsUrl, roomId, onMove }) {
  const socket = new SockJS(wsUrl);        
  const client = Stomp.over(socket);
  client.debug = () => {};               

  function connect({ onConnect } = {}) {
    client.connect(
      {},
      () => {
        client.subscribe(`/topic/game/${roomId}`, (frame) => {
          try {
            const move = JSON.parse(frame.body); 
            onMove?.(move);
          } catch (e) {
            console.error("Error parseando movimiento:", e);
          }
        });

        onConnect?.();
      },
      (err) => console.error("STOMP error:", err)
    );
  }

  function sendMove({ row, col, player }) {
    if (!client.connected) return;
    client.send("/app/makeMove", {}, JSON.stringify({ roomId, row, col, player }));
  }

  function disconnect() {
    try { client.disconnect(() => {}); } catch (_) {}
  }

  return { connect, sendMove, disconnect, client };
}
