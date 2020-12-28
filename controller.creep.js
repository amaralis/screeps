const harvest = require("creep.state.harvesting");
const deliverCargo = require("creep.state.deliveringCargo");

module.exports = function(creep){
    // const { state, name } = creep.memory;
    console.log("Creep in controller: ", JSON.stringify(creep));
    console.log("Creep in controller's memory: ", JSON.stringify(creep.memory));
    console.log("Creep in controller's name: ", JSON.stringify(creep.name));
    switch(creep.memory.state){
        case "awaiting ownership": {
            console.log(`Creep ${creep.name} is spawning and not assigned to any room`);
            creep.memory.ownedBy = creep.room.name;
            // Push name to room memory
            Game.rooms[creep.room.name].memory.creeps.push(creep.name);
            creep.memory.state = "spawning";
            break;
        }
        case "spawning": {
            console.log(`Creep ${creep.name} is spawning`);
            break;
        }
        case "idle": {
            console.log(`Creep ${creep.name} is idle`);
            break;
        }
        case "harvesting": {
            console.log(`Creep ${creep.name} is harvesting`);
            harvest(creep);
            break;
        }
        case "delivering cargo": {
            console.log(`Creep ${creep.name} is delivering cargo`);
            deliverCargo(creep);
            break;
        }
    }
}