const ROSLIB = require('roslib');

function generateTopics(ros){
            
};

function generateServices(ros){
    var check_area_availability = new ROSLIB.Service({
        ros: ros,
        name: '/check_area_availability',
        serviceType: 'server_msgs/CheckAreaAvailability'
    });

    let services = {
        check_area_availability: check_area_availability
    };

    advertiseCheckAreaAvailability(check_area_availability);

    return services;
};

function advertiseCheckAreaAvailability(client){
    client.advertise(function(req, res){
        console.log("Request from service: ", req);
    });
};

module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
};




