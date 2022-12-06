const ROSLIB = require('roslib');
const advertiseRobotToBackendService = require('./advertise_robot_to_backend_service').advertiseRobotToBackendService;

function generateTopics(ros){
    let topics = {

    };

    return topics;
};

function generateServices(ros){
    var robot_to_backend = new ROSLIB.Service({
        ros: ros,
        name: '/robot_to_backend',
        serviceType: 'server_msgs/RobotToBackend'
    });

    var robot_current_activity_to_backend = new ROSLIB.Service({
        ros: ros,
        name: '/robot_current_activity_to_backend',
        serviceType: 'server_msgs/RobotCurrentActivityToBackend'
    });

    let services = {
        robot_to_backend: robot_to_backend,
        robot_current_activity_to_backend: robot_current_activity_to_backend
    };

    advertiseRobotToBackendService(robot_to_backend);

    return services;
};




module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
};

