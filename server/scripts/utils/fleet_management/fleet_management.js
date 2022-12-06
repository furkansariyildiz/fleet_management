const config = require('../../../config');
const rosConnections = require('../ros_connections/ros_connections');
const findRobot = require('../robots/find_robots').findRobots;
const findJob = require('../jobs/find_job').findJob;
const checkConnectedRobots = require('./check_connected_robots').checkConnectedRobots


config();

async function fleetManagement(){
    await rosConnections.listRosConnections();
    setInterval(async function(){
        var robots = await findRobot({current_activity: "IDLE"});
        var jobs = await findJob({job_status: "SCHEDULED"});
        await checkConnectedRobots();
    }, 1000);
};




module.exports = {
    fleetManagement: fleetManagement
};