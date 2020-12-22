module.exports = {
    availableMiningSpots: function(room){
        room.memory.miningLocations.forEach(location => {
            terrain = new Room.Terrain(room.name);
            if(terrain.get(location.x, location.y) === 0){
                new RoomVisual(room.name).circle(location.x, location.y, {fill: "#ff0000"});
            }
            if(terrain.get(location.x, location.y) === 2){
                new RoomVisual(room.name).circle(location.x, location.y, {fill: "#00ff00"});
            }            
        })

    }
}
