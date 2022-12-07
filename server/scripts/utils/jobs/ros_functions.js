const ROSLIB = require('roslib');
const advertiseJobToBackendService = require('./advertise_job_to_backend_service').advertiseJobToBackendService;


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

    var job_to_backend = new ROSLIB.Service({
        ros: ros,
        name: '/job_to_backend',
        serviceType: 'server_msgs/JobToBackend'
    });

    let services = {
        job_to_robot: job_to_robot,
        job_to_backend: job_to_backend
    };

    advertiseJobToBackendService(job_to_backend);

    return services;
};


module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
};

