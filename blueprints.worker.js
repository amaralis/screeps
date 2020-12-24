module.exports = {
    spawnBasicWorker: function(spawn){
        spawn.spawnCreep([WORK, CARRY, MOVE], undefined, {memory:{role: basicWorker}});
    },
    spawnWorker: function(spawn){
        spawn.spawnCreep([WORK, MOVE, CARRY, CARRY, MOVE], undefined, {memory:{role: worker}});
    }
}