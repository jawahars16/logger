"use strict";

const app = require("express")();
const http = require("http").Server(app);
const tail = require("./tail");

let io;

exports.start = function() {
  const port = 3001;
  http.listen(port, () => {
    console.log("Listening on 3001...");
  });

  io = require("socket.io")(http, { wsEngine: "ws" });

  io.on("connection", client => {
    console.log("client connected");
    client.on("read", read);
    client.on("stream", stream);
  });

  return port;
};

function read(filePath) {
  const readline = require("readline");
  const fs = require("fs");

  fs.readFile(filePath, "utf8", (err, res) => {
    if (!err) {
      // editor.setModel(monaco.editor.createModel(res, 'javascript'));
      io.emit("write", res);
    }
  });
}

function stream(filePath) {
  const tailer = tail(filePath);

  tailer.on("line", line => {
    io.emit("line", line);
  });
}
