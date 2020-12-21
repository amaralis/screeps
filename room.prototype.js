module.exports = function(){
    console.log("Running room.prototype");
    Room.prototype.setMiningLocations = function(location) {
        this.memory.miningLocations.push(location);
    }
}