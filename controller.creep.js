const harvest = require("creep.state.harvesting");
const deliverCargo = require("creep.state.deliveringCargo");

module.exports = function(creep){
    // const { state, name } = creep.memory;
    switch(creep.state){
        case "awaiting ownership": {
            console.log(`Creep ${creep.name} is spawning and not assigned to any room`);
            // Psuh to room memory?
        }
        case "spawning": {
            console.log(`Creep ${creep.name} is spawning`);
        }
        case "idle": {
            console.log(`Creep ${creep.name} is idle`);
        }
        case "harvesting": {
            console.log(`Creep ${creep.name} is harvesting`);
            harvest(creep);
        }
        case "delivering cargo": {
            console.log(`Creep ${creep.name} is delivering cargo`);
            deliverCargo(creep);
        }
    }
}