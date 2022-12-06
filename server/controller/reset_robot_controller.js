

module.exports.resetRobotController = async function(connection, received_message, io){
    io.emit(connection, {
        'messageType': 'ResetRobot',
        'robotUrl': received_message.robot_url,
        'message': 'Robot Current Activity has been reseted.'
    });
};