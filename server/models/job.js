var mongoose = require('mongoose');
var Schmea = mongoose.Schema;

var job_schema = new Schmea({
    external_reference_id: {
        type: String,
        unique: true
    },
    robot_url: String,
    priority: {
        type: String,
        default: "0"
    },
    task_list: [],
    job_status: String,
    last_completed_task: {
        action_name: String,
        location_id: String
    },
    error_code: String,
    error_message: String
}, {collection: 'job_list', versionKey: false, timestamps: true});

var Jobs = mongoose.model('Jobs', job_schema);

module.exports = Jobs;