var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var areas_schema = new Schema({
    area_name: {
        type: String,
        unique: true
    },
    position: {
        x: String,
        y: String,
        z: String
    },
    orientation: {
        x: String,
        y: String,
        z: String,
        w: String
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {collection: 'areas', versionKey: false, timestamps: true});

var Areas = mongoose.model('Areas', areas_schema);

module.exports = Areas;