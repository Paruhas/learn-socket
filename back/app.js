const express = require("express");
const app = express();

const http = require("http");
const { dirname } = require("path");
const sever = http.createServer(app);

const PORT = 2000;

app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/app.html");
});

app.listen(PORT, () => {
  console.log(`Sever start on port: ${PORT}`);
});
