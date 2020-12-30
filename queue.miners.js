module.exports = function(room){
    const maxMiners = room.memory.objectives.creeps.miner;
    let existingMiners = 0;
    
    if(room.memory.creeps && room.memory.creeps.length > 0){
        room.memory.creeps.forEach(creepName => {
            if(Game.creeps[creepName] && (Game.creeps[creepName].memory.role === "miner")){
                existingMiners++;
            }
        });
    }

    console.log(`Existing miners: ${existingMiners}\nMax miners: ${maxMiners}\nNeeded miners: ${(maxMiners - existingMiners)} - at queue.miners`)

    let neededMiners = maxMiners - existingMiners;
    
    return neededMiners;
}