const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

var cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send("working")
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

setInterval(() => {
    console.log("working");
    const utcStr = new Date().toUTCString();
    io.emit('timeevent', { time: utcStr}); // This will emit the event to all connected sockets
}, 1000);

server.listen(3008, () => {
  console.log('listening on *:3000');
});