const utils = require("utils");
const { spawnToSourcePaths } = require("./draw");

/**
 * 
 * @param {Creep} creep 
 */

module.exports = function(creep){
    console.log("creep.state.miner called");
    const { miningSpot, targetSourceId, spawnedBy } = creep.memory;

    const spawnToSourcePath = creep.getSpawnToSourcePath().map(pos => new RoomPosition(pos.x, pos.y, pos.roomName));
    const sourceToSpawnPath = creep.getSourceToSpawnPath().map(pos => new RoomPosition(pos.x, pos.y, pos.roomName));
    const transferPos = spawnToSourcePath[0];
    console.log(spawnToSourcePath[0] instanceof RoomPosition)
    // spawnToSourcePath.shift();
    // sourceToSpawnPath.shift();

    console.log("Creep pos: ", creep.pos, "\nTransfer pos: ", JSON.stringify(transferPos), "\nCreep store, ", creep.store[RESOURCE_ENERGY], "\nCreep capacity: ", creep.store.getCapacity());

    console.log("Mining spot: ", JSON.stringify(miningSpot));
    console.log("Path to source: ", JSON.stringify(spawnToSourcePath));
    console.log("Path to spawn: ", JSON.stringify(sourceToSpawnPath));

    if(creep.pos.x == miningSpot.x && creep.pos.y == miningSpot.y){
        console.log("Creep is at mining spot...");
        if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
            console.log("Creep is harvesting");
            creep.harvest(Game.getObjectById(targetSourceId));
        } else if(creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
            console.log("Creep is moving to spawn");
            creep.moveByPath(sourceToSpawnPath);
            console.log(JSON.stringify(sourceToSpawnPath));
        }
    } else if(creep.pos.x == transferPos.x && creep.pos.y == transferPos.y) {
        console.log("Creep is at transfer position");
        if(creep.store[RESOURCE_ENERGY] > 0){
            console.log("Creep is transferring");
            creep.transfer(Game.getObjectById(spawnedBy), RESOURCE_ENERGY);
        } else if(creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() && creep.store[RESOURCE_ENERGY] == 0){
            console.log("Creep is moving to source");
            console.log(creep.moveByPath(spawnToSourcePath));
            console.log(JSON.stringify(spawnToSourcePath));
            
            creep.moveByPath(spawnToSourcePath);
            // creep.moveByPath(JSON.stringify(spawnToSourcePath));
        }
    } else if((creep.pos.x != miningSpot.x && creep.pos.y != miningSpot.y)  && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
        console.log("Creep is moving to source");
        console.log(JSON.stringify(spawnToSourcePath));
        console.log(creep.moveByPath(spawnToSourcePath));
        
        creep.moveByPath(spawnToSourcePath);
        // creep.moveByPath(JSON.stringify(spawnToSourcePath));
    } else if((creep.pos.x != transferPos.x && creep.pos.y != transferPos.y) && creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()){
        console.log("Creep is moving to source");
        console.log(creep.moveByPath(spawnToSourcePath));
        console.log(JSON.stringify(spawnToSourcePath));

        creep.moveByPath(spawnToSourcePath);
        // creep.moveByPath(JSON.stringify(spawnToSourcePath));
    } else if((creep.pos.x != miningSpot.x && creep.pos.y != miningSpot.y) && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
        console.log("Creep is moving to spawn");
        console.log(creep.moveByPath(sourceToSpawnPath));
        console.log(JSON.stringify(sourceToSpawnPath));

        creep.moveByPath(sourceToSpawnPath);
        // creep.moveByPath(JSON.stringify(sourceToSpawnPath));
    } else if((creep.pos.x != transferPos.x && creep.pos.y != transferPos.y) && creep.store[RESOURCE_ENERGY] == creep.store.getCapacity()){
        console.log("Creep is moving to spawn");
        console.log(creep.moveByPath(sourceToSpawnPath));
        console.log(JSON.stringify(sourceToSpawnPath));

        creep.moveByPath(sourceToSpawnPath);
        // creep.moveByPath(JSON.stringify(sourceToSpawnPath));
    } else {
        console.log("NO CREEP ORDERS");
    }
}