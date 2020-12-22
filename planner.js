const level1Room = require("level1Room");

module.exports = {
    init: function(room) {
        if(room.energyCapacityAvailable <= 300 && room.controller.level === 1){
            level1Room.init(room);
        }
    }
}