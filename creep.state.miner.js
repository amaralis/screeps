const utils = require("utils");

/**
 * 
 * @param {Creep} creep 
 */

module.exports = function(creep){
    console.log("creep.state.miner called");
    const { room } = creep;

    // Do things
    
    // creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() ? harvestEnergy(creep) : deliverCargo(creep);

    const spawnToSourcePath = creep.getSpawnToSourcePath();
    const sourceToSpawnPath = creep.getSourceToSpawnPath();

    (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) ? creep.moveByPath(spawnToSourcePath) : creep.moveByPath(sourceToSpawnPath);

    creep.moveByPath(sourceToSpawnPath);

    // const harvestEnergy = function(creep){
    //     creep.memory.
    // }
}