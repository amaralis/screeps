const queueMiner = require("queue.miners");
const queueUpgrader = require("queue.upgraders");

const setCreepQueue = function(room){
    switch(room.memory.state){
        
        case "rcl1-nominal": {
            if(room.getExistingMiners() < room.getMaxMiners()){
                queueMiner.pushToQueue(room);
            }
            if(room.getExistingUpgraders() < room.getMaxUpgraders()){
                queueUpgrader.pushToQueue(room);
            }
            break;
        }

        default:
            console.log("State not recognized: ", room.memory.state);
    }
}

module.exports = setCreepQueue;

// const queueMiner = function(room){
//     let minersShort = getNeededMiners(room);
//     const { minersPerSource } = room.memory;
//     console.log("minersShort at queue.creep.set: ", minersShort);
//     console.log("Creep queue length queue.creep.set: ", room.memory.creepQueue.length);
//     minersPerSource.forEach(sourceData => {
//         sourceData.miningSpotsArray.forEach(miningSpotObj => {
//             const beeCode = function(){
//                 let str = "";
//                 function createFlair(char){
//                     if(char != "\"" || char != "\'"){
//                         str += char;
//                     }
//                 }
//                 while(str.length < 10){
//                     // str += String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x30FF)) + 0x30FF);
//                     // str += String.fromCharCode(Math.floor(Math.random() * (0x19E0 - 0x19FF)) + 0x19FF); // Cherokee
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x1000 - 0x109F)) + 0x109F)); // Myanmar
//                     createFlair(String.fromCharCode(Math.floor(Math.random() * (0xA980 - 0xA9DF)) + 0xA9DF)); // Javanese / Hanakaraka
//                     // str += String.fromCharCode(Math.floor(Math.random() * (0x2C00 - 0x2C5F)) + 0x2C5F); // Glagolitic
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x10A0 - 0x10FF)) + 0x10FF)); // Georgian
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x1C90 - 0x1CBF)) + 0x1CBF)); // Georgian extended

//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (697 - 866)) + 866)); // Dust
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (1425 - 1479)) + 1479)); // Dust

//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (2304 - 2307)) + 2307));
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (2561 - 2563)) + 2563));
//                     // createFlair(String.fromCharCode(Math.floor(Math.random() * (2810 - 2815)) + 2815));

//                     // str += String.fromCharCode(Math.floor(Math.random() * (1425 - 1479)) + 1479);


//                 }
//                 return str;
//             }

//             const flair = beeCode();
//             let flairReversed = flair.split("").reverse().join("");
//             const creepName = `Busy Bee ${flair}`;
//             // const creepName = `Busy Bee - ${Game.time}`;
//             // console.log("Mining spot X", miningSpotObj.x, "Y", miningSpotObj.y,".isTakenBy.length: ", miningSpotObj.isTakenBy.length, "--- Creeps taking it:", JSON.stringify(miningSpotObj.isTakenBy));

//             if(room.memory.creepQueue.length < minersShort){
//                 const pathToSourceIndex = getCreepPathToSourceIndex(room, miningSpotObj);
//                 const pathToSpawnIndex = getCreepPathToSpawnIndex(room, miningSpotObj);

//                 // miningSpotObj.isTakenBy.push(creepName);

//                 room.memory.creepQueue.push({creepType: "miner",
//                 workUnits: sourceData.workPerMiner,
//                 targetSourceId: sourceData.source.id,
//                 name: creepName,
//                 hasMiningSpot: false,
//                 miningSpot: room.memory.sourceToSpawnPaths[pathToSpawnIndex][0],
//                 toSourcePathIndex: pathToSourceIndex,
//                 toSpawnPathIndex: pathToSpawnIndex});
//             }
//         });
//     });

//     // console.log("CREEP QUEUE LENGTH: ", room.memory.creepQueue.length);
//     // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));
// }

// const getCreepPathToSourceIndex = function(room, miningSpot){
//     const { spawnToSourcePaths } = room.memory;
//     for(let i = 0; i < spawnToSourcePaths.length; i++){
//         let path = spawnToSourcePaths[i].path;
//         let lastIndex = path.length-1;
//         if(path[lastIndex].x === miningSpot.x && path[lastIndex].y === miningSpot.y){
//             return i;
//         }
//     }
// }
// const getCreepPathToSpawnIndex = function(room, miningSpot){
//     const { sourceToSpawnPaths } = room.memory;
//     for(let i = 0; i < sourceToSpawnPaths.length; i++){
//         let path = sourceToSpawnPaths[i];
//         if(path[0].x === miningSpot.x && path[0].y === miningSpot.y){
//             return i;
//         }
//     }
// }