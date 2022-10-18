const index_router = require('./index_route');

module.exports.socketIORouteManager = function(io){
    io.on('connection', function(socket){
        console.log("Connected from SocketIO Module...");

        socket.on('message', (received_message) => {
            index_router.indexRouter('message', received_message, io);
        });
    });
};
