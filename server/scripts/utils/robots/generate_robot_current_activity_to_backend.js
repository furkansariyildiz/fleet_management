const ROSLIB = require('roslib');
const findRobotAndUpdate = require('./update_robot').findRobotAndUpdate;

async function generateRobotCurrentActivityToBackendService(client){
    var request = new ROSLIB.ServiceRequest({

    });

    client.callService(request, async function(result){
        console.log(result.current_activity);
        await findRobotAndUpdate({url: client.ros.socket._url}, {current_activity: result.current_activity}, {returnOriginal: false});
    });
};


module.exports = {
    generateRobotCurrentActivityToBackendService: generateRobotCurrentActivityToBackendService
};