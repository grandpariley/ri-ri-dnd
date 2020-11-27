const assert = require('assert');
const VroomHandler = require('../src/vroom.handler.js');

describe('test vroom', () => {
    [
        {
            msg: 'vroom',
            desc: 'should be vroom'
        },
        {
            msg: 'vROOm',
            desc: 'should be vroom case insensitive'
        }
    ].forEach(testCase => {
        it(testCase.desc, () => {
            let vroomHandler = new VroomHandler(testCase.msg);
            assert(vroomHandler.is());
        });
    });

    it('should not be vroom', () => {
        let vroomHandler = new VroomHandler('not vr00m');
        assert(!vroomHandler.is());
    });

    it('should be all hail', () => {
        let vroomHandler = new VroomHandler('');
        assert(vroomHandler.reply() === 'ALL HAIL THE COOLEST GUY ON DISCORD');
    });
});