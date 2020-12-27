module.exports = function(creep){
    const path = creep.getSourceToSpawnPath();
    creep.moveByPath(path);
    return path;
}