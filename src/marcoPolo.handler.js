const marcoRegEx = /marco/i;

class MarcoPoloHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return !!marcoRegEx.exec(this.message);
    }

    reply() {
        return 'polo!'
    }
}

module.exports = MarcoPoloHandler;