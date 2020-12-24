const level1Room = require("level1Room");
const objectives = require("roomObjectives");

initializer = function(room) {
    room.memory.initialized = false;

    // Push spawns to memory on new rooms
    if(!room.memory.mySpawns || !room.memory.mySpawns.length){
        room.memory.mySpawns = [];
        const spawns = room.find(FIND_MY_SPAWNS);
        if(spawns){
            spawns.forEach(spawn => {
                room.memory.mySpawns.push(spawn);
                spawn.memory.availableAdjacentLocations = [];
                spawn.getOpenAdjacentLocations();
            });
        }
    }

    room.memory.mySpawns.forEach(spawn => {
        Game.spawns[spawn.name].memory.availableAdjacentLocations.forEach(location => {
            new RoomVisual(room.name).circle(location.x, location.y, {fill: "green", stroke: "#ff0000", strokeWidth: 0.1});
        })
    })

    // Push sources to memory on new rooms
    if(!room.memory.sources || !room.memory.sources.length){
        room.memory.sources = [];
        room.find(FIND_SOURCES).forEach(source => {
            room.memory.sources.push(source);
        });
    }

    // Push mining locations to memory on new rooms
    if(!room.memory.miningLocations || !room.memory.miningLocations.length){
        room.memory.miningLocations = [];
        room.setMiningLocations();
    }    

    // Find path from spawn to energy sources, commit to room memory on new rooms
    if(!room.memory.spawnToSourcePaths || !room.memory.spawnToSourcePaths.length){
        room.memory.spawnToSourcePaths = [];
        room.setSpawnToSourcePaths();
    }    
    
    // Find path from energy sources to spawn, commit to room memory on new rooms
    if(!room.memory.sourceToSpawnPaths || !room.memory.sourceToSpawnPaths.length){
        room.memory.sourceToSpawnPaths = [];
        room.setSourceToSpawnPaths();
    }
    
    // Push mining locations to memory on new rooms
    if(!room.memory.creeps || !room.memory.creeps.length){
        room.memory.creeps = [];
    }

    if(!room.memory.objectives || !room.memory.objectives.length){
        room.memory.objectives = [];
        //objectives.getObjectives(room);
    }
    
    // Harvester formula
    if(!room.memory.harvesterFormula && room.memory.sources){
        room.memory.sources.forEach(source => {
            const numberOfMiningSpots = room.getMiningSpotsPerSource(source).length;
            const workAmount = Math.ceil(source.energyCapacity/2/300/numberOfMiningSpots);
            console.log(workAmount);
        });        
    }

    room.memory.initialized = true;
}

module.exports = initializer;