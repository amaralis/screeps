const utils = require("utils");

/**
 * 
 * @param {Creep} creep 
 */

module.exports = function(creep){
    // console.log("creep.state.miner called");
    const { upgradingSpot, targetControllerId, spawnedBy } = creep.memory;

    const spawnToControllerPath = creep.getSpawnToControllerPath().map(pos => new RoomPosition(pos.x, pos.y, pos.roomName));
    const controllerToSpawnPath = creep.getControllerToSpawnPath().map(pos => new RoomPosition(pos.x, pos.y, pos.roomName));
    const withdrawPos = spawnToControllerPath[0];

    // console.log("Creep pos: ", creep.pos, "\nTransfer pos: ", JSON.stringify(withdrawPos), "\nCreep store, ", creep.store[RESOURCE_ENERGY], "\nCreep capacity: ", creep.store.getCapacity());

    // console.log("Creep", creep.name,"has mining spot: ", JSON.stringify(upgradingSpot), "in memory");
    // console.log("Mining position at spawnToSourcePath: ", JSON.stringify(spawnToSourcePath[spawnToSourcePath.length - 1]), "for creep", creep.name);
    // console.log("Transfer position at sourceToSpawnPath: ", JSON.stringify(sourceToSpawnPath[sourceToSpawnPath.length - 1]), "for creep", creep.name);

    if(creep.pos.x == upgradingSpot.x && creep.pos.y == upgradingSpot.y){
        // console.log("Creep is at upgrading spot...");
        if(creep.store[RESOURCE_ENERGY] > 0){
            // console.log("Creep is upgrading");
            creep.upgradeController(Game.getObjectById(targetControllerId));
        } else {
            // console.log("Creep is moving to spawn");
            // console.log(JSON.stringify(controllerToSpawnPath));
            
            creep.moveByPath(controllerToSpawnPath);
        }
    } else if(creep.pos.x == withdrawPos.x && creep.pos.y == withdrawPos.y) {
        // console.log("Creep is at withdraw position");
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
            // console.log("Creep is withdrawing");

            creep.withdraw(Game.getObjectById(spawnedBy), RESOURCE_ENERGY);
        } else {
            // console.log("Creep is moving to source");
            // console.log(creep.moveByPath(spawnToSourcePath));
            // console.log(JSON.stringify(spawnToSourcePath));
            
            creep.moveByPath(spawnToControllerPath);
        }
    } else if((creep.pos.x != upgradingSpot.x && creep.pos.y != upgradingSpot.y)  && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
        // console.log("Creep is moving to source");
        // console.log(JSON.stringify(spawnToSourcePath));
        // console.log(creep.moveByPath(spawnToSourcePath));
        
        creep.moveByPath(controllerToSpawnPath);
    } else if((creep.pos.x != withdrawPos.x && creep.pos.y != withdrawPos.y) && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
        // console.log("Creep is moving to source");
        // console.log(creep.moveByPath(spawnToSourcePath));
        // console.log(JSON.stringify(spawnToSourcePath));

        creep.moveByPath(controllerToSpawnPath);
    } else if((creep.pos.x != upgradingSpot.x && creep.pos.y != upgradingSpot.y) && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
        // console.log("Creep is moving to spawn");
        // console.log(creep.moveByPath(sourceToSpawnPath));
        // console.log(JSON.stringify(sourceToSpawnPath));

        creep.moveByPath(spawnToControllerPath);
    } else if((creep.pos.x != withdrawPos.x && creep.pos.y != withdrawPos.y) && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
        // console.log("Creep is moving to spawn");
        // console.log(creep.moveByPath(sourceToSpawnPath));
        // console.log(JSON.stringify(sourceToSpawnPath));

        creep.moveByPath(spawnToControllerPath);
    } else {
        console.log("NO CREEP ORDERS FOR ", creep.name);
    }
}