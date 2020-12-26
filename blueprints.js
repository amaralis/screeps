module.exports = function(type){
    switch (type){
        case "basic worker":
            return {
                workerBody: [WORK, CARRY, MOVE, MOVE], // 250 energy
                memory: {role: "basic worker", type: "basic worker"}
            }

        default:
            return console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");

    }
}