const utils = require("utils");
const draw = require("draw");

module.exports = {
    init: function(roomName) {
        const room = Game.rooms[roomName];
        
        // Push spawns to memory on room start
        if(room.memory.mySpawns === undefined || room.memory.mySpawns.length === 0){ // Room is fresh, no memory
            room.memory.mySpawns = [];
            room.find(FIND_MY_SPAWNS).forEach(spawn => {
                room.memory.mySpawns.push(spawn);
            })
        }

        // Find optimal path to energy source
        if(room.memory.sources === undefined || room.memory.sources.length === 0){ // Room is fresh, no memory
            room.memory.sources = [];
            room.find(FIND_SOURCES).forEach(source => {
                room.memory.sources.push(source);
            })
        }

        // Find how many energy mining spots there are
        if(room.memory.miningLocations === undefined){
            room.memory.miningLocations = [];
            room.setMiningLocations(utils.setAdjacentLocations(room, room.memory.sources));
        }
        
        draw.availableMiningSpots(room);
        
        // Spawn basic workers (work, carry, carry, move, move)

        // roomSpawners.forEach(spawn => {
        //    console.log(spawn);
        // });
    }
}