const Jobs = require('../../../models/job');

function findJob(filter){
    return new Promise((resolve, reject) => {
        Jobs.find(filter, (err, result) => {
            if(err){
                resolve(err);
            }else{
                resolve(result);
            };
        });
    });
};


module.exports = {
    findJob: findJob
};