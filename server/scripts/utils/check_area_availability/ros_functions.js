const ROSLIB = require('roslib');
const checkAreaAvailability = require('./check_area_availability');


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

async function advertiseCheckAreaAvailability(client){
    client.advertise(function(req, res){
        res.response = "true";
        return true;
    });
    
};


module.exports = {
    generateTopics: generateTopics,
    generateServices: generateServices
};




