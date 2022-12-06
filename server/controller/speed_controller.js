const publishCmdVel = require('../scripts/utils/speed/publish_cmd_vel').publishCmdVel;
const arrayFunctions = require('../scripts/utils/array_functions/array_functions');
const findRobot = require('../scripts/utils/robots/find_robots').findRobots;
const speed_topics = require('../scripts/utils/ros_connections/ros_initialize').speed_topics;


async function speedController(connection, received_message, io){
    var robot = await findRobot({id: received_message.robotId});
    var index_of_speed_topic = arrayFunctions.findIndex(speed_topics, robot[0].url);
    publishCmdVel(speed_topics[index_of_speed_topic][robot[0].url].cmd_vel, 0.1, 0.1);
};


module.exports = {
    speedController: speedController
};