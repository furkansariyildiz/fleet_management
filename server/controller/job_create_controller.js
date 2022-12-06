const generateNewJob = require('../scripts/utils/jobs/generate_new_job').generateNewJob;
const saveJob = require('../scripts/utils/jobs/save_job').saveJob;


module.exports.jobCreateController = async function(connection, received_message, io){
    var new_job = await generateNewJob(connection, received_message, io);
    var result = await saveJob(new_job, connection, received_message, io, received_message.messageType);
    io.emit(connection, result);
};