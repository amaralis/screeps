module.exports = function(room){
    const maxMiners = room.memory.objectives.creeps.miner;
    let existingMiners = 0;
    
    if(room.memory.creeps && room.memory.creeps.length > 0){
        // let tempArray = Object.keys(Game.creeps);
        console.log("room.memory.creeps before reducer at queue.miners: ", JSON.stringify(room.memory.creeps));

        room.memory.creeps.forEach(creepName => {
            if(Game.creeps[creepName].memory.role === "miner"){
                existingMiners++;    
            }
        });
        
        // existingMiners = room.memory.creeps.reduce((totalMiners, currentCreep) => {
        //     console.log("REDUCING - at queue.miners");
        //     if(!Game.creeps[currentCreep.name]){
        //         delete Memory.creeps[creep.name];
        //         console.log(`Deleting memory for creep ${creep.name}`);
        //     }
        //     if(/* !currentCreep.spawning &&  */currentCreep.memory.role === "miner"){ // This is required, but it may mean we'll get an extra creep; needs testing
        //         return totalMiners++;
        //     }
        // });
        // existingMiners = room.memory.creeps.reduce((totalMiners, currentCreep) => {
        //     if(/* !currentCreep.spawning &&  */currentCreep.memory.role === "miner"){ // This is required, but it may mean we'll get an extra creep; needs testing
        //         return totalMiners++;
        //     }
        // });
    }

    console.log("Miners short at queue.miners: ", (maxMiners - existingMiners));

    return maxMiners - existingMiners;
}