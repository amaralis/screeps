module.exports = function(creep){
    // Push name to room memory
    creep.memory.ownedBy = creep.room.name;
    Game.rooms[creep.room.name].memory.creeps.push(creep.name);
    creep.memory.state = "spawning";
}