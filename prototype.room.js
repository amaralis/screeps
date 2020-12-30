const getAdjacentLocations = require("utils");
const utils = require("utils");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

const minerTestingMultiplier = 5; // FOR TESTING

module.exports = function(){

    /**
     * Pushes mining spots from sources to a generic miningLocations array
     */
    Room.prototype.setMiningLocations = function() {
        this.memory.minersPerSource.forEach(source => {
            source.miningSpotsArray.forEach(spot => {
                this.memory.miningLocations.push(spot);
            })
        });
    },
        
    /**
     * Dangerously initializes mining spots per source. Only perform this operation at room start.
     * @param {Source} source 
     */
    Room.prototype.initializeMiningSpotsPerSource = function(source){
        let adjacentLocationsArray = utils.getAdjacentLocations(source);
        const terrain = new Room.Terrain(this.name);
        let miningSpotsArray= [];
        
        adjacentLocationsArray.forEach(location => {
            if(terrain.get(location.x, location.y) === 0 || terrain.get(location.x, location.y) === 2){
                miningSpotsArray.push(location);
            }            
        });
        
        const workAmount = Math.ceil(source.energyCapacity/2/SPAWN_ENERGY_CAPACITY/miningSpotsArray.length);
        spotsPerSourceData = {miningSpotsArray, workPerMiner: workAmount, source};        
        this.memory.minersPerSource.push(spotsPerSourceData);
    },

    /**
     * Get an array of objects with a mining spot and its corresponding source
     * @param {Source}
     * @returns {Array}
     */

    Room.prototype.getMiningSpotsPerSource = function(source){
        let spotsPerSource = [];

        source.miningSpotsArray.forEach(miningSpotData => {
            if(miningSpotData.miningSpot.adjacentTo.id == source.id){
                spotsPerSource.push({miningSpot, source});    
            }
        });

        return spotsPerSource;
    },
            
    Room.prototype.setSpawnToSourcePaths = function(){
        this.find(FIND_MY_SPAWNS).forEach(spawn => {
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
        return maxMiners * minerTestingMultiplier; // TESTING MULTIPLIER
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