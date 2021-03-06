/**
 * Initializes a room. Destroys all existing memory and functionality.
 * @param {Room} room 
 */
const initializer = function(room) {
    room.memory.initialized = false;
    
    // Push spawns to memory
    if(!room.memory.roomSpawns || !room.memory.roomSpawns.length){
        room.memory.roomSpawns = [];
        const spawns = room.find(FIND_MY_SPAWNS);
        if(spawns){
            spawns.forEach(spawn => {
                room.memory.roomSpawns.push({name: spawn.name, id: spawn.id});
                // spawn.memory.availableAdjacentLocations = [];
                spawn.getOpenAdjacentLocations();
            });
        }
    }    
    
    // Push sources to memory
    if(!room.memory.sources || !room.memory.sources.length){
        room.memory.sources = [];
        room.find(FIND_SOURCES).forEach(source => {
            room.memory.sources.push(source);
        });
    }
    
    // Find how many work units and miners per source are needed
    if((!room.memory.minersPerSource || !(room.memory.minersPerSource.length > 0)) && room.memory.sources){
        room.memory.minersPerSource = [];
        room.memory.sources.forEach(source => {
            room.initializeMiningSpotsPerSource(source);
        });
    }
    
    // Find path from spawn to energy sources, commit to room memory
    if(!room.memory.spawnToSourcePaths || !room.memory.spawnToSourcePaths.length){
        room.memory.spawnToSourcePaths = [];
        room.setSpawnToSourcePaths();
    }    
    
    // Find path from energy sources to spawn, commit to room memory
    if(!room.memory.sourceToSpawnPaths || !room.memory.sourceToSpawnPaths.length){
        room.memory.sourceToSpawnPaths = [];
        room.setSourceToSpawnPaths();
    }

    // Create creeps array
    if(!room.memory.creeps || !room.memory.creeps.length){
        room.memory.creeps = [];
    }
    
    // Store open starting locations for upgraders in spawn's memory
    room.memory.roomSpawns.forEach(elt => {
        let spawn = Game.getObjectById(elt.id);
        // console.log(JSON.stringify(room.memory.roomSpawns))
        if(!spawn.memory.forbiddenUpgraderStartingPos){
            spawn.memory.forbiddenUpgraderStartingPos = [];
            spawn.setForbiddenUpgraderStartingPos();
        }
    });

    // Create controller upgrade locations array
    if(!room.memory.controllerUpgradeLocations || !room.memory.controllerUpgradeLocations.length){
        room.setControllerUpgradeLocations(room.controller);
    }

    // Find path from spawn to controller, commit to room memory
    if(!room.memory.spawnToControllerPaths || !room.memory.spawnToControllerPaths.length){
        room.memory.spawnToControllerPaths = [];
        room.setSpawnToControllerPaths();
    }

    // Find path from controller to spawn, commit to room memory
    if(!room.memory.controllerToSpawnPaths || !room.memory.controllerToSpawnPaths.length){
        room.memory.controllerToSpawnPaths = [];
        room.setControllerToSpawnPaths();
    }

    // Set objectives
    if(!room.memory.objectives){
        room.memory.objectives = {
                creeps: {
                    miner: room.getMaxMiners(),
                    hauler: room.getMaxHaulers(),
                    repairer: room.getMaxRepairers(),
                    builder: room.getMaxBuilders(),
                    upgrader: room.getMaxUpgraders(),
                    fighter: room.getMaxFighters(),
                    medic: room.getMaxMedics()
                },
                buildings: {
                    container: room.getMaxContainers(),
                    extension: room.getMaxExtensions(),
                    extractor: room.getMaxExtractors(),
                    factory: room.getMaxFactories(),
                    lab: room.getMaxLabs(),
                    link: room.getMaxLinks(),
                    nuker: room.getMaxNukers(),
                    observer: room.getMaxObservers(),
                    powerSpawn: room.getMaxPowerSpawns(),
                    spawn: room.getMaxSpawns(),
                    storage: room.getMaxStorage(),
                    tower: room.getMaxTowers()
                }
        };
    }
    
    // Set initial room state
    if(!room.memory.state){
        room.setState("rcl1-nominal");
    }
    
    // Set creep production queues and execute
    if(!room.memory.creepQueue || !room.memory.creepQueue.length){
        room.memory.creepQueue = [];
        room.memory.creepProductionQueue = [];
        room.setCreepQueue();
    }

    room.memory.initialized = true;
}

module.exports = initializer;