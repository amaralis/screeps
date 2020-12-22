module.exports = function(){
    console.log("Running room.prototype");
    Room.prototype.setMiningLocations = function(location, room) {
        // console.log(JSON.stringify(this));
        console.log(JSON.stringify(Game.rooms["W8N3"].memory));
        console.log("TEST");
        console.log(JSON.stringify(this.constructor.name));
        console.log("this: ", this);

        room.memory.miningLocations.push(location);
        // Game.rooms[this.name].memory.miningLocations.push(location);
    }
}