const getTargetMiners = require("queue.miners");

const setCreepQueue = function(room){
    switch(room.memory.state){
        
        case "improving": {
            queueMiner(room);            
            break;
        }

        default:
            console.log("State not recognized: ", room.memory.state);
    }
}

module.exports = setCreepQueue;

const queueMiner = function(room){            
    let minersShort = getTargetMiners(room);
    const { minersPerSource } = room.memory;

    while(minersShort > 0){
        minersPerSource.forEach(source => {
            source.miningSpotsArray.forEach(miningSpotObj => {
                if(miningSpotObj.miningSpot.isTakenBy < 6){ // This needs an algorithm to decide how many miners per source we want in the early stages of a room
                    const toSourcePathIndex = getCreepPathToSourceIndex(room, miningSpotObj.miningSpot);
                    const toSpawnPathIndex = getCreepPathToSpawnIndex(room, miningSpotObj.miningSpot);

                    room.memory.creepQueue.push({creepType: "miner",
                    workUnits: source.workPerMiner,
                    targetSourceId: source.id,
                    pathToSourceIndex: toSourcePathIndex,
                    pathToSpawnIndex: toSpawnPathIndex});
                    minersShort--;
                }
            });
        });
    }

    console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));
}

const getCreepPathToSourceIndex = function(room, miningSpot){
    const { spawnToSourcePaths } = room.memory;
    for(let i = 0; i < spawnToSourcePaths.length; i++){
        let path = spawnToSourcePaths[i].path;
        let lastIndex = path.length-1;
        if(path[lastIndex].x === miningSpot.x && path[lastIndex].y === miningSpot.y){
            return i;
        }
    }
}
const getCreepPathToSpawnIndex = function(room, miningSpot){
    const { sourceToSpawnPaths } = room.memory;
    for(let i = 0; i < sourceToSpawnPaths.length; i++){
        let path = sourceToSpawnPaths[i];
        if(path[0].x === miningSpot.x && path[0].y === miningSpot.y){
            return i;
        }
    }
}