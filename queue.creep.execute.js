const utils = require("utils");
const getBlueprint = require("blueprints");

module.exports = function(room){
    const { creepQueue } = room.memory;
    const availableSpawns = utils.getAvailableSpawns(room);
    
    if(availableSpawns.length > 0){
        console.log("creepQueue before execution: ", JSON.stringify(room.memory.creepQueue));        
        const nextInCreepQueue = creepQueue[0];
        availableSpawns.forEach(spawn => {
            switch(nextInCreepQueue.creepType){
                case "miner": {
                    console.log("Spawning miner: ", JSON.stringify(nextInCreepQueue));
                    console.log("Should now shift from creep queue into 'in progress' queue");
                    console.log(JSON.stringify(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0]));

                    let spawnTest = spawn.spawnCreep(getBlueprint(nextInCreepQueue.creepType).workerBody,
                    `Busy Bee - ${Game.time}`,
                    {memory: {...getBlueprint(nextInCreepQueue.creepType).memory,
                        moveTo: spawn.getDirections(room.memory.spawnToSourcePaths[nextInCreepQueue.pathToSourceIndex].path[0])},
                        dryRun:true});

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
        
        console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));                            
    } else {
        console.log("No available spawns to execute creepQueue in room " + room.name);
    }
}