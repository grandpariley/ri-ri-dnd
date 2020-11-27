const assert = require('assert');
const CovidHandler = require('../src/covid.handler.js');

describe('test covid', () => {
    [
        {
            msg: 'covid',
            desc: 'should be covid'
        },
        {
            msg: 'CovId',
            desc: 'should be covid case insensitive'
        },
        {
            msg: 'corona',
            desc: 'should be coronavirus'
        },
        {
            msg: 'coRonaVirus',
            desc: 'should be coronavirus case insensitive'
        },
        {
            msg: 'pandemic',
            desc: 'should be pandemic'
        },
        {
            msg: 'paNDEmic',
            desc: 'should be pandemic case insensitive'
        },

    ].forEach(testCase => {
        it(testCase.desc, () => {
            let covidHandler = new CovidHandler(testCase.msg);
            assert(covidHandler.is());
        });
    });

    it('should not be covid', () => {
        let covidHandler = new CovidHandler('not covud, curuna, or pandumbic');
        assert(!covidHandler.is());
    });

    it('should be valid reply', () => {
        let covidHandler = new CovidHandler('');
        assert(covidHandler.replyOptions.includes(covidHandler.reply()) >= 0);
    });
});