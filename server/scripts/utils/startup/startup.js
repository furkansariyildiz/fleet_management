const Robots = require('../../../models/robot');

async function resetAllRobots(){
    Robots.updateMany({}, {current_activity: "UNCONNECTED"}, function(err){
        if(err){
            console.log(err);
        };
    });
};


module.exports = {
    resetAllRobots: resetAllRobots
};