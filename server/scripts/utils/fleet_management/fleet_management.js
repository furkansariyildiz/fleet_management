const config = require('../../../config');
const rosConnections = require('../ros_connections/ros_connections');

async function fleetManagement(){
    await rosConnections.listRosConnections();
};


config();

module.exports = {
    fleetManagement: fleetManagement
};