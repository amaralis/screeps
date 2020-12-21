module.exports = {
    saveToRoom: function(roomName) {
        const room = Game.rooms[roomName];
        const sources = room.find(FIND_SOURCES);

        console.log("running energyMiningSpots.init()");
        
        sources.forEach(source => {
            const terrain = new Room.Terrain(roomName);
            console.log("Getting terrain at source ", source.id);

            if(terrain.get(source.pos.x,     source.pos.y - 1) === 0 || terrain.get(source.pos.x,     source.pos.y - 1) === 2){
                room.setMiningLocations({x: source.pos.x, y: (source.pos.y - 1), pos: "Upper", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x + 1, source.pos.y - 1) === 0 || terrain.get(source.pos.x + 1, source.pos.y - 1) === 2){
                room.setMiningLocations({x: (source.pos.x + 1), y: (source.pos.y - 1), pos: "Upper right", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x + 1, source.pos.y)     === 0 || terrain.get(source.pos.x + 1, source.pos.y)     === 2){
                room.setMiningLocations({x: (source.pos.x + 1), y: source.pos.y, pos: "Right", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x + 1, source.pos.y + 1) === 0 || terrain.get(source.pos.x + 1, source.pos.y + 1) === 2){
                room.setMiningLocations({x: (source.pos.x + 1), y: (source.pos.y + 1), pos: "Lower right", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x,     source.pos.y + 1) === 0 || terrain.get(source.pos.x,     source.pos.y + 1) === 2){
                room.setMiningLocations({x: source.pos.x, y: (source.pos.y + 1), pos: "Lower", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x - 1, source.pos.y + 1) === 0 || terrain.get(source.pos.x - 1, source.pos.y + 1) === 2){
                room.setMiningLocations({x: (source.pos.x - 1), y: (source.pos.y + 1), pos: "Lower left", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x - 1, source.pos.y)     === 0 || terrain.get(source.pos.x - 1, source.pos.y)     === 2){
                room.setMiningLocations({x: (source.pos.x - 1), y: source.pos.y, pos: "Left", sourceID: source.id, isTaken: false});
            }
            if(terrain.get(source.pos.x - 1, source.pos.y - 1) === 0 || terrain.get(source.pos.x - 1, source.pos.y - 1) === 2){
                room.setMiningLocations({x: (source.pos.x - 1), y: (source.pos.y - 1), pos: "Upper left", sourceID: source.id, isTaken: false});
            }
        })

    }
}