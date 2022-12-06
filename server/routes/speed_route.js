const controller = require('../controller/speed_controller');


module.exports.speedRouter = function(connection, received_message, io){
    controller.speedController(connection, received_message, io);
};