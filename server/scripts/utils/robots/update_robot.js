const Robots = require('../../../models/robot');

async function findRobotAndUpdate(filter, update, options){
    Robots.findOneAndUpdate(filter, update, options, function(err){
        if(err){
            console.log(err);
        };
    });
};


module.exports = {
    findRobotAndUpdate: findRobotAndUpdate
};