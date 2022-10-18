const Robots = require('../models/robot');

module.exports.indexController = async function(connection, received_message, io){
    io.emit(connection, {
        "messageType": "IndexController" 
    });
};


