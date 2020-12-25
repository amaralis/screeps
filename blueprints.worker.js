const spawnBasicWorker = function(spawn){
    spawn.spawnCreep([WORK, CARRY, MOVE, MOVE], undefined, {memory:{role: basicWorker}}); // 250 energy
}

module.exports = spawnBasicWorker;