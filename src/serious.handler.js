const seriousRegEx = /serious/i;

class SeriousHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return !!seriousRegEx.exec(this.message);
    }

    reply() {
        return '~ s e r i o u s l y ADAM!'
    }
}

module.exports = SeriousHandler;