async function saveArea(new_area){
    new_area.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("New Area has been saved successfully")
        };
    });
};

module.exports = {
    saveArea: saveArea
};