module.exports = function(room){
    const maxMiners = room.getMaxMiners();
    let existingMiners = 0;
    
    if(room.memory.creeps.length > 0){
        existingMiners = room.memory.creeps.reduce((totalMiners, currentCreep) => {
            if(currentCreep.memory.role === "miner"){
                return totalMiners++;
            }
        });
    }

    return maxMiners - existingMiners;
}