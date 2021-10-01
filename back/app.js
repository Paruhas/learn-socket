const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 2000;

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/app.html");
});

const Users = [];

io.on("connection", (socket) => {
  let thisUser;

  // console.log(socket);

  socket.on("send-nickname", function (nickname) {
    socket.nickname = nickname;
    io.emit("user connect", socket.nickname);

    thisUser = socket.nickname;
    Users.push(socket.nickname);

    console.log(`user connect name: ${socket.nickname}`);
    console.log(`User in this room ${Users.length}`);
  });

  socket.on("new message", (data) => {
    // console.log(data);
    io.emit("chat message", { msg: data.msg, nickname: data.nickname });
  });

  socket.on("disconnect", () => {
    io.emit("user disconnect", thisUser);

    const disUserIndex = Users.indexOf(thisUser);
    if (disUserIndex > -1) {
      Users.splice(disUserIndex, 1);
    }

    console.log(`user ${thisUser} disconnected`);
    console.log(`User in this room ${Users.length}`);
  });
});

server.listen(PORT, () => {
  console.log(`Sever start on port: ${PORT}`);
});
