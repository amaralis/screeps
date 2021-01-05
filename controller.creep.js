const handleUpgrading = require("creep.state.upgrader");
const handleMining = require("creep.state.miner");
const handleSpawning = require("creep.state.spawning");
const handleAwaitingOwnership = require("creep.state.awaitingOwnership");

module.exports = function(creep){
    // const { state, name } = creep.memory;
    // console.log("Creep in controller: ", JSON.stringify(creep));
    // console.log("Creep in controller's memory: ", JSON.stringify(creep.memory));
    // console.log("Creep in controller's name: ", JSON.stringify(creep.name));
    switch(creep.memory.state){
        case "awaiting ownership": {
            // console.log(`CONTROLLER - Creep ${creep.name} is spawning and not assigned to any room`);
            handleAwaitingOwnership(creep);
            break;
        }
        case "spawning": {
            // console.log(`CONTROLLER - Creep ${creep.name} is spawning`);
            handleSpawning(creep);
            break;
        }
        case "idle": {
            // console.log(`CONTROLLER - Creep ${creep.name} is idle`);
            break;
        }
        case "miner": {
            // console.log(`CONTROLLER - Creep ${creep.name} is mining`);
            handleMining(creep);

            break;
        }
        case "upgrader": {
            // console.log(`CONTROLLER - Creep ${creep.name} is upgrading`);
            handleUpgrading(creep);
            break;
        }
        default:
            console.log("Creep state not recognized at controller: ", creep.memory.state);
    }
}