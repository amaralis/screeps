const level1Room = require("level1Room");

module.exports = {
    init: function(roomName) {
        const room = Game.rooms[roomName];
        
        if(room.energyCapacityAvailable <= 300 && room.controller.level === 1){
            level1Room.init(roomName);
        }
    }
}