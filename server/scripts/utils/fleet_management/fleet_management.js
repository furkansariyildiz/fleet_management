const config = require('../../../config');
const rosConnections = require('../ros_connections/ros_connections');
const findRobot = require('../robots/find_robots').findRobots;
const findJob = require('../jobs/find_job').findJob;

config();

async function fleetManagement(){
    await rosConnections.listRosConnections();
    setInterval(async function(){
        var robots = await findRobot({current_activity: "IDLE"});
        
        console.log(robots);
    }, 1000);
};




module.exports = {
    fleetManagement: fleetManagement
};