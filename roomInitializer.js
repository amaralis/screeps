const level1Room = require("level1Room");

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
    
    // Create creeps array
    if(!room.memory.creeps || !room.memory.creeps.length){
        room.memory.creeps = [];
    }
    
    // Find how many work units and miners per source are needed
    if(!room.memory.minersPerSource && room.memory.sources){
        room.memory.minersPerSource = [];
        room.memory.sources.forEach(source => {
            const miningSpotsArray = room.getMiningSpotsPerSource(source);
            const workAmount = Math.ceil(source.energyCapacity/2/SPAWN_ENERGY_CAPACITY/miningSpotsArray.length);
            room.memory.minersPerSource.push({miningSpotsArray, workPerMiner: workAmount, source});
        });
    }

    // Queue up room objectives
    if(!room.memory.queue || !room.memory.queue.length){
        room.memory.queue = []
        room.setQueue();
    }

    room.memory.initialized = true;
}

module.exports = initializer;