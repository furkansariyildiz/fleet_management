const ROSLIB = require('roslib');
const rosReconnect = require('./ros_reconnect');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');
const fleetManagementRosFunctions = require('../fleet_management/ros_functions');
const arrayFunctions = require('../array_functions/array_functions');
const config = require('../../../config');

config();


//Topics
var rosbridge_topics = [];
var fleet_management_topics = [];

//Services
var rosbridge_services = [];
var fleet_management_services = [];


//variables
let ros_shutdown_condition = {};

async function rosInit(url){
    var ros = new ROSLIB.Ros({
        url: url
    });

    ros.on('connection', async function(){
        var robot_url = ros.socket._url;
        
        //Topics as JSON 
        var rosbridge_topic = {};
        var fleet_management_topic = {};

        //Services as JSON
        var rosbridge_service = {};
        var fleet_management_service = {};

        rosReconnect.rosReconnect(undefined, ros);
        
        //Generate Topics
        rosbridge_topic[robot_url] = rosbridgeRosFunctions.generateTopics(ros);

        //Generate Services
        fleet_management_service[robot_url] = fleetManagementRosFunctions.generateServices(ros);

        //Pushing topic to belongs topics
        rosbridge_topics.push(rosbridge_topic);

        //Pushing service to belongs services
        fleet_management_services.push(fleet_management_service);

    });

    ros.on('close', async function(message){
        if(message.messageType == "rosShutdown"){
            ros_shutdown_condition[ros.socket._url] = true;
        }else if(ros_shutdown_condition[ros.socket._url] != true){
            rosReconnect.rosReconnect(undefined, ros);
            var robot_url = ros.socket._url;

            //Finding index of topics from Array
            var index_of_rosbridge_topics = arrayFunctions.findIndex(rosbridge_topics, robot_url);
            
            //Finding index of services from Array
            var index_of_fleet_management_services = arrayFunctions.findIndex(fleet_management_services, robot_url);

            //Deleting topics from Array
            arrayFunctions.deleteElementFromArray(rosbridge_topics, index_of_rosbridge_topics);

            //Deleting services from Array
            arrayFunctions.deleteElementFromArray(fleet_management_services, index_of_fleet_management_services);

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