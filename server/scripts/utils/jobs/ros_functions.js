const ROSLIB = require('roslib');

function generateTopics(ros){
    let topics = {

    };

    return topics;
};

function generateServices(ros){
    var job_to_robot = new ROSLIB.Service({
        ros: ros,
        name: '/job_to_robot',
        serviceType: 'server_msgs/JobToRobot'
    });

    let services = {
        job_to_robot: job_to_robot
    };

    return services;
};


module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
};

