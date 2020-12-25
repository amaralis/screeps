const getAdjacentLocations = require("utils").getAdjacentLocations;
const basicWorker = require("blueprints.worker");

module.exports = function(){
    StructureSpawn.prototype.getOpenAdjacentLocations = function(){
        const adjacentLocationsArray = getAdjacentLocations([this]);
        const terrain = new Room.Terrain(this.room.name);
        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.availableAdjacentLocations.push(location);
            }
        })
    },

    StructureSpawn.prototype.spawnBasicWorker = function(){
        console.log("Spawn basic worker called");
        let spawnTest = this.spawnCreep(basicWorker().workerBody, "undefined", {memory: basicWorker().memory, dryRun:true});
        console.log("Spawn test: ", spawnTest);
    }
}