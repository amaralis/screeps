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
delete Game.rooms["W8N4"].memory.creeps; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.creepProductionQueue; // JUST FOR TESTING
delete Game.rooms["W8N4"].memory.queue; // JUST FOR TESTING
delete Game.spawns["Spawn1"].memory.availableAdjacentLocations; // JUST FOR TESTING

for (const creep in Memory.creeps){ // JUST FOR TESTING
    delete Memory.creeps[creep];
}

module.exports.loop = function () {    
    console.log(`======================= TICK ${Game.time} =======================`)
    console.log("Memory.creeps: ", JSON.stringify(Memory.creeps));
    console.log("Game.creeps: ", JSON.stringify(Game.creeps));
    
    for (const roomKey in Game.rooms) {
        const room = Game.rooms[roomKey];
        if(!room.memory.initialized){
            roomInitializer(room);
        }

        
        // Ideally, this isn't in main <<<<<<<<<<<======================================================================
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