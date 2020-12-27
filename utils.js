module.exports = {
    getAdjacentLocations: function(centerLocation) {
        let locations = [];

        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y - 1), directionsToHere: TOP,       adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_RIGHT, adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y:  centerLocation.pos.y,      directionsToHere: RIGHT,       adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_RIGHT, adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM,       adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_LEFT,  adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y:  centerLocation.pos.y,      directionsToHere: LEFT,        adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_LEFT,  adjacentTo: centerLocation, isTakenBy: 0});

        return locations;
    },

    findPath: function(from, to, opts = undefined){
        return PathFinder.search(from, to, opts);
    },

    getAvailableSpawns: function(room){
        let availableSpawns = [];
        for (const spawnKey in Game.spawns){
            if(!Game.spawns[spawnKey].spawning){
                availableSpawns.push(Game.spawns[spawnKey]);
                // console.log("Getting spawns at utils: ", spawnKey);
            }
        }

        console.log("Available spawns at utils.js", JSON.stringify(availableSpawns));

        return availableSpawns;
    },

    getSpawnTimeFromBodyArray: function(bodyArray){
        return bodyArray.length * 3;
    }
}