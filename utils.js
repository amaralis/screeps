module.exports = {
    getAdjacentLocations: function(centerLocation) {
        let locations = [];

        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y - 1), directionsToHere: TOP,          adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_RIGHT,    adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x + 1), y:  centerLocation.pos.y,      directionsToHere: RIGHT,        adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x + 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_RIGHT, adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x:  centerLocation.pos.x,      y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM,       adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y + 1), directionsToHere: BOTTOM_LEFT,  adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x - 1), y:  centerLocation.pos.y,      directionsToHere: LEFT,         adjacentTo: centerLocation, isTakenBy: []});
        locations.push({x: (centerLocation.pos.x - 1), y: (centerLocation.pos.y - 1), directionsToHere: TOP_LEFT,     adjacentTo: centerLocation, isTakenBy: []});

        return locations;
    },

    getUpgradingLocations: function(controller) {
        let locations = [];

        locations.push({x:   controller.pos.x,      y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 1), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 2), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
        
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y - 2), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y - 1), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y:  controller.pos.y,      surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y + 1), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y + 2), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 3), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        
        locations.push({x:  (controller.pos.x + 2), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x + 1), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:   controller.pos.x,      y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 1), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 2), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y + 3), surroundsId: controller.id, isTakenBy:[]});
        
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y + 2), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y + 1), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y:  controller.pos.y,      surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y - 1), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y - 2), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 3), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
                
        locations.push({x:  (controller.pos.x - 2), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});
        locations.push({x:  (controller.pos.x - 1), y: (controller.pos.y - 3), surroundsId: controller.id, isTakenBy:[]});

        const terrain = new Room.Terrain(controller.room.name);

        locations = locations.filter(location => terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2);

        return locations;
    },

    findPath: function(from, to, opts = undefined){
        return PathFinder.search(from, to, opts);
    },

    getIdleSpawns: function(room){
        let idleSpawns = [];
        if(room.memory.roomSpawns && (room.memory.roomSpawns.length > 0)){
            room.memory.roomSpawns.forEach(spawn => {
                if(!Game.spawns[spawn.name].spawning){
                    idleSpawns.push(spawn);
                }
            });
        }

        // console.log(`Idle spawns at utils: ${JSON.stringify(idleSpawns)}`);

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
    },

    // /**
    //  * Pushes a creep name to a mining spot's isTakenBy array
    //  * @param {String} creepName
    //  * @param {Object} miningSpot 
    //  */
    // fillMiningSpot: function(creepName, miningSpot){
    //     miningSpot.isTakenBy.push(creepName);
    // }
}