module.exports = {
    getAdjacentLocations: function(centerLocation) {
        let locations = [];

        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y - 1), directionsToHere: TOP,          adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_RIGHT,    adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y:  centerLocation.pos.y,      directionsToHere: RIGHT,        adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_RIGHT, adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM,       adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_LEFT,  adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y:  centerLocation.pos.y,      directionsToHere: LEFT,         adjacentTo: centerLocation, isTakenBy: 0});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_LEFT,     adjacentTo: centerLocation, isTakenBy: 0});

        return locations;
    },

    findPath: function(from, to, opts = undefined){
        return PathFinder.search(from, to, opts);
    },

    getIdleSpawns: function(room){
        let idleSpawns = [];
        if(room.memory.roomSpawns && (room.memory.roomSpawns.length > 0)){
            room.memory.roomSpawns.forEach(spawn => {
                // console.log(`Is spawn ${spawn.name} spawning? ${spawn.spawning === true}`);
                if(!Game.spawns[spawn.name].spawning){
                    idleSpawns.push(spawn);
                }
            });
        }

        // for (const spawnKey in Game.spawns){
        //     if(!Game.spawns[spawnKey].spawning){
        //         idleSpawns.push(Game.spawns[spawnKey]);
        //     }
        // }

        // availableSpawns = idleSpawns.filter(spawn => {
        //     return /* spawn.store.getUsedCapacity(RESOURCE_ENERGY) */ spawn.room.energyCapacityAvailable >= this.getBodyEnergyCostByBlueprint(creepType, spawn.room);
        // });

        console.log(`Idle spawns at utils: ${JSON.stringify(idleSpawns)}`);

        return idleSpawns;
    },

    // getBodyEnergyCostByBlueprint: function(creepType, room){
    //     const bodyArray = getBlueprint(creepType, room).body;
    //     let sum = 0;
    //     bodyArray.forEach(part => {
    //         sum += BODYPART_COST[part];
    //     });

    //     return sum;
    // },

    getSpawnTimeFromBodyArray: function(bodyArray){
        return bodyArray.length * 3;
    }
}