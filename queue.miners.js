module.exports = function(room){
    const maxMiners = room.getMaxMiners();
    let existingMiners = 0;
    
    if(room.memory.creeps.length > 0){
        existingMiners = room.memory.creeps.reduce((totalMiners, currentCreep) => {
            if(!currentCreep.spawning && currentCreep.memory.role === "miner"){ // This is required, but it may mean we'll get an extra creep; needs testing
                return totalMiners++;
            }
        });
    }

    return maxMiners - existingMiners;
}