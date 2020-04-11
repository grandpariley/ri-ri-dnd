const Dice = require('./dice.js')

const diceRegEx = /([0-9]*)d([0-9]+)([+-]?[0-9]*)((adv)|(dadv))?/i;

class DiceHandler {
    constructor(message) {
        this.message = message;
        this.dice = new Dice();
    }

    is() {
        return !!diceRegEx.exec(this.message.replace(/\s/g, ''));
    }

    reply() {
        this.setDiceSidesFromDiceMessage();
        this.setDiceAmountFromDiceMessage();
        this.setAdvantageOrDisadvantageFromDiceMessage();
        let results = this.dice.rollAll()
        let total = (results.reduce((sum, die) => sum + die)
            + this.getModifierFromDiceMessage()).toString();
        return '\nresults: ' + results + '\ntotal: ' + total;
    }

    getNumberByIndexInDiceMessage(index) {
        let parseSides = diceRegEx.exec(this.message.replace(/\s/g, ''));
        if (!parseSides || parseSides.length < 3 || isNaN(parseSides[index])) {
            throw new Error('invalid dice message');
        }
        return Number(parseSides[index]);
    }

    getModifierFromDiceMessage() {
        let modifier = this.getNumberByIndexInDiceMessage(3);
        if (!modifier) {
            return 0;
        }
        return modifier;
    }

    setDiceSidesFromDiceMessage() {
        this.dice.sides = this.getNumberByIndexInDiceMessage(2);
    }

    setDiceAmountFromDiceMessage() {
        let amount = this.getNumberByIndexInDiceMessage(1);
        if (!amount) {
            this.dice.amount = 1
        }
        else {
            this.dice.amount = amount;
        }
    }

    setAdvantageOrDisadvantageFromDiceMessage() {
        let parseSides = diceRegEx.exec(this.message.replace(/\s/g, ''));
        if (!parseSides || parseSides.length < 4) {
            this.dice.advantage = 0;
        }
        if (parseSides[4] === 'adv') {
            this.dice.advantage = 1;
        }
        else if (parseSides[4] === 'dadv') {
            this.dice.advantage = -1;
        }
    }
}

module.exports = DiceHandler;