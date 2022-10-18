var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var robots_schema = new Schema({
    id: {
        type: String,
        unique: true
    },
    type: String,
    url: String,
    current_activity: {
        type: String,
        default: "NULL"
    },
    external_reference_id: String
}, {collection: 'robots', versionKey: false, timestamps: true});

var Robots = mongoose.model('Robots', robots_schema);

module.exports = Robots;