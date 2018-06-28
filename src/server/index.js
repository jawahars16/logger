'use strict';

const app = require('express')();
const http = require('http').Server(app);
const tail = require('./tail');

let io;

exports.start = function () {
  const port = 3001;
  http.listen(port, () => {
    console.log('Listening on 3001...');
  });

  io = require('socket.io')(http, { wsEngine: 'ws' });

  io.on('connection', (client) => {
    console.log('client connected');
    client.on('read', read);
  });

  return port;
};

function read(filePath) {
  const readline = require('readline');
  const fs = require('fs');

  const myInterface = readline.createInterface({
    input: fs.createReadStream(filePath),
  });

  myInterface.on('line', (line) => {
    io.emit('line', line);
  });

  myInterface.on('close', () => {
    const tailer = tail(filePath);

    tailer.on('line', (line) => {
      io.emit('line', line);
    });
  });
}
