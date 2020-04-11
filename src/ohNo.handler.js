const ohNoRegEx = /ohno/i;

class OhNoHandler {
    constructor(message) {
        this.message = message;
    }

    isOhNo() {
        return ohNoRegEx.exec(this.message.replace(/\s/g, ''));
    }

    getOhNo() {
        return process.env.OHNO_URI;
    }
}

module.exports = OhNoHandler;