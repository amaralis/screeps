const roomInitializer = require("roomInitializer");
require("prototype.room")();
require("prototype.spawn")();
require("prototype.creep")();
const draw = require("draw");
const utils = require("utils");
const creepController = require("controller.creep");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

// delete Game.rooms["W8N4"].memory.miningLocations; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.roomSpawns; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.sources; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.spawnToSourcePaths; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.sourceToSpawnPaths; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.spawnToControllerPaths; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.controllerUpgradeLocations; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.initialized; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.objectives; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.minersPerSource; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.state; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.creepQueue; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.creepProductionQueue; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.queue; // JUST FOR TESTING
// delete Game.rooms["W8N4"].memory.creeps; // JUST FOR TESTING
// delete Game.spawns["Spawn1"].memory.availableAdjacentLocations; // JUST FOR TESTING
// delete Memory.creeps; // JUST FOR TESTING

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
        if(room.memory.creepQueue.length){
            executeCreepQueue(room);
        }


        // Clear mining spots, room, and global memory of dead creeps
        for (let i = 0; i < room.memory.creeps.length; i++){
            let deadCreepName = Memory.creeps[room.memory.creeps[i]].name;
            // console.log(`CREEP ${deadCreepName}'s memory: ${JSON.stringify(Memory.creeps[deadCreepName])}`);
            
            if(!Game.creeps[deadCreepName]){    
                if(Memory.creeps[deadCreepName].role === "miner"){
                    // console.log(`Freeing up ${deadCreepName}'s mining spot.`);
                    let owningRoom = Game.rooms[Memory.creeps[deadCreepName].ownedBy];
                    // console.log(`Dead creep's owning room is ${roomName}.`);
                    
                    // console.log(`Freeing up ${deadCreepName} from room's creeps array.`);
                    // Clear creep from owner room's creeps array
                    owningRoom.memory.creeps.splice(owningRoom.memory.creeps.indexOf(deadCreepName), 1);

                    loop1:
                    for(let j = 0; j < owningRoom.memory.sources.length; j++){
                        // console.log("Searching through sources...");
                        let miningSpotsArray = owningRoom.getMiningSpotsPerSource(owningRoom.memory.sources[j]);
                        
                        for(let k = 0; k < miningSpotsArray.length; k++){
                            // console.log("Searching through mining spots...");
                            let deadCreepIndex = miningSpotsArray[k].isTakenBy.indexOf(deadCreepName);
                            // console.log("Dead creep's index in mining spot's isTakenBy array: ", miningSpotsArray[k].isTakenBy.indexOf(deadCreepName));
                            if(deadCreepIndex >= 0){
                                // console.log("Clearing up spot.isTakenBy array from dead creep ", deadCreepName);
                                // Clear creep from mining spot
                                miningSpotsArray[k].isTakenBy.splice(deadCreepIndex, 1);
                                break loop1;
                            }
                        }
                    }
                } else if(Memory.creeps[deadCreepName].role === "upgrader"){
                    // Clear creep from owner room's creeps array
                    let owningRoom = Game.rooms[Memory.creeps[deadCreepName].ownedBy];
                    owningRoom.memory.creeps.splice(owningRoom.memory.creeps.indexOf(deadCreepName), 1);
                    
                    let upgradingSpotsArray = owningRoom.memory.controllerUpgradeLocations;
                    for(let i = 0; i < upgradingSpotsArray.length; i++){
                        let deadCreepIndex = upgradingSpotsArray[i].isTakenBy.indexOf(deadCreepName);
                        // Clear creep from mining spot
                        upgradingSpotsArray[i].isTakenBy.splice(deadCreepIndex, 1);
                        break;

                    }

                }
                
                // console.log(`DELETING CREEP ${JSON.stringify(Memory.creeps[deadCreepName])} FROM MEMORY`);
                // Clear creep from global memory
                delete Memory.creeps[deadCreepName];
                // console.log(`DELETED CREEP ${JSON.stringify(Memory.creeps[deadCreepName])} FROM MEMORY? IF YES, NOTHING HERE`);
            }
        }

        for(const creepName in Game.creeps){
            // console.log("Calling creepController on ", Game.creeps[creepName]);
            creepController(Game.creeps[creepName]);
        }

        // !!! drawing has non-insignificant impact on CPU usage
        draw.availableMiningSpots(room);
        draw.spawnToSourcePaths(room);
        draw.sourceToSpawnPaths(room);        
        draw.spawnAdjacentLocations(room);
        draw.upgradingLocations(room);
        // draw.spawnToControllerPaths(room);
        draw.controllerToSpawnPaths(room);
    }

    // console.log(JSON.stringify(Game.creeps));
    console.log(Game.cpu.getUsed());
}