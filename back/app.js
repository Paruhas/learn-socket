const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

const PORT = 2000;

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/app.html");
});

io.on("connection", (socket) => {
  console.log("user connect");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Sever start on port: ${PORT}`);
});
