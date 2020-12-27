const utils = require("utils");
const getBlueprint = require("blueprints");

module.exports = function(room){
    const { creepQueue } = room.memory;
    const availableSpawns = utils.getAvailableSpawns(room);
    
    if(availableSpawns.length > 0){
        const nextInCreepQueue = creepQueue.shift();
        availableSpawns.forEach(spawn => {
            switch(nextInCreepQueue.creepType){
                case "miner": {
                    console.log("Spawning miner: ", JSON.stringify(nextInCreepQueue));

                    let spawnTest = spawn.spawnCreep(getBlueprint(nextInCreepQueue.creepType).workerBody,
                    `Busy Bee - ${Game.time}`,
                    {
                        memory: {...getBlueprint(nextInCreepQueue.creepType).memory,
                        // moveToPos: room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0],
                        spawnTime: utils.getSpawnTimeFromBodyArray(getBlueprint(nextInCreepQueue.creepType).workerBody.length)
                            },
                        directions: spawn.getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]),
                        dryRun:true});

                    if(spawn.spawning){
                        const queuedCreepName = spawn.spawning.name;
                        console.log("Spawning creep name: ", queuedCreepName);
                        room.memory.creepProductionQueue.push(nextInCreepQueue);
                        room.memory.creeps.push(Game.creeps[queuedCreepName]);
                    }

                    console.log(spawnTest);

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