const getAdjacentLocations = require("utils");
const utils = require("utils");
const setCreepQueue = require("queue.creep.set");
const executeCreepQueue = require("queue.creep.execute");

const minerTestingMultiplier = 5; // FOR TESTING

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
                console.log("Pushing spot to avoid: X ", spot.x, " Y ", spot.y);
                // console.log("avoidPos: ", JSON.stringify(avoidPos));
                // console.log("Spot: ", JSON.stringify(spot));
            });
            // this.getMiningSpotsPerSource(source).forEach(miningSpot => {
            //     console.log("Mining spot: ", this.memory.minersPerSource)
            //     avoidPos.push(miningSpot);
            // });
        });


        this.find(FIND_MY_SPAWNS).forEach(spawn => {
            // costs.set(positionToAvoid.x, positionToAvoid.y, 255);

            // console.log("COST MATRIX BUILDING");

            // for(let i = 0; i < this.memory.minersPerSource.length; i++){ // Sources
            //     for(let j = 0; j < this.memory.minersPerSource[i].miningSpotsArray.length; j++){ // Mining locations (per source in this case)
            //         let source = this.memory.minersPerSource[i];
            //         let miningSpot = this.memory.minersPerSource[i].miningSpotsArray[j];
            //         spotPos = new RoomPosition(miningSpot.x, miningSpot.y, this.name);
            //         this.memory.spawnToSourcePaths.push({spawn: spawn, location: miningSpot, path: PathFinder.search(spawn.pos, spotPos, {roomCallback: /* pathingDetails(name) */() => {
            //             let minersPerSource = this.memory.minersPerSource;

            //             avoidPos.forEach(positionToAvoid => {
            //                 // costs.set(positionToAvoid.x, positionToAvoid.y, 255);
            //                 // if(positionToAvoid.x === spotPos.x && positionToAvoid.y === spotPos.y){
            //                     console.log("Avoiding x ", positionToAvoid.x, " and y ", positionToAvoid.y);
            //                     // }
            //                 });
            //                 // console.log(maxOps);
            //                 return costs;
            //             }}).path});
            //         }
            //     }
                
            //     console.log("Costs: ", JSON.stringify(costs));



            let i = 1;
            this.memory.minersPerSource.forEach(sourceData => {
                console.log("Iterating through source", i);
                let j = 1;
                sourceData.miningSpotsArray.forEach(location => {
                    console.log("Iterating through mining location ", j);
                    targetPos = new RoomPosition(location.x, location.y, this.name);
                    this.memory.spawnToSourcePaths.push({spawn: spawn, location: location, path: PathFinder.search(spawn.pos, targetPos, {roomCallback: /* pathingDetails(name) */() => {
                        
                        
                        let k = 1;
                        innerLoop:
                        for(let l = 0; l < avoidPos.length; l++){
                            costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                            console.log("Iterating through positions to avoid: ", k);
                            if(avoidPos[l].x == targetPos.x && avoidPos[l].y == targetPos.y){
                                console.log("Not avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                                costs.set(avoidPos[l].x, avoidPos[l].y, 0);
                                k++;
                                continue innerLoop;
                            }
                            if(avoidPos[l].x != targetPos.x && avoidPos[l].y != targetPos.y){
                                console.log("Avoiding X ", avoidPos[l].x, " and Y ", avoidPos[l].y, "- Target pos X ", targetPos.x, " Y ", targetPos.y);
                                costs.set(avoidPos[l].x, avoidPos[l].y, 255);
                                k++;
                                continue innerLoop;
                            }
                            console.log("No collisions for X ", avoidPos[l].x, "Y", avoidPos[l].y);
                            k++;

                        }
                        // avoidPos.forEach(posToAvoid => {
                        //     console.log("Iterating through positions to avoid: ", k);
                        //     if((posToAvoid.x == targetPos.x) && (posToAvoid.y == targetPos.y)){
                        //         console.log("Not avoiding X ", posToAvoid.x, " and Y ", posToAvoid.y);
                        //         console.log("Target pos X ", targetPos.x, " Y ", targetPos.y);
                        //         costs.set(posToAvoid.x, posToAvoid.y, 0);
                        //         k++;
                        //         continue innerLoop;
                        //     }
                        //     if((posToAvoid.x != targetPos.x) && (posToAvoid.y != targetPos.y)){
                        //         console.log("Avoiding X ", posToAvoid.x, " and Y ", posToAvoid.y);
                        //         console.log("Target pos X ", targetPos.x, " Y ", targetPos.y);
                        //         costs.set(posToAvoid.x, posToAvoid.y, 255);
                        //         k++;
                        //         continue innerLoop;
                        //     }

                        // });

                        console.log("Path", j, "created");
                        
                        return costs;
                    }}).path});
                    // avoidPos.push(sourceData.miningSpotsArray[sourceData.miningSpotsArray.indexOf(location)]);
                    // console.log("avoidPos.x: ", avoidPos[avoidPos.indexOf(location)].x, "\navoidPos.y: ", avoidPos[avoidPos.indexOf(location)].y);
                    // console.log("Location to be avoided: ", JSON.stringify(sourceData.miningSpotsArray[sourceData.miningSpotsArray.indexOf(location)]));
                    // console.log("Last position of current path: ", JSON.stringify(this.memory.spawnToSourcePaths[this.memory.spawnToSourcePaths.length - 1].path[this.memory.spawnToSourcePaths[[this.memory.spawnToSourcePaths.length - 1]].path.length - 1]));
                    j++;
                });
                i++;
            });
        });
        this.memory.minersPerSource.forEach(sourceData => {
            sourceData.miningSpotsArray.forEach(spot => {
                console.log("Spot to avoid: X ", spot.x, " Y ", spot.y);
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