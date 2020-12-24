const utils = require("utils");
const draw = require("draw");

module.exports = {
    init: function(room) {
        // Push spawns to memory on room start
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


        // Push sources to memory on room start
        if(!room.memory.sources || !room.memory.sources.length){
            room.memory.sources = [];
            room.find(FIND_SOURCES).forEach(source => {
                room.memory.sources.push(source);
            })
        }

        // Push mining locations to memory on room start
        if(!room.memory.miningLocations || !room.memory.miningLocations.length){
            room.memory.miningLocations = [];
            room.setMiningLocations();
        }
        
        draw.availableMiningSpots(room);

        // Find path from spawn to energy sources
        if(!room.memory.spawnToSourcePaths || !room.memory.spawnToSourcePaths.length){
            room.memory.spawnToSourcePaths = [];
            room.setSpawnToSourcePaths();
        }
        
        draw.spawnToSourcePaths(room);
        
        // Find path from energy sources to spawn
        if(!room.memory.sourceToSpawnPaths || !room.memory.sourceToSpawnPaths.length){
            room.memory.sourceToSpawnPaths = [];
            room.setSourceToSpawnPaths();
        }
        
        draw.sourceToSpawnPaths(room);

        // Spawn basic workers (work, carry, carry, move, move)

    }
}