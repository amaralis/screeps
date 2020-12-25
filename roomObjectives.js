module.exports = {
    setQueue: function(room){
        if(!room.memory.queue.length){
            const maxMiners = room.getMaxMiners();
            let existingMiners = 0;
            if(room.creeps){
                existingMiners = room.creeps.filter(creep => {
                    creep.memory.role = "miner";
                }).length;
            }
            let minersShort = maxMiners - existingMiners;
            console.log("Miners short: ", minersShort);
            
            // while(minersShort > -1){
                
                
            //     minersShort--
            // }

            // room.memory.queue.push();
        }
    }
}