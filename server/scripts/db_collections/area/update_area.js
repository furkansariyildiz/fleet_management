const Area = require('../../../models/area');

async function updateArea(filter, update, options){
    Area.findOneAndUpdate(filter, update, options, function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Area has been updated successfully");
        };
    });
};

module.exports = {
    updateArea: updateArea
};