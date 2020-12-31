const getNeededMiners = require("queue.miners");

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
    let minersShort = getNeededMiners(room);
    const { minersPerSource } = room.memory;
    console.log("minersShort at queue.creep.set: ", minersShort);
    console.log("Creep queue length queue.creep.set: ", room.memory.creepQueue.length);
    minersPerSource.forEach(sourceData => {
        sourceData.miningSpotsArray.forEach(miningSpotObj => {
            // while(room.memory.creepQueue.length < minersShort && miningSpotObj.isTakenBy < 5){ // This needs a creep reference AND an algorithm to decide how many miners per source we want in the early stages of a room
            const beeCode = function(){
                let str = "";
                let i = 0;
                while(i<5){
                    str += String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x30FF)) + 0x30FF);

                    // str += String.fromCharCode(Math.floor(Math.random() * (2304 - 2307)) + 2307);
                    // str += String.fromCharCode(Math.floor(Math.random() * (2561 - 2563)) + 2563);
                    // str += String.fromCharCode(Math.floor(Math.random() * (2810 - 2815)) + 2815);

                    // str += String.fromCharCode(Math.floor(Math.random() * (1425 - 1479)) + 1479);

                    // str += String.fromCharCode(0x30A0 + Math.floor(Math.random() + 96));
                    i++;
                }
                return str;
            }
            const flair = beeCode();
            // const flairReversed = flair.split("").reverse().join();
            const creepName = `${flair} - Busy Bee - ${flair}`;
            // const creepName = `Busy Bee - ${Game.time}`;
            console.log("miningSpotObj.isTakenBy.length: ", miningSpotObj.isTakenBy.length);
            if(room.memory.creepQueue.length < minersShort/*  && miningSpotObj.isTakenBy.length < 5 */){
                const toSourcePathIndex = getCreepPathToSourceIndex(room, miningSpotObj);
                const toSpawnPathIndex = getCreepPathToSpawnIndex(room, miningSpotObj);

                // miningSpotObj.isTakenBy.push(creepName);

                room.memory.creepQueue.push({creepType: "miner",
                workUnits: sourceData.workPerMiner,
                targetSourceId: sourceData.source.id,
                name: creepName,
                hasMiningSpot: false,
                pathToSourceIndex: toSourcePathIndex,
                pathToSpawnIndex: toSpawnPathIndex});

                // miningSpotObj.isTakenBy++;
                // console.log("This mining spot isTakenBy ", miningSpotObj.isTakenBy, " miners");
            // }
            }
        });
    });

    console.log("CREEP QUEUE LENGTH: ", room.memory.creepQueue.length);
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