/**
 * Returns a somewhat dynamic creep body array
 * 
 * @param {string} type 
 * @param {Room} room
 * @returns {Object}
 */

module.exports = function(type, room){
    switch (type){
        case "miner":{
            console.log("Blueprints called");
            console.log("type: ", JSON.stringify(type));
            console.log("room: ", room.name);
            let bodyArray = [/* WORK, CARRY,  */MOVE/* , CARRY, MOVE */];

            // let initialBodyCost = bodyArray.reduce((sum, bodyPart) => {sum + BODYPART_COST[bodyPart]; console.log("Current bodypart cost:", BODYPART_COST[bodyPart]); console.log("Current sum: ", sum)}, 0);
            
            let totalBodyCost = 0;
            bodyArray.forEach(bodypart => totalBodyCost += BODYPART_COST[bodypart]);
            let dynamicBody = [...bodyArray];

            for(let i = 0; i < bodyArray.length; i++){
                // console.log("For loop in blueprint");
                // console.log("bodyArray[i]: ", bodyArray[i]);
                // console.log("Bodypart cost at array[i]: ", BODYPART_COST[bodyArray[i]]);
                // console.log("Room energy available: ", room.energyAvailable);
                if((dynamicBody.length < 50) && (room.energyAvailable >= (totalBodyCost + BODYPART_COST[bodyArray[i]]))){
                    console.log("bodyArray[i]: ", bodyArray[i]);
                    console.log("Bodypart cost at array[i]: ", BODYPART_COST[bodyArray[i]]);
                    console.log("Room energy available: ", room.energyAvailable);

                    dynamicBody.push(bodyArray[i]);
                    totalBodyCost += BODYPART_COST[bodyArray[i]];
                }
            }

            console.log("Total dynamic body cost: ", totalBodyCost);
            console.log("Dynamic body array: ", JSON.stringify(dynamicBody));

            return {
                body: dynamicBody,
                cost: totalBodyCost,
                memory: {role: "miner", type: "basic worker", state:"awaiting ownership"}
            }
        }
        default:
            return console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");
    }
}