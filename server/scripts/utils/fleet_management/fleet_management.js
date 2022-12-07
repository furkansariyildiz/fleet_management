const rosConnections = require('../ros_connections/ros_connections');
const findRobot = require('../robots/find_robots').findRobots;
const findJob = require('../jobs/find_job').findJob;
const checkConnectedRobots = require('./check_connected_robots').checkConnectedRobots
const generateJobToRobot = require('../jobs/generate_job_to_robot_service').generateJobToRobotService;
const arrayFunctions = require('../array_functions/array_functions');
const job_services = require('../ros_connections/ros_initialize').job_services;




async function fleetManagement(){
    await rosConnections.listRosConnections();
    setInterval(async function(){
        await checkConnectedRobots();
        var robots = await findRobot({current_activity: "IDLE"});
        var jobs = await findJob({job_status: "SCHEDULED"});
        if(robots.length > 0 && jobs.length > 0){
            // console.log(job_services);
            var index_of_job_service = arrayFunctions.findIndex(job_services, robots[0].url);
            // console.log(job_services[index_of_job_service][robots[0].url].job_to_robot);
            generateJobToRobot(jobs[0].external_reference_id, jobs[0].task_list, jobs[0].last_completed_task, job_services[index_of_job_service][robots[0].url].job_to_robot)
        }
    }, 1000);
};




module.exports = {
    fleetManagement: fleetManagement
};