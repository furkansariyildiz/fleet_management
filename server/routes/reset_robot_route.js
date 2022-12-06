const controller = require('../controller/reset_robot_controller');

module.exports.resetRobotRouter = function(connection, received_message, io){
    controller.resetRobotController(connection, received_message, io);
};