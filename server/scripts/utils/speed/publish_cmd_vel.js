const ROSLIB = require('roslib');

async function publishCmdVel(topic, linear_speed, angular_speed){
    var cmd_vel_message = new ROSLIB.Message({
        linear: {
            x: linear_speed,
            y: 0.0,
            z: 0.0
        },
        angular: {
            x: angular_speed,
            y: 0.0,
            z: 0.0
        }
    });

    topic.publish(cmd_vel_message);
};

module.exports = {
    publishCmdVel: publishCmdVel
};