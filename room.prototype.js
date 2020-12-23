const utils = require("utils");

module.exports = function(){
    Room.prototype.setMiningLocations = function() {
        let adjacentLocationsArray = utils.getAdjacentLocations(this.memory.sources);
        const terrain = new Room.Terrain(this.name);        

        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.miningLocations.push(location);
            }
        })
    }
}