import { io } from "socket.io-client";

export function socketInit() {
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  return io("http://localhost:4000", options);
}
