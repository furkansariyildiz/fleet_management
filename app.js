const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const https = require('https');

app.use(cors({
    origin: "*"
}));

const server = http.createServer(app);
const io = require('socket.io')(server);
const database = require('./server/models/db');

const route_manager = require('./server/routes/route_manager');

// route_manager.socketIOController(io);

server.listen(8000, ()=> {
    console.log("SocketIO module is started successfully!");
});