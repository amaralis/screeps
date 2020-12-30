const mine = require("creep.state.miner");

module.exports = function(creep){
    // const { state, name } = creep.memory;
    // console.log("Creep in controller: ", JSON.stringify(creep));
    // console.log("Creep in controller's memory: ", JSON.stringify(creep.memory));
    // console.log("Creep in controller's name: ", JSON.stringify(creep.name));
    switch(creep.memory.state){
        case "awaiting ownership": {
            console.log(`CONTROLLER - Creep ${creep.name} is spawning and not assigned to any room`);
            creep.memory.ownedBy = creep.room.name;

            // Push name to room memory
            Game.rooms[creep.room.name].memory.creeps.push(creep.name);
            creep.memory.state = "spawning";
            break;
        }
        case "spawning": {
            if(!creep.spawning){
                console.log(`Spawned creep's state before switch: ${creep.memory.state}`);
                creep.memory.state = creep.memory.role; // Will start doing its thing next tick, when controller runs again
                console.log(`Spawned creep's state: ${creep.memory.state}`);
                console.log(`Spawned creep's role: ${creep.memory.role}`);
                
                for(let i = 0; i < creep.room.memory.creepProductionQueue.length; i++){
                    if(creep.room.memory.creepProductionQueue[i].name === creep.name){
                        console.log(`CONTROLLER - Deleting queued creep: ${JSON.stringify(creep.room.memory.creepProductionQueue[i])}`);
                        console.log(`CONTROLLER - Spawned creep's name: ${creep.name}`);
                        creep.room.memory.creepProductionQueue.splice(i,1);
                    }
                }
            }
            console.log(`CONTROLLER - Creep ${creep.name} is spawning`);
            break;
        }
        case "idle": {
            console.log(`CONTROLLER - Creep ${creep.name} is idle`);
            break;
        }
        case "miner": {
            console.log(`CONTROLLER - Creep ${creep.name} is mining`);
            mine(creep);
            break;
        }
        // case "": {

        // }
        default:
            console.log("Creep state not recognized at controller: ", creep.memory.state);
    }
}