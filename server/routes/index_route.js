var controller = require('../controller/index_controller');

module.exports.indexRouter = function(connection, received_message, io){
    controller.indexController(connection, received_message, io);
};