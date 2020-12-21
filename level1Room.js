const energyMiningSpots = require("energyMiningSpots");

module.exports = {
    init: function(roomName) {
        const room = Game.rooms[roomName];
        
        // Push spawns to memory on room start
        if(room.memory.mySpawns === undefined){
            room.memory.mySpawns = [];
            room.find(FIND_MY_SPAWNS).forEach(spawn => {
                room.memory.mySpawns.push(spawn);
            })
        }

        // Find optimal path from spawn to energy source

        // Find how many energy mining spots there are
        if(room.memory.miningLocations === undefined){
            room.memory.miningLocations = [];
            energyMiningSpots.saveToRoom(roomName);
        }
        
        room.memory.miningLocations.forEach(location => {
            terrain = new Room.Terrain(roomName);
            if(terrain.get(location.x, location.y) === 0){
                new RoomVisual(roomName).circle(location.x, location.y, {fill: "#ff0000"});
            }
            if(terrain.get(location.x, location.y) === 2){
                new RoomVisual(roomName).circle(location.x, location.y, {fill: "#00ff00"});
            }            
        })
        
        // Spawn basic workers (work, carry, carry, move, move)

        // roomSpawners.forEach(spawn => {
        //    console.log(spawn);
        // });
    }
}