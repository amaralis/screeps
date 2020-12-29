
module.exports = function(){
    /**
     * Build body array based on percentages. Leave out movePercent for auto calculation
     * 
     * @param {string} creepType
     * @param {Room} room
     * @param {number} movePercent 
     * @param {number} workPercent 
     * @param {number} carryPercent 
     * @param {number} attackPercent 
     * @param {number} rangedAttackPercent 
     * @param {number} healPercent 
     * @param {number} toughPercent 
     * @param {number} claimPercent 
     */
    
    function BodyCalculator(creepType = undefined, room = undefined, movePercent = 0, workPercent = 0, carryPercent = 0, attackPercent = 0, rangedAttackPercent = 0, healPercent = 0, toughPercent = 0, claimPercent = 0){
        // {creepType = undefined, workPercent = 0, movePercent = 0, carryPercent = 0, attackPercent = 0, rangedAttackPercent = 0, healPercent = 0, toughPercent = 0, claimPercent = 0}
        // Multiplier
        this.creepType = creepType;
        this.workPercent = workPercent / 100;
        this.movePercent = movePercent / 100;
        this.carryPercent = carryPercent / 100;
        this.attackPercent = attackPercent / 100;
        this.rangedAttackPercent = rangedAttackPercent / 100;
        this.healPercent = healPercent / 100;
        this.toughPercent = toughPercent / 100;
        this.claimPercent = claimPercent / 100;

        this.workCost = 100;
        this.moveCost = 50;
        this.carryCost = 50;
        this.attackCost = 80;
        this.rangedAttackCost = 150;
        this.healCost = 250;
        this.toughCost = 10;
        this.claimCost = 600;

    }

    BodyCalculator.prototype.getPercentages = function(){
        const percentages = {
            workPercent: this.workPercent,
            movePercent: this.movePercent,
            carryPercent: this.carryPercent,
            attackPercent: this.attackPercent,
            rangedAttackPercent: this.rangedAttackPercent,
            healPercent: this.healPercent,
            toughPercent: this.toughPercent,
            claimPercent: this.claimPercent            
        }

        return percentages;
    }

    BodyCalculator.prototype.getPartCosts = function(){
        const cost = {
            "work": 100,
            "move": 50,
            "carry": 50,
            "attack": 80,
            "ranged_attack": 150,
            "heal": 250,
            "tough": 10,
            "claim": 600            
        }

        return cost;
    }

    BodyCalculator.prototype.getBodyArray = function(room){
        const energyAvailable = room.energyAvailable;
        let sum = 0;
        let parts = 0;

        if(this.movePercent === 0 && this.carryPercent >= 0.5){
            for(const pc in this.getPercentages()){
                let numParts = energyAvailable / (7/pc)
            }
        }
    }
}