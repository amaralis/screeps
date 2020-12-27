const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
const draw = require("draw");
const utils = require("utils");

delete Game.rooms["W8N4"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.roomSpawns; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.sourceToSpawnPaths; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creeps; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.initialized; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.objectives; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.minersPerSource; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.state; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepProductionQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.queue; // JUST FOR TESTING
//delete Game.spawns["Spawn1"].memory; // JUST FOR TESTING

module.exports.loop = function () {
    for (const creep in Memory.creeps){
        !Game.creeps[creep] && delete Memory.creeps[creep];
        // if(Game.creeps[creep].memory.state === "idle"){
        //     switch(Game.creeps[creep].memory.role){
        //         case "miner": {
        //             Game.creeps[creep].moveByPath(Game.creeps[creep].room.findPath(creep.pos, creep.moveToPos));
        //         }
        //     }
        // }
    }

    for (const spawn in Memory.spawns){
        !Game.spawns[spawn] && delete Memory.spawns[spawn];
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
        draw.spawnAdjacentLocations(room);
    }

    // console.log(Game.cpu.getUsed());
}