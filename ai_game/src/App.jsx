import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

function App() {
  const socketRef = useRef();
  useEffect(() => {
    const socket = io("http://localhost:8000");
    socket.on("hello", (message) => {
      console.log(message);
    });
    socketRef.current = socket;
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return <div>Hello world</div>;
}

export default App;
