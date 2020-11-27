const assert = require('assert');
const SeriousHandler = require('../src/serious.handler.js');

describe('test seriously adam', () => {
    [
        {
            msg: 'serious',
            desc: 'should be serious'
        },
        {
            msg: 'sEriOus',
            desc: 'should be serious case insensitive'
        }
    ].forEach(testCase => {
        it(testCase.desc, () => {
            let seriousHandler = new SeriousHandler(testCase.msg);
            assert(seriousHandler.is());
        });
    });

    it('should not be serious', () => {
        let seriousHandler = new SeriousHandler('not surius');
        assert(!seriousHandler.is());
    });

    it('should be seriously adam', () => {
        let seriousHandler = new SeriousHandler('');
        assert(seriousHandler.reply() === '~ s e r i o u s l y ADAM!');
    });
});