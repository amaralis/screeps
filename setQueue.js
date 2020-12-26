const setQueue = function(room){

    console.log("State at setQueue: ", room.memory.state);
    switch(room.memory.state){
        case "improving": {
            // Get available spawns
            const availableSpawns = room.memory.mySpawns.filter(spawn => {
                return !spawn.spawning;
            });
    
            
            if(availableSpawns.length > 0){

                // Queue up miners

                const maxMiners = room.getMaxMiners();
                let existingMiners = 0;
                if(room.memory.creeps.length > 0){
                    // existingMiners = room.creeps.filter(creep => {
                    //     return creep.memory.role === "miner" || creep.memory.type === "basic worker";
                    // }).length;

                    // const reducer = (totalMiners, currentCreep) => {
                    //     if(currentCreep.memory.role === "miner"){
                    //         return totalMiners++;
                    //     }
                    // }
                    existingMiners = room.memory.creeps.reduce((totalMiners, currentCreep) => {
                        if(currentCreep.memory.role === "miner"){
                            return totalMiners++;
                        }
                    });
                    console.log("Existing miners at reducer function: ", existingMiners);
                }
    
                console.log("Existing miners after reducer function: ", existingMiners);
    
                let minersShort = maxMiners - existingMiners;
                
                console.log("Miners short: ", minersShort);

                while(minersShort > 0){
                    room.memory.queue.push("miner");
                    // Testing safety check
                    if(room.memory.queue.length > 20){
                        console.log("Something wrong with adding miners to queue");
                        break;
                    }
                    minersShort--;
                }

                console.log("Queue: ", JSON.stringify(room.memory.queue));
    
                // availableSpawns.forEach(spawn => {
                //     if(minersShort > 0){
                //         spawn.spawnBasicWorker();
                //         minersShort--;
                //     }                    
                // });
            } else {
                console.log("No available spawns in room " + room.name);
            }
            break;
        }

        default:
            console.log("State not recognized: " + room.memory.state);
    }

}

module.exports = setQueue;