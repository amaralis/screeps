const getAdjacentLocations = require("utils");
const utils = require("utils");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

const minerTestingMultiplier = 3; // FOR TESTING

module.exports = function(){
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
     * Get an object with an array with mining spot location objects, with work units per miner, and with relevant source
     * @param {Source}
     * @returns {Object} - miningSpotsArray, workPerMiner, source
     */

    Room.prototype.getMiningSpotsPerSource = function(source){
        let spotsArray = [];
        this.memory.minersPerSource.forEach(sourceData => {
            if(sourceData.source.id === source.id){
                spotsArray = sourceData.miningSpotsArray;
            }
        });

        return spotsArray;
    },
            
    Room.prototype.setSpawnToSourcePaths = function(){
        let costs = new PathFinder.CostMatrix;
        let avoidPos = [];

        this.memory.minersPerSource.forEach(sourceData => {
            sourceData.miningSpotsArray.forEach(spot => {
                avoidPos.push(spot);
                // console.log("Pushing spot to avoid: X ", spot.x, " Y ", spot.y);
            });
        });


        this.find(FIND_MY_SPAWNS).forEach(spawn => {
            // let i = 1;
            this.memory.minersPerSource.forEach(sourceData => {
                // console.log("Iterating through source", i);
                // let j = 1;
                sourceData.miningSpotsArray.forEach(location => {
                    // console.log("Iterating through mining location ", j);
                    targetPos = new RoomPosition(location.x, location.y, this.name);
                    this.memory.spawnToSourcePaths.push({spawn: spawn, location: location, path: PathFinder.search(spawn.pos, targetPos, {roomCallback: /* pathingDetails(name) */() => {
                        
                        // Set tiles where miners will be mining as unwalkable
                        
                        // let k = 1;
                        innerLoop:
                        for(let l = 0; l < avoidPos.length; l++){
                            costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                            // console.log("Iterating through positions to avoid: ", k);
                            if(avoidPos[l].x == targetPos.x && avoidPos[l].y == targetPos.y){
                                // console.log("Not avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                                costs.set(avoidPos[l].x, avoidPos[l].y, 0);
                                // k++;
                                continue innerLoop;
                            }
                            if(avoidPos[l].x != targetPos.x && avoidPos[l].y != targetPos.y){
                                // console.log("Avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                                costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                                // k++;
                                continue innerLoop;
                            }
                            // console.log("No collisions for X ", avoidPos[l].x, "Y", avoidPos[l].y);
                            // k++;

                        }

                        // console.log("Path", j, "created");
                        
                        return costs;
                    }})}.path);
                    // j++;
                });
                // i++;
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

    /**
     * Sets the array of available locations for upgrading the room's controller
     * 
     * @param {StructureController} controller
     * @returns {Array} 
     */
    Room.prototype.setControllerUpgradeLocations = function(controller){
        this.memory.controllerUpgradeLocations = utils.getUpgradingLocations(controller);
    },

    Room.prototype.setSpawnToControllerPaths = function(){
        let costs = new PathFinder.CostMatrix;
        let avoidPos = [];
        let controller = this.controller;

        this.memory.controllerUpgradeLocations.forEach(upgradeLocation => {
            avoidPos.push(upgradeLocation);
            // console.log("Pushing spot to avoid: X ", spot.x, " Y ", spot.y);
        });

        this.find(FIND_MY_SPAWNS).forEach(spawn => {
            // let i = 1;

            this.memory.controllerUpgradeLocations.forEach(upgradeLocation => {
                // console.log("Iterating through mining upgradeLocation ", j);
                targetPos = new RoomPosition(upgradeLocation.x, upgradeLocation.y, this.name);
                this.memory.spawnToControllerPaths.push({spawn: spawn.id, upgradeLocation, path: PathFinder.search(spawn.pos, targetPos, {roomCallback: /* pathingDetails(name) */() => {
                    
                    // Set tiles where upgraders will be upgrading as unwalkable
                    
                    // let k = 1;
                    // innerLoop:
                    for(let l = 0; l < avoidPos.length; l++){
                        costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                        // console.log("Iterating through positions to avoid: ", k);
                        if(avoidPos[l].x == targetPos.x && avoidPos[l].y == targetPos.y){
                            // console.log("Not avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                            costs.set(avoidPos[l].x, avoidPos[l].y, 0);
                            // k++;
                            // continue innerLoop;
                        }
                        // if(avoidPos[l].x != targetPos.x && avoidPos[l].y != targetPos.y){
                        //     // console.log("Avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                        //     costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                        //     // k++;
                        //     continue innerLoop;
                        // }
                        // console.log("No collisions for X ", avoidPos[l].x, "Y", avoidPos[l].y);
                        // k++;

                    }

                    // console.log("Path", j, "created");
                    
                    return costs;
                }})}.path);
                // j++;
            });
        });
    },

    Room.prototype.setControllerToSpawnPaths = function(){
        this.memory.spawnToControllerPaths.forEach(obj => {
            let tempPathArray = [...obj.path];
            tempPathArray = tempPathArray.reverse();
            this.memory.controllerToSpawnPaths.push(tempPathArray);
        });
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