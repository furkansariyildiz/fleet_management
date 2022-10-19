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
const startUp = require('./server/scripts/utils/startup/startup');
const fleetManagement = require('./server/scripts/utils/fleet_management/fleet_management');
const config = require('./server/config');

config();


startUp.resetAllRobots();
fleetManagement.fleetManagement();

server.listen(process.env.APP_PORT || 8000, ()=> {
    console.log("SocketIO module is started successfully!");
});