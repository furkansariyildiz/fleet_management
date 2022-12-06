const findArea = require('../../db_collections/area/find_area');

async function checkAreaAvailability(area_name){
    var area = await findArea.findArea({area_name: area_name});
    if(area.length == 0){
        console.log("Can not find an area with this name. Please check area_name!");
        return "false";
    }else{
        if(area[0].availability == true){
            console.log("Area is available. Robot can use this path...");
            return "true";
        };
    };
};

module.exports = {
    checkAreaAvailability: checkAreaAvailability
};