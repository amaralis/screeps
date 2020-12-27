module.exports = function(creep){
    const path = creep.getSpawnToSourcePath();
    creep.moveByPath(path);
    return path;
}