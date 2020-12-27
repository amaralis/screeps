module.exports = {
    availableMiningSpots: function(room){
        room.memory.miningLocations.forEach(location => {
            terrain = new Room.Terrain(room.name);
            if(terrain.get(location.x, location.y) === 0){
                new RoomVisual(room.name).rect(location.x - 0.5, location.y - 0.5, 1, 1, {stroke: "#5555ff", fill:"", opacity: 1});
            }
            if(terrain.get(location.x, location.y) === 2){
                new RoomVisual(room.name).rect(location.x - 0.5, location.y - 0.5, 1, 1, {stroke: "#55ff55", fill: "", opacity: 1});
            }            
        })
    },
    spawnToSourcePaths: function(room){
        room.memory.spawnToSourcePaths.forEach(obj => {
            obj.path.forEach(path => {
                new RoomVisual(path.roomName).circle(path.x, path.y, {fill: "", stroke: "#ff0088"});
            })
        })    
    },
    sourceToSpawnPaths: function(room){
        room.memory.spawnToSourcePaths.forEach(obj => {
            obj.path.forEach(path => {
                new RoomVisual(path.roomName).circle(path.x, path.y, {fill: "", stroke: "#ff0088"});
            })
        })    
    },
    spawnAdjacentLocations: function(room){
        for (const spawnKey in Game.spawns){
            const spawn = Game.spawns[spawnKey];
            const locationsArr = Game.spawns[spawnKey].getOpenAdjacentLocations();
            locationsArr.forEach(location => {
                new RoomVisual(room.name).rect(location.x - .5, location.y - .5, 1, 1, {fill: "", stroke: "#55ff55", opacity: 0.5});
            });
        }
        // room.memory.roomSpawns.forEach(spawn => {
        //     Game.spawns[spawn.name].getOpenAdjacentLocations.forEach(location => {
        //         new RoomVisual(room.name).rect(location.x - .5, location.y - .5, 1, 1, {fill: "", stroke: "#55ff55", opacity: 0.5});
        //     });
        // });
    }
}
