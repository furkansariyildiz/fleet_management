const indexRouter = require('./index_route').indexRouter;
const resetRobotRouter = require('./reset_robot_route').resetRobotRouter;
const speedRouter = require('./speed_route').speedRouter;

module.exports.socketIORouteManager = function(io){
    io.on('connection', function(socket){
        console.log("Connected from SocketIO Module...");

        socket.on('message', (received_message) => {
            indexRouter('message', received_message, io);
        });

        socket.on('ResetRobot', (received_message) => {
            resetRobotRouter('ResetRobot', received_message, io);
        });

        socket.on('Speed', (received_message) => {
            speedRouter('Speed', received_message, io);
        });
    });
};
