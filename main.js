const planner = require("planner");
require("prototype.room")();
require("prototype.spawn")();

delete Game.rooms["W6N3"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.mySpawns; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W6N3"].memory.sourceToSpawnPaths; // JUST FOR TESTING
//delete Game.spawns["Spawn1"].memory; // JUST FOR TESTING

module.exports.loop = function () {
    for (const creep in Memory.creeps){
        !Game.creeps[creep] && delete Memory.creeps[creep];
    }
    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        planner.init(room);
    }
}