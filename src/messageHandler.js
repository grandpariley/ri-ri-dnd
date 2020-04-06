const Dice = require('./dice.js');
const diceRegex = /([0-9]*)d([0-9]+)([+-]{0,1}[0-9]*)/i;


class MessageHandler {
    constructor() {
        this._message = '';
        this._dice = new Dice()
    }

    set message(message) {
        if (typeof message !== 'string' && typeof message !== 'number') {
            throw new Error('message must be a string!')
        }
        this._message = message.toString();
    }

    get message() {
        return this._message;
    }

    set dice(_) {
        throw new Error('cannot set dice!');
    }

    get dice() {
        return this._dice;
    }

    set reply(_) {
        throw new Error('cannot set reply!');
    }

    // HANDLER
    get reply() {
        if (this.isMarco()) {
            return this.getPolo();
        }

        if (this.isDiceRoll()) {
            this.setDiceSidesFromDiceMessage();
            this.setDiceAmountFromDiceMessage();
            this.setAdvantageOrDisadvantageFromDiceMessage();
            return (this.dice.rollAllAndSum()
                + this.getModifierFromDiceMessage()).toString();
        }
    }

    // MARCO / POLO SUPPORT
    isMarco() {
        return /marco/i.exec(this.message);
    }

    getPolo() {
        return 'polo!'
    }

    // DICE SUPPORT
    isDiceRoll() {
        return !!diceRegex.exec(this.message.replace(/\s/g, ''));
    }

    getNumberByIndexInDiceMessage(index) {
        let parseSides = diceRegex.exec(this.message.replace(/\s/g, ''));
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
        let parseSides = diceRegex.exec(this.message.replace(/\s/g, ''));
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

module.exports = MessageHandler;