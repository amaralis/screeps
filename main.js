const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
const draw = require("draw");
const utils = require("utils");
const creepController = require("controller.creep");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

delete Game.rooms["W4N3"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.roomSpawns; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.sourceToSpawnPaths; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.creeps; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.initialized; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.objectives; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.minersPerSource; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.state; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.creepQueue; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.creepProductionQueue; // JUST FOR TESTING
delete Game.rooms["W4N3"].memory.queue; // JUST FOR TESTING
delete Game.spawns["Spawn1"].memory.availableAdjacentLocations; // JUST FOR TESTING

module.exports.loop = function () {    
    for (const spawn in Memory.spawns){
        !Game.spawns[spawn] && delete Memory.spawns[spawn];

        console.log("spawn.spawning (queue.creep.execute): ", Game.spawns[spawn].spawning);
        console.log("spawn.spawning === true? ", (Game.spawns[spawn].spawning === true));
        console.log("spawn: ", JSON.stringify(Game.spawns[spawn]));

    }
    
    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        if(!room.memory.initialized){
            roomInitializer(room);
        }
        
        setCreepQueue(room);
        executeCreepQueue(room);

        
        // !!! drawing has non-insignificant impact on CPU usage
        draw.availableMiningSpots(room);
        draw.spawnToSourcePaths(room);
        draw.sourceToSpawnPaths(room);        
        draw.spawnAdjacentLocations(room);
    }
    
    for (const creep in Game.creeps){
        if(!Game.creeps[creep]){
            delete Memory.creeps[creep];
        } else {
            if(!Game.creeps[creep].spawning){
                creepController(creep);
            }
        }
        // if(Game.creeps[creep].memory.state === "idle"){
        //     switch(Game.creeps[creep].memory.role){
        //         case "miner": {
        //             Game.creeps[creep].moveByPath(Game.creeps[creep].room.findPath(creep.pos, creep.moveToPos));
        //         }
        //     }
        // }
    }

    // console.log(JSON.stringify(Game.creeps));
    // console.log(Game.cpu.getUsed());
}