const config = require('../../../config');

config();

let ros_list_for_reconnect = [];

function rosReconnect(robot_url, ros){
    if(ros == undefined){
        for(var i=0; i<ros_list_for_reconnect.length; i++){
            if(robot_url == ros_list_for_reconnect[i].socket._url){
                ros_list_for_reconnect[i].close();
            };
        };
    }else if(robot_url == undefined){
        if(ros_list_for_reconnect.length == 0){
            ros_list_for_reconnect.push(ros);
        }else{
            for(var i=0; i<ros_list_for_reconnect.length; i++){
                if(ros_list_for_reconnect[i].socket._url == robot_url){
                    ros_list_for_reconnect[i] = ros;
                }
            };
        };
    };
};

module.exports = {
    rosReconnect: rosReconnect
};