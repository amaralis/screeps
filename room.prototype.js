const utils = require("utils");

module.exports = function(){
    Room.prototype.setMiningLocations = function() {
        let locationsArray = utils.setAdjacentLocations(this, this.memory.sources);
                
        locationsArray.forEach(location => {
            this.memory.miningLocations.push(location);
        });        
    }
}