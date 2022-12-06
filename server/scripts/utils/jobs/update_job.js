const Jobs = require('../../../models/job');


async function findJobAndUpdate(filter, update, options){
    Jobs.findOneAndUpdate(filter, update, options, function(err){
        if(err){
            console.log(err);
        };
    });
};


module.exports = {
    findJobAndUpdate: findJobAndUpdate
};