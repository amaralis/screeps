const planner = require("planner");
require("room.prototype")();

delete Game.rooms["W8N3"].memory.miningLocations; // JUST FOR TESTING
delete Game.rooms["W8N3"].memory.mySpawns; // JUST FOR TESTING

module.exports.loop = function () {
    for (const creep in Memory.creeps){
        !Game.creeps[creep] && delete Memory.creeps[creep];
    }
    for (const roomName in Game.rooms) {        
        planner.init(roomName);
    }
}