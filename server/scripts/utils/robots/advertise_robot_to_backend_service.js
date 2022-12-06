const findRobotAndUpdate = require('../robots/update_robot').findRobotAndUpdate;

function advertiseRobotToBackendService(client){
    client.advertise(function(req, res){
        if(req.robot_submit.external_reference_id != ""){
            var update = {
                current_activity: req.robot_submit.current_activity,
                external_reference_id: req.robot_submit.external_reference_id
            };
        }else{
            var update = {
                current_activity: req.robot_submit.current_activity
            };
        }

        var filter = {
            url: client.ros.socket._url
        };

        var options = {
            returnOriginal: false,
            upsert: true,
            new: true
        };

        findRobotAndUpdate(filter, update, options);
        res.response = "OK";
        return true;
    });
};

module.exports = {
    advertiseRobotToBackendService: advertiseRobotToBackendService
};