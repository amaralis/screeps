module.exports = function(){
    console.log("Running room.prototype");
    Room.prototype.setMiningLocations = function(locationsArray) {
        locationsArray.forEach(location => {
            this.memory.miningLocations.push(location);
        });

        // Game.rooms[this.name].memory.miningLocations.push(location);
    }
}