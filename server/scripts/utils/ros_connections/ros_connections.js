const ROSLIB = require('roslib');
const config = require('../../../config');
const findRobots = require('../robots/find_robots');
const rosInitialize = require('./ros_initialize');
const arrayFunctions = require('../array_functions/array_functions');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');

config();



async function listRosConnections(){
    var filter = {};
    var robots = await findRobots.findRobots(filter);
    for(var i=0; i<robots.length; i++){
        rosInitialize.rosInit(robots[i].url);
    };
};


module.exports = {
    listRosConnections: listRosConnections,
};
