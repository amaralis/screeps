module.exports = function(){
    Creep.prototype.getSpawnToSourcePath = function(){
        return this.room.memory.spawnToSourcePaths[this.memory.toSourcePathIndex].path; // room.memory.spawnToSourcePaths probably only needs the path array, like the other one
    },
    
    Creep.prototype.getSourceToSpawnPath = function(){
        return this.room.memory.sourceToSpawnPaths[this.memory.toSpawnPathIndex];
    },

    Creep.prototype.getMiningSpot = function(){
        let pathToSource = this.getSpawnToSourcePath();
        let lastIndex = pathToSource.length - 1;
        return pathToSource[lastIndex];
    },

    Creep.prototype.getSpawnToControllerPath = function(){
        return this.room.memory.spawnToControllerPaths[this.memory.toControllerPathIndex].path; // room.memory.spawnToSourcePaths probably only needs the path array, like the other one
    },
    
    Creep.prototype.getControllerToSpawnPath = function(){
        return this.room.memory.controllerToSpawnPaths[this.memory.toSpawnPathIndex];
    },

    Creep.prototype.getUpgradingSpot = function(){
        let pathToController = this.getSpawnToControllerPath();
        let lastIndex = pathToController.length - 1;
        return pathToController[lastIndex];
    }
}