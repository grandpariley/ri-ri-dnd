const assert = require('assert');
const HopeHandler = require('../src/hope.handler.js');

describe('test oh no', () => {
    [
        {
            desc: 'should be hope',
            message: 'hope'
        },
        {
            desc: 'should be hope case insensitive',
            message: 'HoPe'
        },
    ].forEach(msg => {
        it(msg.desc, () => {
            let hopeHandler = new HopeHandler(msg.message);
            assert(hopeHandler.is());
        });
    });

    it('should not be hope', () => {
        let hopeHandler = new HopeHandler('froot loops');
        assert(!hopeHandler.is());
    });

    it('should get poem', () => {
        let hopeHandler = new HopeHandler('');
        assert(hopeHandler.reply() === '\n“Hope” is the thing with feathers -\n' +
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
        'It asked a crumb - of me.');
    });
});