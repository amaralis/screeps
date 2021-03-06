const utils = require("utils");

module.exports = function(){
    StructureSpawn.prototype.getOpenAdjacentLocations = function(){
        const adjacentLocationsArray = utils.getAdjacentLocations(this);
        const terrain = new Room.Terrain(this.room.name);

        let newArray = [];
        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                newArray.push(location);
            }
        })

        return newArray;
    },

    StructureSpawn.prototype.getDirections = function(targetPos){
        // console.log("Spawn getDirections() called");
        // console.log("Spawn getDirections() arg: ", JSON.stringify(targetPos));
        let result = 0;
        let surroundingTiles = utils.getAdjacentLocations(this);
        surroundingTiles.forEach(tile => {
            if(tile.x === targetPos.x && tile.y === targetPos.y){
                // console.log("Spawn getDirections() tile.x: ", tile.x);
                // console.log("Spawn getDirections() targetPos.x: ", targetPos.x);
                // console.log("Spawn getDirections() tile.y: ", tile.y);
                // // console.log("Spawn getDirections() targetPos.y: ", targetPos.y);
                // console.log("Spawn getDirections() return value: ", tile.directionsToHere);
                result = tile.directionsToHere;
            }
        });
        // console.log("Result: ", result);
        return result;
    },

    StructureSpawn.prototype.setForbiddenUpgraderStartingPos = function(){
        let possibleSpawnLocations = this.getOpenAdjacentLocations();
        let takenLocations = [];
        this.room.memory.spawnToSourcePaths.forEach(pathObj => {
            takenLocations.push(pathObj.path[0]);
        });
        possibleSpawnLocations.forEach(possiblePos => {
            takenLocations.forEach(takenPos => {
                if(takenPos.x === possiblePos.x && takenPos.y === possiblePos.y){
                    this.memory.forbiddenUpgraderStartingPos.push(possiblePos);
                }
            });
        });
    }
}