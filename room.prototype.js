const utils = require("utils");

module.exports = function(){
    Room.prototype.setMiningLocations = function() {
        let adjacentLocationsArray = utils.getAdjacentLocations(this.memory.sources);
        console.log("Locations array length: ", adjacentLocationsArray.length);
        console.log("Locations array: ", JSON.stringify(adjacentLocationsArray));
        const terrain = new Room.Terrain(this.name);
        

            adjacentLocationsArray.forEach(location => {
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x,     location.y) === 2){
                    console.log("Location: ", JSON.stringify(location), " is above origin");
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                    console.log("Location: ", JSON.stringify(location), " is above and to the right of origin");
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y)     === 2){
                    console.log("Location: ", JSON.stringify(location), " is to the right of origin");
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x,     location.y) === 2){
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y)     === 2){
                    return this.memory.miningLocations.push(location);
                }
                if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                    return this.memory.miningLocations.push(location);
                }
            })

        // this.memory.miningLocations = locationsArray.filter(function(location){
        //     terrain.get(location.x,     location.y - 1) === 0 || terrain.get(location.x,     location.y - 1) === 2;
        //     terrain.get(location.x + 1, location.y - 1) === 0 || terrain.get(location.x + 1, location.y - 1) === 2;
        //     terrain.get(location.x + 1, location.y)     === 0 || terrain.get(location.x + 1, location.y)     === 2;
        //     terrain.get(location.x + 1, location.y + 1) === 0 || terrain.get(location.x + 1, location.y + 1) === 2;
        //     terrain.get(location.x,     location.y + 1) === 0 || terrain.get(location.x,     location.y + 1) === 2;
        //     terrain.get(location.x - 1, location.y + 1) === 0 || terrain.get(location.x - 1, location.y + 1) === 2;
        //     terrain.get(location.x - 1, location.y)     === 0 || terrain.get(location.x - 1, location.y)     === 2;
        //     terrain.get(location.x - 1, location.y - 1) === 0 || terrain.get(location.x - 1, location.y - 1) === 2;
        // })

    }
}