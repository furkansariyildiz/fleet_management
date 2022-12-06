const publishCmdVel = require('../scripts/utils/speed/publish_cmd_vel').publishCmdVel;
const speed_topics = require('../scripts/utils/ros_connections/ros_connections');


function speedController(connection, received_message, io){
    publishCmdVel()
};


module.exports = {
    speedController: speedController
};