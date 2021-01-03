module.exports = function(){
    Creep.prototype.getSpawnToSourcePath = function(){
        return this.room.memory.spawnToSourcePaths[this.memory.toSourcePathIndex].path; // room.memory.spawnToSourcePaths probably only needs the path array, like the other one
    },
    
    Creep.prototype.getSourceToSpawnPath = function(){
        return this.room.memory.sourceToSpawnPaths[this.memory.toSpawnPathIndex];
    },

    Creep.prototype.getMiningSpot = function(){
        let pathToSource = this.getSpawnToSourcePath();
        let lastIndex = pathToSource.length - 1;
        return pathToSource[lastIndex];
    },

    Creep.prototype.assignMiningSpot = function(){
        if(!this.memory.hasMiningSpot){
            console.log("Assigning mining spot to creep ", this.name);
            const creepSpot = this.getMiningSpot();
            console.log(`Creep mining spot in memory is ${JSON.stringify(creepSpot)}`);
            
            loop1:
            for(let i = 0; i < Game.rooms[this.memory.ownedBy].memory.sources.length; i++){
                let miningSpotsArray = Game.rooms[this.memory.ownedBy].getMiningSpotsPerSource(Game.rooms[this.memory.ownedBy].memory.sources[i]);
                console.log(`Looping through sources.\nMining spots array for source ${Game.rooms[this.memory.ownedBy].memory.sources[i].id} is ${JSON.stringify(miningSpotsArray)}`);
                for(let j = 0; j < miningSpotsArray.length; j++){
                    console.log(`Looping through mining spots array.\nCurrent mining spot is ${JSON.stringify(miningSpotsArray[j])}`);
                    if(creepSpot.x === miningSpotsArray[j].x && creepSpot.y === miningSpotsArray[j].y)
                    console.log(`Mining spot array ${JSON.stringify(miningSpotsArray[j])} corresponds to creep's mining spot ${JSON.stringify(creepSpot)}`);
                        Game.rooms[this.memory.ownedBy].memory.minersPerSource[i].miningSpotsArray[j].isTakenBy.push(this.name);
                        break loop1;
                }
            }
            console.log("Push to mining spot loop complete");
            this.memory.hasMiningSpot = true;
            this.memory.miningSpot = creepSpot;
        }
    }
}