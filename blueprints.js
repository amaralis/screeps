module.exports = function(type){
    switch (type){
        case "miner":
            return {
                // body: [WORK, CARRY, MOVE, MOVE], // 250 energy
                body: [MOVE], // test
                memory: {role: "miner", type: "basic worker", state:"awaiting ownership"}
            }

        default:
            return console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");

    }
}
