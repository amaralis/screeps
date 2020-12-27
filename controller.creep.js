const harvest = require("role.harvesting");
const deliverCargo = require("role.deliveringCargo");

module.exports = function(creep){
    const { state, name } = creep.memory;
    switch(state){
        case "idle": {
            console.log(`Creep ${name} is idle`);
        }
        case "harvesting": {
            console.log(`Creep ${name} is harvesting`);
            
        }
        case "delivering cargo": {
            console.log(`Creep ${name} is delivering cargo`);
        }
    }
}