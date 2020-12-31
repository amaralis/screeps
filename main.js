const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
require("prototype.creep")();
const draw = require("draw");
const utils = require("utils");
const creepController = require("controller.creep");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

delete Game.rooms["W8N4"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.roomSpawns; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.sources; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.spawnToSourcePaths; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.sourceToSpawnPaths; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.initialized; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.objectives; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.minersPerSource; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.state; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepProductionQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.queue; // JUST FOR TESTING
delete Game.spawns["Spawn1"].memory.availableAdjacentLocations; // JUST FOR TESTING

module.exports.loop = function () {    
    
    console.log(`======================= TICK ${Game.time} =======================`)
    // console.log("Memory.creeps: ", JSON.stringify(Memory.creeps));
    // console.log("Game.creeps: ", JSON.stringify(Game.creeps));
    
    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        if(!room.memory.initialized){
            roomInitializer(room);
        }

        
        // Ideally, this isn't in main <<<<<<<<<<<======================================================================
        setCreepQueue(room);
        executeCreepQueue(room);


        // Clear room and global memory of dead creeps
        for (let i = 0; i < room.memory.creeps.length; i++){
            if(!Game.creeps[room.memory.creeps[i]]){
                console.log(`DELETING CREEP ${Game.creeps[room.memory.creeps[i]]} FROM MEMORY`);
                console.log(`CREEP ${Game.creeps[room.memory.creeps[i]]} memory in Memory: ${JSON.stringify(Memory.creeps[Game.creeps[room.memory.creeps[i]]])}`);
                delete Memory.creeps[room.memory.creeps.splice(i,1)];
            }
        }

        // !!! drawing has non-insignificant impact on CPU usage
        draw.availableMiningSpots(room);
        draw.spawnToSourcePaths(room);
        draw.sourceToSpawnPaths(room);        
        draw.spawnAdjacentLocations(room);
    }

    for (const creep in Memory.creeps){
        console.log("Cycling through creeps: ", creep)
        if(!Game.creeps[creep]){
            delete Memory.creeps[creep];
        } else {
            // console.log("Calling creepController on ", Game.creeps[creep]);
            creepController(Game.creeps[creep]);
        }
    }

    // console.log(JSON.stringify(Game.creeps));
    console.log(Game.cpu.getUsed());
}