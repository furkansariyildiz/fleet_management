const controller = require('../controller/job_create_controller');

module.exports.jobCreateRouter = function(connection, received_message, io){
    controller.jobCreateController(connection, received_message, io);
};
