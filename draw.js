const utils = require("utils")

module.exports = {
    availableMiningSpots: function(room){
        let terrain = new Room.Terrain(room.name);
        room.memory.sources.forEach(source => {
            let spotColor = [
                "white",
                "red",
                "blue",
                "yellow",
                "purple",
                "cyan",
                "magenta",
                "green",
                "orange"
            ]
            let i = 0;
            room.getMiningSpotsPerSource(source).forEach(location => {
                if(terrain.get(location.x, location.y) === 0){
                    new RoomVisual(room.name).rect(location.x - 0.5, location.y - 0.5, 1, 1, {stroke: spotColor[i], fill:"", opacity: .8});
                }
                if(terrain.get(location.x, location.y) === 2){
                    new RoomVisual(room.name).rect(location.x - 0.5, location.y - 0.5, 1, 1, {stroke: spotColor[i], fill: "", opacity: .8});
                }
                i++;
            });
        });
    },
    spawnToSourcePaths: function(room){
        let i = 0;
        room.memory.spawnToSourcePaths.forEach(obj => {
            let line = [
                0.1,
                0.2,
                0.3,
                0.4,
                0.5,
                0.6,
                0.7,
                0.8
            ]
            let pathColor = [
                "white",
                "red",
                "blue",
                "yellow",
                "purple",
                "cyan",
                "magenta",
                "green",
                "orange"
            ];
            obj.path.forEach(pos => {
                new RoomVisual(pos.roomName).circle(pos.x, pos.y, {fill: "", stroke: pathColor[i]/* , strokeWidth: line[i] */});
            })
            i++;
        });
    },
    sourceToSpawnPaths: function(room){
        let i = 0;
        room.memory.sourceToSpawnPaths.forEach(path => {
                let line = [
                0.1,
                0.2,
                0.3,
                0.4,
                0.5,
                0.6,
                0.7,
                0.8
            ]
            let pathColor = [
                "white",
                "red",
                "blue",
                "yellow",
                "purple",
                "cyan",
                "magenta",
                "green",
                "orange"
            ];
            path.forEach(pos => {
                new RoomVisual(pos.roomName).circle(pos.x, pos.y, {fill: "", stroke: pathColor[i]/* , strokeWidth: line[i] */});
            });
            i++;
        });
    },

    upgradingLocations: function(room){
        utils.getUpgradingLocations(room.controller).forEach(location => {
            new RoomVisual(room.name).rect(location.x - .5, location.y - .5, 1, 1, {fill: "", stroke: "#33ffff", opacity: 0.5});
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
    }
}
