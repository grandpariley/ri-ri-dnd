const assert = require('assert');
const OhNoHandler = require('../src/ohNo.handler.js');

describe('test oh no', () => {
    [
        {
            desc: 'should be ohno',
            message: 'ohno'
        },
        {
            desc: 'should be OhNo',
            message: 'OhNo'
        },
        {
            desc: 'should be oh no',
            message: 'oh no'
        },
        {
            desc: 'should be ohno',
            message: ':O oh no!'
        },
    ].forEach(msg => {
        it(msg.desc, () => {
            let ohNoHandler = new OhNoHandler(msg.message);
            assert(ohNoHandler.is());
        });
    });

    it('should not be oh no', () => {
        let ohNoHandler = new OhNoHandler('froot loops');
        assert(!ohNoHandler.is());
    });

    it('should get oh no picture uri', () => {
        let ohNoHandler = new OhNoHandler('');
        assert(process.env.OHNO_URI === ohNoHandler.reply());
    });
});