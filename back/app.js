const express = require("express");
const app = express();

const http = require("http");
const sever = http.createServer(app);

const PORT = 2000;

app.get("/", (req, res, next) => {
  res.send("<h1>Hello World</h1>");
});

app.listen(PORT, () => {
  console.log(`Sever start on port: ${PORT}`);
});
