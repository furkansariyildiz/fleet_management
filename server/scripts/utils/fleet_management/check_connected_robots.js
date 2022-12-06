const findRobot = require('../robots/find_robots').findRobots;
const generateRobotCurrentActivityToBackendService = require('../robots/generate_robot_current_activity_to_backend').generateRobotCurrentActivityToBackendService;
const robot_services = require('../ros_connections/ros_initialize').robot_services;
const arrayFunctions = require('../array_functions/array_functions');

async function checkConnectedRobots(){
    var connected_robots = await findRobot({current_activity: "CONNECTED"});
    for(var i=0; i<connected_robots.length; i++)
    {
        var index_of_robot_services = arrayFunctions.findIndex(robot_services, connected_robots[i].url);
        await generateRobotCurrentActivityToBackendService(robot_services[index_of_robot_services][connected_robots[i].url].robot_current_activity_to_backend)
    }
};

module.exports = {
    checkConnectedRobots: checkConnectedRobots
};