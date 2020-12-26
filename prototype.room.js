const getAdjacentLocations = require("utils").getAdjacentLocations;
const utils = require("utils");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

module.exports = function(){

    Room.prototype.setMiningLocations = function() {
        let adjacentLocationsArray = getAdjacentLocations(this.memory.sources);
        const terrain = new Room.Terrain(this.name);

        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                return this.memory.miningLocations.push(location);
            }
        })
    },

    Room.prototype.setSpawnToSourcePaths = function(){
        this.memory.roomSpawns.forEach(spawn => {
            this.memory.miningLocations.forEach(location => {
                this.memory.spawnToSourcePaths.push({spawn: spawn, location: location, path: utils.findPath(spawn.pos, new RoomPosition(location.x, location.y, this.name)).path});
            });
        });
    },

    Room.prototype.setSourceToSpawnPaths = function(){
        this.memory.spawnToSourcePaths.forEach(obj => {
                let tempPathArray = [...obj.path];
                tempPathArray = tempPathArray.reverse();
                this.memory.sourceToSpawnPaths.push(tempPathArray);
        })
    },

    Room.prototype.getMiningSpotsPerSource = function(source){
        let spotsPerSource = [];
        this.memory.miningLocations.forEach(miningSpot => {
            if(miningSpot.adjacentTo.id == source.id){
                spotsPerSource.push({miningSpot, source});
            }
        });

        return spotsPerSource;
    },
    
    Room.prototype.setState = function(state){
        this.memory.state = state;
    },
    
    Room.prototype.setCreepQueue = function(){
        setCreepQueue(this);
    },

    Room.prototype.executeCreepQueue = function(room){
        executeCreepQueue(this);
    },
    
    Room.prototype.getMaxMiners = function(){
        let maxMiners = 0;
        this.memory.minersPerSource.forEach(elt => {
            maxMiners += elt.miningSpotsArray.length;
        });
        return maxMiners * 5; // * 5 is just for testing purposes, to see how pathfinding handles collisions
    },
    Room.prototype.getMaxRepairers = function(){
        return 5;
    },
    Room.prototype.getMaxHaulers = function(){
        return 5;
    },
    Room.prototype.getMaxBuilders = function(){
        return 5;
    },
    Room.prototype.getMaxUpgraders = function(){
        return 5;
    },
    Room.prototype.getMaxFighters = function(){
        return 5;
    },
    Room.prototype.getMaxMedics = function(){
        return 5;
    },
    Room.prototype.getMaxContainers = function(){
        return 5;
    },
    Room.prototype.getMaxExtractors = function(){
        return 5;
    },
    Room.prototype.getMaxFactories = function(){
        return 5;
    },
    Room.prototype.getMaxExtensions = function(){
        return 5;
    },
    Room.prototype.getMaxLabs = function(){
        return 5;
    },
    Room.prototype.getMaxLinks = function(){
        return 5;
    },
    Room.prototype.getMaxNukers = function(){
        return 5;
    },
    Room.prototype.getMaxObservers = function(){
        return 5;
    },
    Room.prototype.getMaxPowerSpawns = function(){
        return 5;
    },
    Room.prototype.getMaxSpawns = function(){
        return 5;
    },
    Room.prototype.getMaxStorage = function(){
        return 5;
    },
    Room.prototype.getMaxTowers = function(){
        return 5;
    }
}