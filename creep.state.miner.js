module.exports = function(creep){
    console.log("creep.state.miner called");
    
    // creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() ? harvestEnergy(creep) : deliverCargo(creep);

    const spawnToSourcePath = creep.getSpawnToSourcePath();
    const sourceToSpawnPath = creep.getSourceToSpawnPath();

    (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) ? creep.moveByPath(spawnToSourcePath) : creep.moveByPath(sourceToSpawnPath);

    creep.moveByPath(sourceToSpawnPath);

    // const harvestEnergy = function(creep){
    //     creep.memory.
    // }
}