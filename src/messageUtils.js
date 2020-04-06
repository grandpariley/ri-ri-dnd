const diceRegex = /([0-9]+)d([0-9]+)([+-]{0,1}[0-9]*)/i;

class MessageUtils {
    constructor() {
        this.message = '';
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

    // MARCO / POLO SUPPORT
    isMarco() {
        return /marco/i.exec(this.message);
    }

    getPolo() {
        return 'polo!'
    }

    // DICE SUPPORT
    isDiceRoll() {
        return !!diceRegex.exec(this.message.replace(/\s/g,''));
    }

    getNumberByIndexInDiceMessage(index) {
        let parseSides = diceRegex.exec(this.message.replace(/\s/g,''));
        if (!parseSides || parseSides.length < 3 || isNaN(parseSides[index])) {
            throw new Error('invalid dice message')
        }
        return Number(parseSides[index]);
    }

    getModifierFromDiceMessage() {
        return this.getNumberByIndexInDiceMessage(3)
    }

    getDiceSidesFromDiceMessage() {
        return this.getNumberByIndexInDiceMessage(2);
    }

    getDiceAmountFromDiceMessage() {
        return this.getNumberByIndexInDiceMessage(1);
    }
}

module.exports = MessageUtils;