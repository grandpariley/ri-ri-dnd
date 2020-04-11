const OhNoHandler = require('./ohNo.handler.js');
const MarcoPoloHandler = require('./marcoPolo.handler.js');
const DiceHandler = require('./dice.handler.js');

class MessageHandler {
    constructor(message) {
        this.message = message;
        this.ohNoHandler = new OhNoHandler(message);
        this.marcoPoloHandler = new MarcoPoloHandler(message);
        this.diceHandler = new DiceHandler(message);
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

    set reply(_) {
        throw new Error('cannot set reply!');
    }

    // HANDLERS
    get reply() {
        if (this.marcoPoloHandler.isMarco()) {
            return this.marcoPoloHandler.getPolo();
        }

        if (this.diceHandler.isDiceRoll()) {
            return this.diceHandler.getDiceRoll();
        }

        if (this.ohNoHandler.isOhNo()) {
            return this.ohNoHandler.getOhNo();
        }
    }
}

module.exports = MessageHandler;