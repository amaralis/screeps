const utils = require("utils");
const getBlueprint = require("blueprints");

/**
 * 
 * @param {Room} room 
 */

module.exports = function(room){
    const { creepQueue, creepProductionQueue } = room.memory;

    const idleSpawns = utils.getIdleSpawns(room);
    const creepBlueprint = getBlueprint(creepQueue[0].creepType, room);
    let nextInCreepQueue = creepQueue[0];

    
    if(idleSpawns.length > 0 && (room.memory.creepQueue.length > 0) && room.energyAvailable >= creepBlueprint.cost){

        idleSpawns.forEach(spawn => {
            // console.log("Idle spawn at queue.execute: ", JSON.stringify(spawn));
            // console.log("Creep blueprint cost: ", creepBlueprint.cost);

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
                        toSpawnPathIndex: creepQueue[0].pathToSpawnIndex,
                            },
                        // directions: [Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[creepQueue[0].pathToSourceIndex].path[0])],
                        dryRun:true
                    });

                    console.log("Spawn test code: ", spawnTest);

                    // !!! .spawning only flags on the next tick. Do not use !!!

                    if(spawnTest === 0){

                        // console.log("nextInCreepQueue => ", JSON.stringify(nextInCreepQueue));
                        // console.log("nextInCreepQueue.pathToSourceIndex => ", nextInCreepQueue.pathToSourceIndex);
                        // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex]));
                        // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                        // console.log("spawnDirections at queue.execute: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                        // console.log("Spawning miner sanity check: ", JSON.stringify(nextInCreepQueue));
                        Game.spawns[spawn.name].spawnCreep(creepBlueprint.body,
                        nextInCreepQueue.name,
                        {
                            memory: {...creepBlueprint.memory, // state, role, type
                            toSourcePathIndex: nextInCreepQueue.pathToSourceIndex,
                            toSpawnPathIndex: nextInCreepQueue.pathToSpawnIndex,
                            ownedBy: room.name,
                            name: nextInCreepQueue.name,
                            hasMiningSpot: false,
                            targetSourceId: nextInCreepQueue.targetSourceId,
                            spawnedBy: spawn.id
                                },
                            // directions: [Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.toSourcePathIndex].path[0])]
                        });
                        
                        // console.log("SPAWNING CREEP NAME: ", nextInCreepQueue.name);
                        // console.log("Creep in Game.creeps: ", Game.creeps[nextInCreepQueue.name]);
                        // console.log("SPAWN DIRECTIONS AT QUEUE EXECUTE: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));
                        creepProductionQueue.push(nextInCreepQueue);
                        // console.log("creepQueue length before shift(): ", creepQueue.length);
                        creepQueue.shift();
                        // console.log("creepQueue length after shift(): ", creepQueue.length);
                    }
                    
                    // console.log(`SPAWN TEST CODE: ${spawnTest}`);

                    break;
                }

                case "upgrader": {
                    // console.log("Spawning upgrader before adding name: ", JSON.stringify(creepQueue[0]));
                    // console.log("Spawning upgrader after adding name: ", JSON.stringify(creepQueue[0]));
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

                    // console.log("Spawn test code: ", spawnTest);

                    // !!! .spawning only flags on the next tick. Do not use !!!

                    if(spawnTest === 0){

                        // console.log("nextInCreepQueue => ", JSON.stringify(nextInCreepQueue));
                        // console.log("nextInCreepQueue.pathToSourceIndex => ", nextInCreepQueue.pathToSourceIndex);
                        // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex]));
                        // console.log("room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0] => ", JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                        // console.log("spawnDirections at queue.execute: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                        // console.log("Spawning upgrader sanity check: ", JSON.stringify(nextInCreepQueue));
                        Game.spawns[spawn.name].spawnCreep(creepBlueprint.body,
                        nextInCreepQueue.name,
                        {
                            memory: {...creepBlueprint.memory, // state, role, type
                            toControllerPathIndex: nextInCreepQueue.pathToControllerIndex,
                            toSpawnPathIndex: nextInCreepQueue.pathToSpawnIndex,
                            ownedBy: room.name,
                            name: nextInCreepQueue.name,
                            hasUpgradingSpot: false,
                            targetControllerId: nextInCreepQueue.targetControllerId,
                            spawnedBy: spawn.id
                                },
                            // directions: [Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.toSourcePathIndex].path[0])]
                        });
                        
                        // console.log("SPAWNING CREEP NAME: ", nextInCreepQueue.name);
                        // console.log("Creep in Game.creeps: ", Game.creeps[nextInCreepQueue.name]);
                        // console.log("SPAWN DIRECTIONS AT QUEUE EXECUTE: ", Game.spawns[spawn.name].getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));
                        creepProductionQueue.push(nextInCreepQueue);
                        // console.log("creepQueue length before shift(): ", creepQueue.length);
                        creepQueue.shift();
                        // console.log("creepQueue length after shift(): ", creepQueue.length);
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
        });
        
        // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));                            
    } else {
        console.log("No available spawns in room " + room.name + " - at queue.creep.execute");
    }
}