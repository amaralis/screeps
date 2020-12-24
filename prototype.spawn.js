const getAdjacentLocations = require("utils").getAdjacentLocations;

module.exports = function(){
    StructureSpawn.prototype.getOpenAdjacentLocations = function(){
        const adjacentLocationsArray = getAdjacentLocations([this]);
        const terrain = new Room.Terrain(this.room.name);
        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.availableAdjacentLocations.push(location);
            }
        })
    }
}