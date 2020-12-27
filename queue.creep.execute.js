const utils = require("utils");
const getBlueprint = require("blueprints");

module.exports = function(room){
    const { creepQueue } = room.memory;
    const availableSpawns = utils.getAvailableSpawns(room);
    
    if(availableSpawns.length > 0){ // NEEDS ENERGY CHECK
        let nextInCreepQueue = creepQueue.shift();
        availableSpawns.forEach(spawn => {
            // console.log("Spawn name at queue.creep.execute: ", spawn.name);
            switch(nextInCreepQueue.creepType){
                case "miner": {
                    console.log("Spawning miner before adding name: ", JSON.stringify(nextInCreepQueue));
                    nextInCreepQueue.name = `Busy Bee - ${Game.time}`;
                    console.log("Spawning miner after adding name: ", JSON.stringify(nextInCreepQueue));
                    console.log("Spawn name at queue.creep.execute inside switch: ", spawn.name);

                    let spawnTest = spawn.spawnCreep(getBlueprint(nextInCreepQueue.creepType).workerBody,
                    nextInCreepQueue.name,
                    {
                        memory: {...getBlueprint(nextInCreepQueue.creepType).memory,
                        // moveToPos: room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0],
                        // spawnTime: utils.getSpawnTimeFromBodyArray(getBlueprint(nextInCreepQueue.creepType).workerBody.length),
                        toSourcePathIndex: nextInCreepQueue.pathToSourceIndex,
                        toSpawnPathIndex:nextInCreepQueue.pathToSpawnIndex,
                            },
                        directions: spawn.getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]),
                        dryRun:true
                    });

                    console.log("Spawn test code: ", spawnTest);

                    // !!! .spawning only flags on the next tick. Do not use !!!

                    if(spawnTest === 0){
                        spawn.spawnCreep(getBlueprint(nextInCreepQueue.creepType).workerBody,
                        nextInCreepQueue.name,
                        {
                            memory: {...getBlueprint(nextInCreepQueue.creepType).memory,
                            // moveToPos: room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0],
                            // spawnTime: utils.getSpawnTimeFromBodyArray(getBlueprint(nextInCreepQueue.creepType).workerBody.length),
                            toSourcePathIndex: nextInCreepQueue.pathToSourceIndex,
                            toSpawnPathIndex:nextInCreepQueue.pathToSpawnIndex,
                                },
                            directions: [spawn.getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0])]
                        });
                        
                        console.log("Spawning miner sanity check: ", JSON.stringify(nextInCreepQueue));
                        console.log("SPAWNING CREEP NAME: ", nextInCreepQueue.name);
                        console.log("This creep shouldn't exist in Game.creeps and return undefined: ", Game.creeps[nextInCreepQueue.name]);
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
        });
        
        // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));                            
    } else {
        console.log("No available spawns to execute creepQueue in room " + room.name);
    }
}