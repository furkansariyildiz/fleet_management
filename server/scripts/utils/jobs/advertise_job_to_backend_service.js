const findJobAndUpdate = require('./update_job').findJobAndUpdate;


function advertiseJobToBackendService(client){
    client.advertise(function(req, res){
        var update = {
            job_status: req.job_submit.job_status,
            error_code: req.job_submit.error_code,
            error_message: req.job_submit.message,
            last_complated_task: {action_name: req.job_submit.last_completed_task.action_name, location_id: req.job_submit.last_completed_task.location_id},
        };
        var filter = {external_reference_id: req.job_submit.external_reference_id};
        var options = {returnOriginal: false, upsert: true, new: true};
        findJobAndUpdate(filter, update, options);

        res.mission_status = "OK";
        return true;
    });
};


module.exports = {
    advertiseJobToBackendService: advertiseJobToBackendService
};