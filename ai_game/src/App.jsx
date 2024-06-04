import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const socketRef = useRef();
  const [connectionMessage, setConnectionMessage] = useState("");
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("hello", (message) => {
      setConnectionMessage(message);
    });
    socketRef.current = socket;
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <div>
      <p>{connectionMessage.split("\n")[0]}</p>
    </div>
  );
}

export default App;
