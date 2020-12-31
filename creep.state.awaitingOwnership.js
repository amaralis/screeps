module.exports = function(creep){
    creep.memory.ownedBy = creep.room.name;
    
    // Push name to room memory
    Game.rooms[creep.room.name].memory.creeps.push(creep.name);
    creep.memory.state = "spawning";
}