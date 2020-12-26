module.exports = {
    getAdjacentLocations: function(centerLocationsArr) {
        let locations = [];

        centerLocationsArr.forEach(location => {
            locations.push({x:  location.pos.x,      y: (location.pos.y - 1), posRelativeToOrigin: "Upper",       adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x + 1), y: (location.pos.y - 1), posRelativeToOrigin: "Upper right", adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x + 1), y:  location.pos.y,      posRelativeToOrigin: "Right",       adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x + 1), y: (location.pos.y + 1), posRelativeToOrigin: "Lower right", adjacentTo: location, isTaken: false});
            locations.push({x:  location.pos.x,      y: (location.pos.y + 1), posRelativeToOrigin: "Lower",       adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x - 1), y: (location.pos.y + 1), posRelativeToOrigin: "Lower left",  adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x - 1), y:  location.pos.y,      posRelativeToOrigin: "Left",        adjacentTo: location, isTaken: false});
            locations.push({x: (location.pos.x - 1), y: (location.pos.y - 1), posRelativeToOrigin: "Upper left",  adjacentTo: location, isTaken: false});
        });

        return locations;
    },

    findPath: function(from, to, opts = undefined){
        return PathFinder.search(from, to, opts);
    },

    getAvailableSpawns: function(room){
        const availableSpawns = room.memory.mySpawns.filter(spawn => {
            return !spawn.spawning;
        });

        return availableSpawns;
    }
}