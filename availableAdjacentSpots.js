module.exports = {
    setAdjacentLocations: function(room, memoryLocationsArray, setterFunc) {
        console.log("running energyMiningSpots.init()", JSON.stringify(room));
        
        memoryLocationsArray.forEach(location => {
            const terrain = new Room.Terrain(room.name);

            if(terrain.get(location.pos.x,     location.pos.y - 1) === 0 || terrain.get(location.pos.x,     location.pos.y - 1) === 2){
                setterFunc({x: location.pos.x, y: (location.pos.y - 1), pos: "Upper", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x + 1, location.pos.y - 1) === 0 || terrain.get(location.pos.x + 1, location.pos.y - 1) === 2){
                setterFunc({x: (location.pos.x + 1), y: (location.pos.y - 1), pos: "Upper right", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x + 1, location.pos.y)     === 0 || terrain.get(location.pos.x + 1, location.pos.y)     === 2){
                setterFunc({x: (location.pos.x + 1), y: location.pos.y, pos: "Right", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x + 1, location.pos.y + 1) === 0 || terrain.get(location.pos.x + 1, location.pos.y + 1) === 2){
                setterFunc({x: (location.pos.x + 1), y: (location.pos.y + 1), pos: "Lower right", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x,     location.pos.y + 1) === 0 || terrain.get(location.pos.x,     location.pos.y + 1) === 2){
                setterFunc({x: location.pos.x, y: (location.pos.y + 1), pos: "Lower", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x - 1, location.pos.y + 1) === 0 || terrain.get(location.pos.x - 1, location.pos.y + 1) === 2){
                setterFunc({x: (location.pos.x - 1), y: (location.pos.y + 1), pos: "Lower left", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x - 1, location.pos.y)     === 0 || terrain.get(location.pos.x - 1, location.pos.y)     === 2){
                setterFunc({x: (location.pos.x - 1), y: location.pos.y, pos: "Left", locationID: location.id, isTaken: false}, room);
            }
            if(terrain.get(location.pos.x - 1, location.pos.y - 1) === 0 || terrain.get(location.pos.x - 1, location.pos.y - 1) === 2){
                setterFunc({x: (location.pos.x - 1), y: (location.pos.y - 1), pos: "Upper left", locationID: location.id, isTaken: false}, room);
            }
        })

    }
}