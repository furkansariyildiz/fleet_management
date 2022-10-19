const config = require('../../../config');
const rosConnections = require('../ros_connections/ros_connections');

async function fleetManagement(){
    await rosConnections.listRosConnections();
    setInterval(function(){
        
    }, 1000);
};


config();

module.exports = {
    fleetManagement: fleetManagement
};