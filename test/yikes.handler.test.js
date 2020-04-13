const assert = require('assert');
const YikesHandler = require('../src/yikes.handler.js');

describe('test yikes', () => {
    [
        {
            desc: 'should be yikes',
            message: 'yikes'
        },
        {
            desc: 'should be YiKes',
            message: 'YiKes'
        },
        {
            desc: 'should be Yikes!',
            message: ':O yikes!'
        },
    ].forEach(msg => {
        it(msg.desc, () => {
            let yikesHandler = new YikesHandler(msg.message);
            assert(yikesHandler.is());
        });
    });

    it('should not be yikes', () => {
        let yikesHandler = new YikesHandler('froot loops');
        assert(!yikesHandler.is());
    });

    it('should get yikes picture uri', () => {
        let yikesHandler = new YikesHandler('');
        assert(process.env.YIKES_URI === yikesHandler.reply());
    });
});