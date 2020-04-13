const yikesRegEx = /yikes/i;

class YikesHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return !!yikesRegEx.exec(this.message);
    }

    reply() {
        return process.env.YIKES_URI;
    }
}

module.exports = YikesHandler;