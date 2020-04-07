const Dice = require('./dice.js');

const marcoRegEx = /marco/i;
const diceRegEx = /([0-9]*)d([0-9]+)([+-]?[0-9]*)((adv)|(dadv))?/i;
const ohNoRegEx = /ohno/i;

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
            return this.getDiceRoll()
        }

        if (this.isOhNo()) {
            return this.getOhNoPicture();
        }
    }

    // MARCO / POLO SUPPORT
    isMarco() {
        return marcoRegEx.exec(this.message);
    }

    getPolo() {
        return 'polo!'
    }

    // DICE SUPPORT
    isDiceRoll() {
        return !!diceRegEx.exec(this.message.replace(/\s/g, ''));
    }

    getDiceRoll() {
        this.setDiceSidesFromDiceMessage();
        this.setDiceAmountFromDiceMessage();
        this.setAdvantageOrDisadvantageFromDiceMessage();
        return (this.dice.rollAllAndSum()
            + this.getModifierFromDiceMessage()).toString();
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

    // OH NO
    isOhNo() {
        return ohNoRegEx.exec(this.message.replace(/\s/g, ''));
    }

    getOhNoPicture() {
        return process.env.OHNO_URI;
    }
}

module.exports = MessageHandler;