module.exports = function(room){
    const maxMiners = room.memory.objectives.creeps.miner;
    let existingMiners = 0;
    
    if(room.memory.creeps && room.memory.creeps.length > 0){
        console.log("room.memory.creeps before reducer at queue.miners: ", JSON.stringify(room.memory.creeps));

        room.memory.creeps.forEach(creepName => {
            if(Game.creeps[creepName] && (Game.creeps[creepName].memory.role === "miner")){
                existingMiners++;
            }
        });
    }

    console.log("Miners short at queue.miners: ", (maxMiners - existingMiners));

    const neededMiners = maxMiners - existingMiners;

    return neededMiners;
}