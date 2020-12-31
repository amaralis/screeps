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
            console.log(`Blueprints called for creep type ${type} at room ${room.name}`);            
            
            /* ======================================= COMMENT OUT BELOW FOR TESTING ================================================== */
            
            // let bodyArray = [WORK, CARRY,  MOVE, CARRY, MOVE];
            
            // let initialBodyCost = 0;
            // let dynamicBodyCost = 0;
            // let dynamicBody = [];
            // let leastExpensivePartCost = Infinity;
            
            // bodyArray.forEach(bodypart => {
            //     initialBodyCost += BODYPART_COST[bodypart];
            //     if(BODYPART_COST[bodypart] < leastExpensivePartCost){
            //         leastExpensivePartCost = BODYPART_COST[bodypart];
            //     }
            // });

            // // NEEDS MORE LOGIC FOR MOVE PART NUMBER

            // // While body being designed is under 50 parts and room has more energy capacity than the already designed body parts
            // while((dynamicBody.length < 50) && (room.energyCapacityAvailable >= initialBodyCost)) {
            //     // For every pre-determined body part
            //     for(let i = 0; i < bodyArray.length; i++){
            //         // console.log("For loop in blueprint");
            //         // console.log("bodyArray[i]: ", bodyArray[i]);
            //         // console.log("Bodypart cost at array[i]: ", BODYPART_COST[bodyArray[i]]);
            //         // console.log("Room energy available: ", room.energyCapacityAvailable);
                    
            //         // If body being designed is under 50 parts and room has enough energy available for the predetermined design plus this part's cost (first iteration will always go through)
            //         if((dynamicBody.length < 50) && (room.energyCapacityAvailable >= (dynamicBodyCost + BODYPART_COST[bodyArray[i]]))){
            //             // console.log("bodyArray[i]: ", bodyArray[i]);
            //             // console.log("Bodypart cost at bodyArray[i]: ", BODYPART_COST[bodyArray[i]]);
            //             // console.log("Dynamic body cost before adding part cost: ", dynamicBodyCost);
            //             // console.log("Room energy available: ", room.energyCapacityAvailable);
            //             // console.log("Diff between body cost and room energy cpaacity: ", room.energyCapacityAvailable - dynamicBodyCost);
                        
            //             dynamicBody.push(bodyArray[i]);
            //             dynamicBodyCost += BODYPART_COST[bodyArray[i]];                            
            //             // console.log("Dynamic body cost after adding part cost: ", dynamicBodyCost);
            //             // console.log("Dynamic body: ", JSON.stringify(dynamicBody));
            //         }
            //     }
                
            //     // console.log("Least expensive part in body array: ", leastExpensivePartCost);
            //     // console.log(`Energy capacity: (${room.energyCapacityAvailable}) - Dynamic body cost: (${dynamicBodyCost}) < Least expensive part: (${leastExpensivePartCost})? ${room.energyCapacityAvailable - dynamicBodyCost < leastExpensivePartCost})`);

            //     if(room.energyCapacityAvailable - dynamicBodyCost < leastExpensivePartCost){
            //         break;
            //     }                    
            // }

            // console.log("Total dynamic body cost: ", dynamicBodyCost);
            // console.log("Dynamic body array: ", JSON.stringify(dynamicBody));

            // return {
            //     body: dynamicBody,
            //     cost: dynamicBodyCost,
            //     memory: {role: "miner", type: "basic worker", state:"awaiting ownership"}
            // }
            
            /* ========================================================================================= */
            
            // For testing
            return {
                body: [MOVE],
                cost: 50,
                memory: {role: "miner", type: "basic worker", state:"awaiting ownership"}
            }


        }
        default:
            console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");
    }
}