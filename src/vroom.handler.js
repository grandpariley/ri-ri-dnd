const vroomRegEx = /vroom/i;

class VroomHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return !!vroomRegEx.exec(this.message);
    }

    reply() {
        return 'ALL HAIL THE COOLEST GUY ON DISCORD'
    }
}

module.exports = VroomHandler;