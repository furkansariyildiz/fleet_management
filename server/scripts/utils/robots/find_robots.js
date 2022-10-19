const Robots = require('../../../models/robot');

async function findRobots(filter){
    return await Robots.find(filter); 
};

module.exports = {
    findRobots: findRobots
};