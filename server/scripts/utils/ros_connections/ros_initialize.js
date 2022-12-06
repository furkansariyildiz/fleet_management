const ROSLIB = require('roslib');
const rosReconnect = require('./ros_reconnect');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');
const CheckAreaAvailabilityRosFunctions = require('../check_area_availability/ros_functions');
const arrayFunctions = require('../array_functions/array_functions');
const findRobotAndUpdate = require('../robots/update_robot').findRobotAndUpdate;
const config = require('../../../config');

config();


//Topics
var rosbridge_topics = [];
var check_area_availability_topics = [];

//Services
var rosbridge_services = [];
var check_area_availability_services = [];


//variables
let ros_shutdown_condition = {};

async function rosInit(url){
    var ros = new ROSLIB.Ros({
        url: url
    });

    ros.on('connection', async function(){
        var robot_url = ros.socket._url;
        
        // Topics as JSON 
        var rosbridge_topic = {};
        var fleet_management_topic = {};

        // Services as JSON
        var rosbridge_service = {};
        var check_area_availability_service = {};

        // rosReconnect.rosReconnect(undefined, ros);
        
        // Generate Topics
        rosbridge_topic[robot_url] = rosbridgeRosFunctions.generateTopics(ros);

        // Generate Services
        check_area_availability_service[robot_url] = CheckAreaAvailabilityRosFunctions.generateServices(ros);

        // Pushing topic to belongs topics
        rosbridge_topics.push(rosbridge_topic);

        // Pushing service to belongs services
        check_area_availability_services.push(check_area_availability_service);
        
        // Update Robot Status when robot is connected with Rosbridge
        await findRobotAndUpdate({url: ros.socket._url}, {current_activity: "CONNECTED"}, {returnOriginal: false, new: true});

    });

    ros.on('close', async function(message){
        if(message.messageType == "rosShutdown"){
            ros_shutdown_condition[ros.socket._url] = true;
        }else if(ros_shutdown_condition[ros.socket._url] != true){
            // rosReconnect.rosReconnect(undefined, ros);
            var robot_url = ros.socket._url;

            //Finding index of topics from Array
            var index_of_rosbridge_topics = arrayFunctions.findIndex(rosbridge_topics, robot_url);
            
            //Finding index of services from Array
            var index_of_check_area_availability = arrayFunctions.findIndex(check_area_availability_services, robot_url);

            //Deleting topics from Array
            arrayFunctions.deleteElementFromArray(rosbridge_topics, index_of_rosbridge_topics);

            //Deleting services from Array
            arrayFunctions.deleteElementFromArray(check_area_availability_services, index_of_check_area_availability);

            setTimeout(function(){
                rosInit(url);
            }, 1000);
        }else{
            ros_shutdown_condition[ros.socket._url] = false;
        };
    });

    ros.on('error', async function(message){
        ros.close();
        // rosReconnect.rosReconnect(undefined, ros);
    });

    ros.on('shutdown', async function(message){
        console.log(message);
    });
};

module.exports = {
    rosInit: rosInit
};