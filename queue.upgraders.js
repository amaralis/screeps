module.exports = {
    pushToQueue: function(room){
        let upgradersShort = room.getNeededUpgraders();
        let upgradingSpotsArray = room.memory.controllerUpgradeLocations;
        // console.log("upgradersShort at queue.creep.set: ", upgradersShort);
        // console.log("Creep queue length queue.creep.set: ", room.memory.creepQueue.length);

            upgradingSpotsArray.forEach(upgradingSpotObj => {
                const beeCode = function(){
                    let str = "";
                    function createFlair(char){
                        if(char != "\"" || char != "\'"){
                            str += char;
                        }
                    }
                    while(str.length < 10){
                        // str += String.fromCharCode(Math.floor(Math.random() * (0x30A0 - 0x30FF)) + 0x30FF);
                        // str += String.fromCharCode(Math.floor(Math.random() * (0x19E0 - 0x19FF)) + 0x19FF); // Cherokee
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x1000 - 0x109F)) + 0x109F)); // Myanmar
                        createFlair(String.fromCharCode(Math.floor(Math.random() * (0xA980 - 0xA9DF)) + 0xA9DF)); // Javanese / Hanakaraka
                        // str += String.fromCharCode(Math.floor(Math.random() * (0x2C00 - 0x2C5F)) + 0x2C5F); // Glagolitic
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x10A0 - 0x10FF)) + 0x10FF)); // Georgian
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (0x1C90 - 0x1CBF)) + 0x1CBF)); // Georgian extended

                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (697 - 866)) + 866)); // Dust
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (1425 - 1479)) + 1479)); // Dust

                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (2304 - 2307)) + 2307));
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (2561 - 2563)) + 2563));
                        // createFlair(String.fromCharCode(Math.floor(Math.random() * (2810 - 2815)) + 2815));

                        // str += String.fromCharCode(Math.floor(Math.random() * (1425 - 1479)) + 1479);


                    }
                    return str;
                }

                // console.log("Upgrading spot X", upgradingSpotObj.x, "Y", upgradingSpotObj.y,".isTakenBy.length: ", upgradingSpotObj.isTakenBy.length, "--- Creeps taking it:", JSON.stringify(upgradingSpotObj.isTakenBy));
                
                // if((room.memory.creepQueue.length - room.getNeededMiners()) < upgradersShort){
                    if((room.getQueuedUpgraders() < upgradersShort)  && upgradingSpotObj.isTakenBy.length < room.getMaxUpgradersPerSpot()){
                    const flair = beeCode();
                    let flairReversed = flair.split("").reverse().join("");
                    const creepName = `Home Improvement Bee ${flair}`;
                    // const creepName = `Busy Bee - ${Game.time}`;
                        

                    const toControllerPathIndex = this.getCreepPathToControllerIndex(room, upgradingSpotObj);
                    const toSpawnPathIndex = this.getCreepPathToSpawnIndex(room, upgradingSpotObj);

                    room.memory.creepQueue.push({creepType: "upgrader",
                    targetControllerId: room.controller.id,
                    name: `Home Improvement Bee ${flair}`,
                    hasUpgradingSpot: false,
                    upgradingSpot: room.memory.controllerToSpawnPaths[toSpawnPathIndex][0],
                    pathToControllerIndex: toControllerPathIndex,
                    pathToSpawnIndex: toSpawnPathIndex});
                }
            });

        // console.log("CREEP QUEUE LENGTH: ", room.memory.creepQueue.length);
        // console.log("creepQueue: ", JSON.stringify(room.memory.creepQueue));
    },

    getCreepPathToControllerIndex: function(room, upgradingSpot){
        const { spawnToControllerPaths } = room.memory;
        for(let i = 0; i < spawnToControllerPaths.length; i++){
            let path = spawnToControllerPaths[i].path;
            let lastIndex = path.length - 1;
            if(path[lastIndex].x === upgradingSpot.x && path[lastIndex].y === upgradingSpot.y){
                return i;
            }
        }
    },

    getCreepPathToSpawnIndex: function(room, upgradingSpot){
        const { controllerToSpawnPaths } = room.memory;
        for(let i = 0; i < controllerToSpawnPaths.length; i++){
            let path = controllerToSpawnPaths[i];
            if(path[0].x === upgradingSpot.x && path[0].y === upgradingSpot.y){
                return i;
            }
        }
    }

} 