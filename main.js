const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
const draw = require("draw");
const utils = require("utils");
const creepController = require("controller.creep");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

delete Game.rooms["W2N5"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.roomSpawns; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.sourceToSpawnPaths; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.creeps; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.initialized; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.objectives; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.minersPerSource; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.state; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.creepQueue; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.creepProductionQueue; // JUST FOR TESTING
delete Game.rooms["W2N5"].memory.queue; // JUST FOR TESTING
delete Game.spawns["Spawn1"].memory.availableAdjacentLocations; // JUST FOR TESTING

for (const creep in Memory.creeps){ // JUST FOR TESTING
    delete Memory.creeps[creep];
}

module.exports.loop = function () {    
    console.log(`======================= TICK ${Game.time} =======================`)
    console.log("Memory.creeps: ", JSON.stringify(Memory.creeps));
    console.log("Game.creeps: ", JSON.stringify(Game.creeps));
    for (const spawn in Memory.spawns){
        !Game.spawns[spawn] && delete Memory.spawns[spawn];

        // console.log("spawn.spawning (main): ", JSON.stringify(Game.spawns[spawn].spawning));
        // console.log("!spawn.spawning ? ", (!Game.spawns[spawn].spawning));
        // console.log("spawn: ", JSON.stringify(Game.spawns[spawn]));

    }
    
    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        if(!room.memory.initialized){
            roomInitializer(room);
        }

        // // Also add to existing miners any creeps currently spawning EXPERIMENTAL <<<<<<<<<<<<<<<<<===========================
        // if(Game.creeps && (Object.keys(Game.creeps).length > 0)){
        //     room.memory.creepProductionQueue.forEach(creep => {
        //         if(!creep.memory.ownedBy){
        //             for (const creepKey in Game.creeps){
        //                 if(creepKey === creep.name){
        //                     Game.creeps[creepKey].memory.ownedBy = room.name;
        //                     room.memory.creeps.push(Game.creeps[creepKey]);
        //                 }     
        //             }
        //         }
        //     });
        // }

        
        // Ideally, this isn't in main
        setCreepQueue(room);
        executeCreepQueue(room);

        // !!! drawing has non-insignificant impact on CPU usage
        draw.availableMiningSpots(room);
        draw.spawnToSourcePaths(room);
        draw.sourceToSpawnPaths(room);        
        draw.spawnAdjacentLocations(room);
    }
    
    console.log("Memory.creeps: ", JSON.stringify(Memory.creeps));

    for (const creep in Memory.creeps){
        console.log("Cycling through creeps: ", creep)
        if(!Game.creeps[creep]){
            delete Memory.creeps[creep];
        } else {
            console.log("Calling creepController on ", Game.creeps[creep]);
            creepController(Game.creeps[creep]);
        }
    }

    // console.log(JSON.stringify(Game.creeps));
    // console.log(Game.cpu.getUsed());
}