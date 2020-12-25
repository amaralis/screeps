module.exports = {
    setQueue: function(room){
        console.log(SPAWN_ENERGY_CAPACITY);
        console.log(room.energyCapacityAvailable);
        if(room.memory.queue.length === 0 && (room.energyCapacityAvailable <= SPAWN_ENERGY_CAPACITY)){
            const availableSpawns = room.memory.mySpawns.filter(spawn => {
                return !spawn.spawning;
            });

            if(availableSpawns && availableSpawns.length){
                const maxMiners = room.getMaxMiners();
                let existingMiners = 0;
                if(room.creeps && room.creeps.length){
                    existingMiners = room.creeps.filter(creep => {
                        return creep.memory.role === "miner" || creep.memory.type === "basic worker";
                    }).length;
                }

                console.log("existingMiners: ", existingMiners);

                let minersShort = maxMiners - existingMiners;
                
                console.log("Miners short: ", minersShort);

                availableSpawns.forEach(spawn => {
                    if(minersShort > 0){
                        spawn.spawnBasicWorker();
                        minersShort--;
                    }                    
                });
            }
        }
    }
}