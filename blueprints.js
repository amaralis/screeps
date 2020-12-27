module.exports = function(type){
    switch (type){
        case "miner":
            return {
                workerBody: [WORK, CARRY, MOVE, MOVE], // 250 energy
                memory: {role: "miner", type: "basic worker"}
            }

        default:
            return console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");

    }
}