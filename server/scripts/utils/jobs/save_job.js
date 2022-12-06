async function saveJob(new_job, connection, received_message, io, message_type){
    return new Promise((resolve, reject) => {
        new_job.save(async function(err){
            if(err){
                console.log(err);
                resolve({
                    "messageType": message_type,
                    "externalReferenceId": received_message.externalReferenceId,
                    "jobStatus": "REJECTED"
                });
            }else{
                resolve({
                    "messageType": message_type,
                    "externalReferenceId": received_message.externalReferenceId,
                    "jobStatus": "ACCEPTED"
                });
            };
        });
    });
};

module.exports = {
    saveJob: saveJob
};