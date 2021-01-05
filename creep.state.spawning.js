module.exports = function(creep){
    if(!creep.spawning){
        // console.log(`Spawned creep's state before switch: ${creep.memory.state}`);
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

        switch(creep.memory.role){
            case "miner": {
                creep.room.assignMiningSpot(creep);
                let path = creep.getSpawnToSourcePath();
                let startingPos = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                
                if(creep.pos.x === startingPos.x && creep.pos.y === startingPos.y){
                    creep.memory.state = creep.memory.role; // Roles have same name as states
                    // console.log("Creep is at starting position");
                    // creep.memory.isAtStartingPos = true;
                } else {
                    // console.log("Creep isn't at starting position");
                    // console.log("Moving creep to ", JSON.stringify(startingPos));
                    creep.moveTo(startingPos);
                }

                break;
            }

            case "upgrader": {
                creep.room.assignUpgradingSpot(creep);
                let path = creep.getSpawnToControllerPath();
                let startingPos = new RoomPosition(path[0].x, path[0].y, creep.room.name);
                
                if(creep.pos.x === startingPos.x && creep.pos.y === startingPos.y){
                    creep.memory.state = creep.memory.role; // Roles have same name as states
                    console.log("Creep is at starting position");
                    // creep.memory.isAtStartingPos = true;
                } else {
                    console.log("Creep isn't at starting position");
                    console.log("Moving creep to ", JSON.stringify(startingPos));
                    creep.moveTo(startingPos);
                }
                
                break;
            }
        }

    }
}