'use strict'

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

    io.on('connection', function (client) {
        console.log(`a user connected`);
        client.on('read', read);
    });

    return port;
}

function read(filePath) {
    console.log(`read ${filePath}`);
    var readline = require('readline');
    var fs = require('fs');

    var myInterface = readline.createInterface({
        input: fs.createReadStream(filePath)
    });

    myInterface.on('line', function (line) {
        io.emit('line', line);
    });

    myInterface.on('close', function () {
        const tailer = tail(filePath);

        tailer.on('line', (line) => {
            io.emit('line', line);
        });
    })
}
