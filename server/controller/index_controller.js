// const Robots = require('../models/robot');
// const generateAreaMeessage = require('../scripts/db_collections/area/generate_area_message');
// const saveArea = require('../scripts/db_collections/area/save_area');

module.exports.indexController = async function(connection, received_message, io){
    // var new_area = generateAreaMeessage.generateAreaMessage(received_message);
    // await saveArea.saveArea(new_area);
    io.emit(connection, {
        "messageType": "IndexController" 
    });
};


