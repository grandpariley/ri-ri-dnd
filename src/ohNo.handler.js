const ohNoRegEx = /ohno/i;

class OhNoHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return ohNoRegEx.exec(this.message.replace(/\s/g, ''));
    }

    reply() {
        return process.env.OHNO_URI;
    }
}

module.exports = OhNoHandler;