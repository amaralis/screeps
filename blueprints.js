const getMinerBP = require("blueprints.miner");

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
            return getMinerBP(room);
        }

        case "builder":{

            break;
        }
        default:
            console.log("BLUEPRINT TYPE IS NOT VALID - blueprints.js");
    }
}