const OhNoHandler = require('./ohNo.handler.js');
const MarcoPoloHandler = require('./marcoPolo.handler.js');
const DiceHandler = require('./dice.handler.js');
const YikesHandler = require('./yikes.handler.js');
const VroomHandler = require('./vroom.handler.js');
const SeriousHandler = require('./serious.handler.js');

class MessageHandler {
    constructor(message) {
        this.message = message;
        this.handlers = [
            //ADD NEW HANDLERS HERE
            new OhNoHandler(message),
            new MarcoPoloHandler(message),
            new DiceHandler(message),
            new YikesHandler(message),
            new VroomHandler(message),
            new SeriousHandler(message)
        ];
    }

    set message(message) {
        if (typeof message !== 'string' && typeof message !== 'number') {
            throw new Error('message must be a string!');
        }
        this._message = message.toString();
    }

    get message() {
        return this._message;
    }

    get handlers() {
        if (!Array.isArray(this._handlers)) {
            this._handlers = [];
        }
        return this._handlers;
    }

    set handlers(handlers) {
        if (!Array.isArray(handlers)) {
            throw new Error('handlers must be an array!');
        }
        handlers.forEach(handler => {
            if (typeof handler.is !== 'function' || typeof handler.reply !== 'function') {
                throw new Error('handlers must be handlers!');
            }
        });
        this._handlers = handlers;
    }

    set reply(_) {
        throw new Error('cannot set reply!');
    }

    get reply() {
        for (const handler of this.handlers) {
            if (handler.is()) {
                return handler.reply();
            }
        }
        return undefined;
    }
}

module.exports = MessageHandler;