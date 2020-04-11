const marcoRegEx = /marco/i;

class MarcoPoloHandler {
    constructor(message) {
        this.message = message;
    }

    isMarco() {
        return marcoRegEx.exec(this.message);
    }

    getPolo() {
        return 'polo!'
    }
}

module.exports = MarcoPoloHandler;