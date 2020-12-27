module.exports = function(){
    Creep.prototype.getSpawnToSourcePath = function(){
        return this.room.memory.spawnToSourcePaths[this.memory.toSourcePathIndex].path; // room.memory.spawnToSourcePaths probably only needs the path array, like the other one
    },
    
    Creep.prototype.getSourceToSpawnPath = function(){
        return this.room.memory.sourceToSpawnPaths[this.memory.toSpawnPathIndex];
    }
}