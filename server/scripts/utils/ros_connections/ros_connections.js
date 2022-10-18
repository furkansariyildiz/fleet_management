const ROSLIB = require('roslib');
const config = require('../../../config');
const findRobots = require('../robots/find_robots');
const arrayFunctions = require('../array_functions/array_functions');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');


config();

var rosbridge_topics = [];

let ros_list_for_reconnect = [];

let ros_shutdown_condition = {};



async function listRosConnections(){
    var filter = {};
    var robots = await findRobots.findRobots(filter);
};

async function rosInit(url){
    var ros = new ROSLIB.Ros({
        url: url
    });

    ros.on('connection', async function(){
        var robot_url = ros.socket._url;
        var rosbridge_topic = {}

        rosReconnect(undefined, ros);
        rosbridge_topic[robot_url] = rosbridgeRosFunctions.generateTopics(ros);
        
        rosbridge_topics.push(rosbridge_topic);
    });

    ros.on('close', async function(message){
        if(message.messageType == "rosShutdown"){
            ros_shutdown_condition[ros.socket._url] = true;
        }else if(ros_shutdown_condition[ros.socket._url] != true){
            rosReconnect(undefined, ros);
            var robot_url = ros.socket._url;
            var index_of_rosbridge_topics = arrayFunctions.findIndex(rosbridge_topics, robot_url);
            
            arrayFunctions.deleteElementFromArray(rosbridge_topics, index_of_rosbridge_topics);

            setTimeout(function(){
                rosInit(url);
            }, 1000);
        }else{
            ros_shutdown_condition[ros.socket._url] = false;
        };
    })
}

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
    listRosConnections: listRosConnections,
};
