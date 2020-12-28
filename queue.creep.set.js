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
    console.log("minersShort at queue.creep.set: ", minersShort);
    console.log("Creep queue length queue.creep.set: ", room.memory.creepQueue.length);
    minersPerSource.forEach(sourceData => {
        sourceData.miningSpotsArray.forEach(miningSpotObj => {
            while(room.memory.creepQueue.length <= minersShort && miningSpotObj.miningSpot.isTakenBy < 5){ // This needs an algorithm to decide how many miners per source we want in the early stages of a room
                const toSourcePathIndex = getCreepPathToSourceIndex(room, miningSpotObj.miningSpot);
                const toSpawnPathIndex = getCreepPathToSpawnIndex(room, miningSpotObj.miningSpot);

                room.memory.creepQueue.push({creepType: "miner",
                workUnits: sourceData.workPerMiner,
                targetSourceId: sourceData.source.id,
                pathToSourceIndex: toSourcePathIndex,
                pathToSpawnIndex: toSpawnPathIndex});

                miningSpotObj.miningSpot.isTakenBy++;
                // console.log("This mining spot isTakenBy ", miningSpotObj.miningSpot.isTakenBy, " miners");
            }
        });
    });

    // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));
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