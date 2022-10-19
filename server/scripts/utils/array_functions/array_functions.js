function findIndex(array, searched_key){
    for(var i=0; i<array.length; i++){
        if(Object.keys(array[i]) == searched_key){
            return i;
        }
    }
    return -1;
};

function deleteElementFromArray(array, index){
    if(index != -1){
        array.splice(index, 1);
        return array;
    };
};

module.exports = {
    findIndex: findIndex,
    deleteElementFromArray: deleteElementFromArray
};