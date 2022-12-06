const Jobs = require('../../../models/job');

async function generateNewJob(connection, received_message, io){
    return new Promise((resolve, reject) => {
        try{
            var new_job = new Jobs({
                external_reference_id: received_message.externalReferenceId,
                task_list: received_message.taskList,
                job_status: "SCHEDULED",
                priority: received_message.priority,
                last_completed_task: {
                    action_name: "NULL",
                    location_id: "NULL"
                },
                error_code: "0",
                error_message: "None"
            });

            resolve(new_job);
        }catch(error){
            resolve("REJECTED");
        };
    });
};


module.exports = {
    generateNewJob: generateNewJob
};