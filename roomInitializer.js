const level1Room = require("level1Room");

initializer = function(room) {
    // Push spawns to memory on new rooms
    if(!room.memory.mySpawns || !room.memory.mySpawns.length){
        room.memory.mySpawns = [];
        room.find(FIND_MY_SPAWNS).forEach(spawn => {
            room.memory.mySpawns.push(spawn);
        })

        room.memory.mySpawns.forEach(spawn => {
            spawn.memory.availableAdjacentLocations = [];
            spawn.getOpenAdjacentLocations();
        })
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
        })
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
    

    if(!room.memory.creeps){
        room.memory.creeps = [];
    }

    room.memory.initialized = true;
}

module.exports = initializer;