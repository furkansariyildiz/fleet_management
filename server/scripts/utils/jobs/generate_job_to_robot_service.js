const ROSLIB = require('roslib');

function generateJobToRobotService(external_reference_id, tasks, last_completed_task, client){
    console.log(tasks);
    return new Promise((resolve, reject) => {
        var request = new ROSLIB.ServiceRequest({
            external_reference_id: external_reference_id,
            tasks: [{action_name: tasks[0].ActionName, location_id: tasks[0].LocationId}, {action_name: tasks[1].ActionName, location_id: tasks[1].LocationId}],
            last_completed_task: {
                action_name: last_completed_task.action_name,
                location_id: last_completed_task.location_id
            }
        });

        client.callService(request, response => {
            var data = response;
            console.log("Data: " + data);
            resolve(data);
        }, err => {
            console.log("Error: " + err);
            resolve("REJECTED");
        });
    });
};


module.exports = {
    generateJobToRobotService: generateJobToRobotService
};