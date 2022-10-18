const ROSLIB = require('roslib');

function generateTopics(ros){
    var connected_clients_listener = new ROSLIB.Topic({
        ros: ros,
        name: '/connected_clients',
        messageType: 'rosbridge_msgs/ConnectedClients',
        throttle_rate: 1000
    });

    connected_clients_listener.subscribe(async function(message){
        console.log(message);
    });

    let topics = {
        connected_clients_listener: connected_clients_listener
    };

    return topics;
};

module.exports = {
    generateTopics: generateTopics
};