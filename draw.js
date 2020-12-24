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
    },
    spawnToSourcePaths: function(room){
        room.memory.spawnToSourcePaths.forEach(obj => {
            obj.path.forEach(path => {
                new RoomVisual(path.roomName).circle(path.x, path.y, {fill: "", stroke: "#ff00ff"});
            })
        })    
    },
    sourceToSpawnPaths: function(room){
        room.memory.spawnToSourcePaths.forEach(obj => {
            obj.path.forEach(path => {
                new RoomVisual(path.roomName).circle(path.x, path.y, {fill: "", stroke: "#ff00ff"});
            })
        })    
    }
}
