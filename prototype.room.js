const getAdjacentLocations = require("utils").getAdjacentLocations;
const utils = require("utils");

module.exports = function(){
    Room.prototype.setMiningLocations = function() {
        let adjacentLocationsArray = getAdjacentLocations(this.memory.sources);
        const terrain = new Room.Terrain(this.name);

        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.miningLocations.push(location);
            }
        })
    },

    Room.prototype.setSpawnToSourcePaths = function(){
        this.memory.mySpawns.forEach(spawn => {
            this.memory.miningLocations.forEach(location => {
                this.memory.spawnToSourcePaths.push({spawn: spawn, location: location, path: utils.findPath(spawn.pos, new RoomPosition(location.x, location.y, this.name)).path});
            });
        });
    },

    Room.prototype.setSourceToSpawnPaths = function(){
        this.memory.spawnToSourcePaths.forEach(obj => {
                let tempPathArray = [...obj.path];
                tempPathArray = tempPathArray.reverse();
                this.memory.sourceToSpawnPaths.push(tempPathArray);
        })
    },

    Room.prototype.getMiningSpotsPerSource = function(source){
        let spotsPerSource = [];
        this.memory.miningLocations.forEach(miningSpot => {
            if(miningSpot.adjacentTo.id == source.id){
                spotsPerSource.push({miningSpot, source});
            }
        });
        
        console.log(spotsPerSource, spotsPerSource.length);

        return spotsPerSource;
    }
}