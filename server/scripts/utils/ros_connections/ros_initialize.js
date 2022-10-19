const ROSLIB = require('roslib');
const rosReconnect = require('./ros_reconnect');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');
const arrayFunctions = require('../array_functions/array_functions');
const config = require('../../../config');

config();

var rosbridge_topics = [];



let ros_shutdown_condition = {};

async function rosInit(url){
    var ros = new ROSLIB.Ros({
        url: url
    });

    ros.on('connection', async function(){
        var robot_url = ros.socket._url;
        var rosbridge_topic = {};

        rosReconnect.rosReconnect(undefined, ros);
        
        rosbridge_topic[robot_url] = rosbridgeRosFunctions.generateTopics(ros);
        rosbridge_topics.push(rosbridge_topic);
    });

    ros.on('close', async function(message){
        if(message.messageType == "rosShutdown"){
            ros_shutdown_condition[ros.socket._url] = true;
        }else if(ros_shutdown_condition[ros.socket._url] != true){
            rosReconnect.rosReconnect(undefined, ros);
            
            var robot_url = ros.socket._url;
            var index_of_rosbridge_topics = arrayFunctions.findIndex(rosbridge_topics, robot_url);
            
            arrayFunctions.deleteElementFromArray(rosbridge_topics, index_of_rosbridge_topics);

            setTimeout(function(){
                rosInit(url);
            }, 1000);
        }else{
            ros_shutdown_condition[ros.socket._url] = false;
        };
    });

    ros.on('error', async function(message){
        ros.close();
        rosReconnect.rosReconnect(undefined, ros);
    });

    ros.on('shutdown', async function(message){
        console.log(message);
    });
};

module.exports = {
    rosInit: rosInit
};