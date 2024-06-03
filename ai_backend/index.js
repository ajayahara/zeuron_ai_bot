// imports
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
// express initialization
const app = express();
app.use(cors());
app.use(express.json());
// socket initialization
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
// express connection
app.get("/", (req, res) => {
  res.status(200).json({ message: "You are at home" });
});
// socket connection
io.on("connection", (socket) => {
  const socketId = socket.id;
  io.to(socketId).emit(
    "hello",
    `Your Connection Id Is ${socketId} \nconnected to web socket`
  );
  socket.on('analyse',()=>{
    
  })
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
// start server
httpServer.listen(8000, () => {
  console.log("server running at http://localhost:8000");
});
