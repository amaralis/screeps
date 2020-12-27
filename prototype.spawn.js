const utils = require("utils");
const getBlueprint = require("blueprints");

module.exports = function(){
    StructureSpawn.prototype.getOpenAdjacentLocations = function(){
        const adjacentLocationsArray = utils.getAdjacentLocations(this);
        const terrain = new Room.Terrain(this.room.name);
        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.availableAdjacentLocations.push(location);
            }
        })
    },

    StructureSpawn.prototype.getDirections = function(targetPos){
        let surroundingTiles = utils.getAdjacentLocations(this);
        surroundingTiles.forEach(tile => {
            if(tile.x === targetPos.x && tile.y === targetPos.y){
                return targetPos.directionsToHere;
            }
        });
    }
}