const config = require('../../../config');
const rosConnections = require('../ros_connections/ros_connections');

config();

async function fleetManagement(){
    await rosConnections.listRosConnections();
    setInterval(function(){
        console.log("Fleet Management Control Area...");
    }, 1000);
};




module.exports = {
    fleetManagement: fleetManagement
};