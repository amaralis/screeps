const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
const draw = require("draw");

delete Game.rooms["W6N3"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.mySpawns; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.sourceToSpawnPaths; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.creeps; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.initialized; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.objectives; // JUST FOR TESTING
//delete Game.spawns["Spawn1"].memory; // JUST FOR TESTING

module.exports.loop = function () {
    for (const creep in Memory.creeps){
        !Game.creeps[creep] && delete Memory.creeps[creep];
    }

    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        if(!room.memory.initialized){
            roomInitializer(room);
        }

        // !!! drawing has non-insignificant impact on CPU usage
        draw.availableMiningSpots(room);
        draw.spawnToSourcePaths(room);
        draw.sourceToSpawnPaths(room);
    }

    //console.log(Game.cpu.getUsed());
}