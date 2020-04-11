const assert = require('assert');
const MarcoPoloHandler = require('../src/marcoPolo.handler.js');

describe('test marco/polo', () => {
    [
        {
            msg: 'marco',
            desc: 'should be marco'
        },
        {
            msg: 'maRcO',
            desc: 'should be marco case insensitive'
        }
    ].forEach(testCase => {
        it('should be marco', () => {
            let marcoPoloHandler = new MarcoPoloHandler(testCase.msg);
            assert(marcoPoloHandler.isMarco());
        });
    });

    it('should not be marco', () => {
        let marcoPoloHandler = new MarcoPoloHandler('not marko');
        assert(!marcoPoloHandler.isMarco());
    });

    it('should be polo', () => {
        let marcoPoloHandler = new MarcoPoloHandler('');
        assert(marcoPoloHandler.getPolo() === 'polo!');
    });
});