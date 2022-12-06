const Area = require('../../../models/area');

function generateAreaMessage(area_message){
    var area = new Area({
        area_name: area_message.area_name,
        position: area_message.position,
        orientation: area_message.orientation
    });

    return area;
};

module.exports = {
    generateAreaMessage: generateAreaMessage
};