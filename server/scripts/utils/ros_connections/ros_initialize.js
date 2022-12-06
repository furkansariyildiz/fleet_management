const ROSLIB = require('roslib');
const rosbridgeRosFunctions = require('../ros_bridge/ros_functions');
const checkAreaAvailabilityRosFunctions = require('../check_area_availability/ros_functions');
const robotRosFunctions = require('../robots/ros_functions');
const speedRosFunctions = require('../speed/ros_functions');

const arrayFunctions = require('../array_functions/array_functions');
const findRobotAndUpdate = require('../robots/update_robot').findRobotAndUpdate;
const config = require('../../../config');

config();


//Topics
var rosbridge_topics = [];
var check_area_availability_topics = [];
var robot_topics = [];
var speed_topics = [];

//Services
var rosbridge_services = [];
var check_area_availability_services = [];
var robot_services = [];
var speed_services = [];



async function rosInit(url){
    var ros = new ROSLIB.Ros({
        url: url
    });

    ros.on('connection', async function(){
        var robot_url = ros.socket._url;
        
        // Topics as JSON 
        var rosbridge_topic = {};
        var fleet_management_topic = {};
        var robot_topic = {};
        var speed_topic = {};

        // Services as JSON
        var rosbridge_service = {};
        var check_area_availability_service = {};
        var robot_service = {};
        var speed_service = {};

        // Generate Topics
        rosbridge_topic[robot_url] = rosbridgeRosFunctions.generateTopics(ros);
        speed_topic[robot_url] = speedRosFunctions.generateTopics(ros);

        // Generate Services
        check_area_availability_service[robot_url] = checkAreaAvailabilityRosFunctions.generateServices(ros);
        robot_service[robot_url] = robotRosFunctions.generateServices(ros);

        // Pushing topic to belongs topics
        rosbridge_topics.push(rosbridge_topic);
        speed_topics.push(speed_topic);
        
        // Pushing service to belongs services
        check_area_availability_services.push(check_area_availability_service);
        robot_services.push(robot_service);

        // Update Robot Status when robot is connected with Rosbridge
        await findRobotAndUpdate({url: ros.socket._url}, {current_activity: "CONNECTED"}, {returnOriginal: false, new: true});
        
    });

    ros.on('close', async function(message){
        var robot_url = ros.socket._url;

        //Finding index of topics from Array
        var index_of_rosbridge_topics = arrayFunctions.findIndex(rosbridge_topics, robot_url);
        var index_of_speed_topics = arrayFunctions.findIndex(speed_topics, robot_url);

        //Finding index of services from Array
        var index_of_check_area_availability_services = arrayFunctions.findIndex(check_area_availability_services, robot_url);
        var index_of_robot_services = arrayFunctions.findIndex(robot_services, robot_url);

        //Deleting topics from Array
        arrayFunctions.deleteElementFromArray(rosbridge_topics, index_of_rosbridge_topics);
        arrayFunctions.deleteElementFromArray(speed_topics, index_of_speed_topics);

        //Deleting services from Array
        arrayFunctions.deleteElementFromArray(check_area_availability_services, index_of_check_area_availability_services);
        arrayFunctions.deleteElementFromArray(robot_services, index_of_robot_services);
        
        setTimeout(function(){
            rosInit(url);
        }, 1000);
    });

    ros.on('error', async function(message){
        ros.close();
    });

    ros.on('shutdown', async function(message){
        console.log(message);
    });
};

module.exports = {
    rosInit: rosInit,
    robot_services: robot_services,
    speed_topics: speed_topics
};