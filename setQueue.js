const getTargetMiners = require("queue.miners");
const utils = require("utils");

const setQueue = function(room){
    switch(room.memory.state){
        case "improving": {
            const availableSpawns = utils.getAvailableSpawns(room);
            
            if(availableSpawns.length > 0){
                let minersShort = getTargetMiners(room);

                while(minersShort > 0){
                    room.memory.queue.push("miner");
                    minersShort--;
                }
                
                console.log("Queue: ", JSON.stringify(room.memory.queue));                            
            } else {
                console.log("No available spawns in room " + room.name);
            }
            break;
        }

        default:
            console.log("State not recognized: ", room.memory.state);
    }

}

module.exports = setQueue;