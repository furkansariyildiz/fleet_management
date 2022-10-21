const Area = require('../../../models/area');

async function removeArea(filter){
    Area.findOneAndRemove(filter, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Area has been removed successfully");
        };
    });
};

module.exports = {
    removeArea: removeArea
};