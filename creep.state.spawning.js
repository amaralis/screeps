module.exports = function(creep){
    if(!creep.spawning){
        // console.log(`Spawned creep's state before switch: ${creep.memory.state}`);

        creep.memory.state = creep.memory.role; // Roles have same name as states

        // console.log(`Spawned creep's state: ${creep.memory.state}`);
        // console.log(`Spawned creep's role: ${creep.memory.role}`);
        
        for(let i = 0; i < creep.room.memory.creepProductionQueue.length; i++){
            if(creep.room.memory.creepProductionQueue[i].name === creep.name){
                // console.log(`CONTROLLER - Deleting queued creep: ${JSON.stringify(creep.room.memory.creepProductionQueue[i])}`);
                // console.log(`CONTROLLER - Spawned creep's name: ${creep.name}`);
                creep.room.memory.creepProductionQueue.splice(i,1);
                break;
            }
        }
        creep.assignMiningSpot();
    }
}