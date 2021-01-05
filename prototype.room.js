const getAdjacentLocations = require("utils");
const utils = require("utils");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

let maxMinersPerSpot = 3;

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
        
        this.memory.controllerUpgradeLocations.forEach(upgradeLocation => {
            avoidPos.push(upgradeLocation);
            // console.log("Pushing spot to avoid: X ", spot.x, " Y ", spot.y);
        });
        
        this.memory.minersPerSource.forEach(sourceData => {
            sourceData.miningSpotsArray.forEach(miningSpot => {
                avoidPos.push(miningSpot);
                // console.log("Pushing spot to avoid: X ", spot.x, " Y ", spot.y);
                
            });
        });
        
        this.find(FIND_MY_SPAWNS).forEach(spawn => {
            // let i = 1;
            let avoidSpawnPos = [];
            spawn.memory.forbiddenUpgraderStartingPos.forEach(forbiddenPos => {
                avoidSpawnPos.push(forbiddenPos);
                // console.log("Pushing forbidden pos ", JSON.stringify(forbiddenPos));
            });

            this.memory.controllerUpgradeLocations.forEach(upgradeLocation => {
                // console.log("Iterating through mining upgradeLocation ", j);
                targetPos = new RoomPosition(upgradeLocation.x, upgradeLocation.y, this.name);
                // console.log("Cycling through controller upgrade locations...");
                this.memory.spawnToControllerPaths.push({spawn: spawn.id, upgradeLocation, path: PathFinder.search(spawn.pos, targetPos, {roomCallback: /* pathingDetails(name) */() => {
                    
                    // Set tiles where upgraders will be upgrading as unwalkable
                    
                    // let k = 1;
                    // innerLoop:
                    for(let i = 0; i < avoidSpawnPos.length; i++){
                        // console.log("Setting spawn position to avoid X", avoidSpawnPos[i].x, "Y", avoidSpawnPos[i].y);
                        costs.set(avoidSpawnPos[i].x, avoidSpawnPos[i].y, 255);
                    }

                    for(let l = 0; l < avoidPos.length; l++){
                        costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                        // costs.set(30,33,255);
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
    
    Room.prototype.assignMiningSpot = function(creep){
        const room = Game.rooms[creep.memory.ownedBy];
        if(!creep.memory.hasMiningSpot){
            // console.log("Assigning mining spot to creep ", creep.name);
            const creepSpot = creep.getMiningSpot();
            // console.log(`Creep mining spot in memory is ${JSON.stringify(creepSpot)}`);
            
            loop1:
            for(let i = 0; i < room.memory.sources.length; i++){
                let miningSpotsArray = room.getMiningSpotsPerSource(room.memory.sources[i]);
                // console.log(`Looping through sources.\nMining spots array for source ${room.memory.sources[i].id} is ${JSON.stringify(miningSpotsArray)}`);
                for(let j = 0; j < miningSpotsArray.length; j++){
                    // console.log(`Looping through mining spots array.\nCurrent mining spot is ${JSON.stringify(miningSpotsArray[j])}`);
                    if(creepSpot.x === miningSpotsArray[j].x && creepSpot.y === miningSpotsArray[j].y){
                        // console.log(`Mining spot array ${JSON.stringify(miningSpotsArray[j])} corresponds to creep's mining spot ${JSON.stringify(creepSpot)}`);
                        room.memory.minersPerSource[i].miningSpotsArray[j].isTakenBy.push(creep.name);
                        break loop1;
                    }
                }
            }
            // console.log("Push to mining spot loop complete");
            creep.memory.hasMiningSpot = true;
            creep.memory.miningSpot = creepSpot;
        }
    }
    
    Room.prototype.getMaxMiners = function(){
        let maxMiners = 0;
        this.memory.minersPerSource.forEach(elt => {
            maxMiners += elt.miningSpotsArray.length;
        });
        // console.log("Max miners if 1 per mining spot: ", maxMiners, "\nMax miners per spot:", maxMinersPerSpot, "at room.getMaxMiners()")
        return maxMiners * maxMinersPerSpot;
    },

    Room.prototype.setMaxMiners = function(num){
        this.memory.objectives.creeps.miner = num;
    },

    Room.prototype.setMaxMinersPerSpot = function(num){
        minersPerSpot = num;
        console.log("Setting max miners per spot to ", num);

        this.setMaxMiners(this.getMaxMiners());
    },

    Room.prototype.getMaxMinersPerSpot = function(){
        return maxMinersPerSpot;
    }

    /**
     * @returns Number of miners already spawned in
     */

    Room.prototype.getExistingMiners = function(){
        existingMiners = 0;

        if(this.memory.creeps && this.memory.creeps.length > 0){
            this.memory.creeps.forEach(creepName => {
                if(Game.creeps[creepName] && (Game.creeps[creepName].memory.role === "miner")){
                    existingMiners++;
                }
            });
        }

        return existingMiners;
    },

    Room.prototype.getNeededMiners = function(){
        const maxMiners = this.memory.objectives.creeps.miner;
        let existingMiners = this.getExistingMiners(); // was = 0
        
        // if(this.memory.creeps && this.memory.creeps.length > 0){
        //     this.memory.creeps.forEach(creepName => {
        //         if(Game.creeps[creepName] && (Game.creeps[creepName].memory.role === "miner")){
        //             existingMiners++;
        //         }
        //     });
        // }
    
        console.log(`Existing miners: ${existingMiners}\nMax miners: ${maxMiners}\nNeeded miners: ${(maxMiners - existingMiners)} - at room.getNeededMiners`)
    
        let neededMiners = maxMiners - existingMiners;
        
        return neededMiners;
    },

    /**
     * @returns Number of miners in the queue
     */

    Room.prototype.getQueuedMiners = function(){
        let queued = 0;
        this.memory.creepQueue.forEach(queuedCreep => {
            if(queuedCreep.creepType === "miner"){
                queued++;
            }
        });
        return queued;
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

    Room.prototype.assignUpgradingSpot = function(creep){
        const room = Game.rooms[creep.memory.ownedBy];
        if(!creep.memory.hasUpgradingSpot){
            // console.log("Assigning mining spot to creep ", creep.name);
            const creepSpot = creep.getUpgradingSpot();
            // console.log(`Creep mining spot in memory is ${JSON.stringify(creepSpot)}`);
            
            let upgradingSpotsArray = room.memory.controllerUpgradeLocations;
                for(let i = 0; i < upgradingSpotsArray.length; i++){
                    // console.log(`Looping through upgradingSpotsArray.\nCurrent upgrading spot is ${JSON.stringify(upgradingSpotsArray[i])}`);
                    if(creepSpot.x === upgradingSpotsArray[i].x && creepSpot.y === upgradingSpotsArray[i].y){
                        // console.log(`Mining spot array ${JSON.stringify(miningSpotsArray[i])} corresponds to creep's mining spot ${iSON.stringify(creepSpot)}`);
                        upgradingSpotsArray[i].isTakenBy.push(creep.name);
                        break;
                    }
                }
            // console.log("Push to mining spot loop complete");
            creep.memory.hasUpgradingSpot = true;
            creep.memory.upgradingSpot = creepSpot;
        }
    },

    Room.prototype.getMaxUpgraders = function(){
        return (this.memory.controllerUpgradeLocations.length);
    },

    Room.prototype.getExistingUpgraders = function(){
        existingUpgraders = 0;

        if(this.memory.creeps && this.memory.creeps.length > 0){
            this.memory.creeps.forEach(creepName => {
                if(Game.creeps[creepName] && (Game.creeps[creepName].memory.role === "upgrader")){
                    existingUpgraders++;
                }
            });
        }

        return existingUpgraders;
    },

    Room.prototype.getNeededUpgraders = function(){
        const maxUpgraders = this.memory.objectives.creeps.upgrader;
        let existingUpgraders = this.getExistingUpgraders();
        let neededUpgraders = maxUpgraders - existingUpgraders;
        console.log(`Existing Upgraders: ${existingUpgraders}\nMax Upgraders: ${maxUpgraders}\nNeeded Upgraders: ${(maxUpgraders - existingUpgraders)} - at queue.upgraders`)

        return neededUpgraders;
    },

    Room.prototype.getQueuedUpgraders = function(){
        let queued = 0;
        this.memory.creepQueue.forEach(queuedCreep => {
            if(queuedCreep.creepType === "upgrader"){
                queued++;
            }
        });
        return queued;
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