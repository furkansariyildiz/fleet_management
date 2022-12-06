const ROSLIB = require('roslib');


function generateTopics(ros){
    var cmd_vel = new ROSLIB.Topic({
        ros: ros,
        name: '/cmd_vel',
        messageType: 'geometry_msgs/Twist',
        throttle_rate: '1000'
    });

    let topics = {
        cmd_vel: cmd_vel
    };

    return topics;
};

function generateServices(ros){
    let services = {

    };

    return services;
};


module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
}