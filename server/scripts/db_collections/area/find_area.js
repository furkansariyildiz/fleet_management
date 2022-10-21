const Area = require('../../../models/area');

async function findArea(filter){
    return await Area.find(filter);
};

module.exports = {
    findArea: findArea
};