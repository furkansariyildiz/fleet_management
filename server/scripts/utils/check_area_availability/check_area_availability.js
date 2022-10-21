const findArea = require('../../db_collections/area/find_area');

async function checkAreaAvailability(area_name){
    console.log("Area name: ", area_name);
    var area = await findArea.findArea({area_name: area_name});
    if(area.length == 0){
        console.log("Can not find an area with this name. Please check area_name!");
    };
};

module.exports = {
    checkAreaAvailability: checkAreaAvailability
};