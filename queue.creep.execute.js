const utils = require("utils");
const getBlueprint = require("blueprints");

/**
 * 
 * @param {Room} room 
 */

module.exports = function(room){
    const { creepQueue } = room.memory;

    const idleSpawns = utils.getIdleSpawns(room);
    const creepBlueprint = getBlueprint(creepQueue[0].creepType, room);
    
    if(idleSpawns.length > 0 && (room.memory.creepQueue.length > 0) && room.energyAvailable >= creepBlueprint.cost){

        idleSpawns.forEach(spawn => { // NOT NEEDED? ============================================
            console.log("Idle spawn at queue.execute: ", JSON.stringify(spawn));
            console.log("Creep blueprint cost: ", creepBlueprint.cost);

            if(room.energyAvailable >= creepBlueprint.cost){ // NOT NEEDED? ============================================

                switch(creepQueue[0].creepType){
                    case "miner": {
                        // console.log("Spawning miner before adding name: ", JSON.stringify(creepQueue[0]));
                        // console.log("Spawning miner after adding name: ", JSON.stringify(creepQueue[0]));
                        // console.log("Spawn name at queue.creep.execute inside switch: ", spawn.name);

                        let spawnTest = Game.spawns[spawn.name].spawnCreep(creepBlueprint.body,
                        creepQueue[0].name,
                        {
                            memory: {...creepBlueprint.memory,
                            toSourcePathIndex: creepQueue[0].pathToSourceIndex,
                            toSpawnPathIndex:creepQueue[0].pathToSpawnIndex,
                                },
                            // directions: [Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[creepQueue[0].pathToSourceIndex].path[0])],
                            dryRun:true
                        });

                        console.log("Spawn test code: ", spawnTest);

                        // !!! .spawning only flags on the next tick. Do not use !!!

                        if(spawnTest === 0){
                            console.log("creepQueue length before shift(): ", creepQueue.length);

                            let nextInCreepQueue = creepQueue.shift(); // THIS SHOULD MAYBE ONLY HAPPEN AFTER SPAWN TEST

                            console.log("creepQueue length after shift(): ", creepQueue.length);

                            // console.log("nextInCreepQueue => ", JSON.stringify(nextInCreepQueue));
                            // console.log("nextInCreepQueue.pathToSourceIndex => ", nextInCreepQueue.pathToSourceIndex);
                            // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex]));
                            // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                            console.log("spawnDirections at queue.execute: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                            console.log("Spawning miner sanity check: ", JSON.stringify(nextInCreepQueue));
                            Game.spawns[spawn.name].spawnCreep(creepBlueprint.body,
                            nextInCreepQueue.name,
                            {
                                memory: {...creepBlueprint.memory,
                                toSourcePathIndex: nextInCreepQueue.pathToSourceIndex,
                                toSpawnPathIndex:nextInCreepQueue.pathToSpawnIndex,
                                ownedBy: room.name
                                    },
                                // directions: [Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0])]
                            });
                            
                            // console.log("SPAWNING CREEP NAME: ", nextInCreepQueue.name);
                            // console.log("Creep in Game.creeps: ", Game.creeps[nextInCreepQueue.name]);
                            // console.log("SPAWN DIRECTIONS AT QUEUE EXECUTE: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));
                            room.memory.creepProductionQueue.push(nextInCreepQueue);
                        }
                        
                        // console.log(`SPAWN TEST CODE: ${spawnTest}`);

                        break;
                    }
                    case "hauler": {
                        break;
                    }
                    case "repairer": {
                        break;
                    }
                    case "builder": {
                        break;
                    }
                    case "fighter": {
                        break;
                    }
                    case "medic": {
                        break;
                    }
                    default:
                        console.log("Invalid item in production creepQueue: ", creepQueue[0]);
                }
            }
        });
        
        // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));                            
    } else {
        console.log("No available spawns in room " + room.name + " - at queue.creep.execute");
    }
}