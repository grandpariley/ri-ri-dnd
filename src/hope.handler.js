const hopeRegEx = /hope/i;

class HopeHandler {
    constructor(message) {
        this.message = message;
    }

    is() {
        return !!hopeRegEx.exec(this.message);
    }

    reply() {
        return  '\n“Hope” is the thing with feathers -\n' +
                'That perches in the soul -\n' +
                'And sings the tune without the words -\n' +
                'And never stops - at all -\n' +
                
                'And sweetest - in the Gale - is heard -\n' +
                'And sore must be the storm -\n' +
                'That could abash the little Bird\n' +
                'That kept so many warm -\n' +
                
                'I’ve heard it in the chillest land -\n' +
                'And on the strangest Sea -\n' +
                'Yet - never - in Extremity,\n' +
                'It asked a crumb - of me.'
    }
}

module.exports = HopeHandler;