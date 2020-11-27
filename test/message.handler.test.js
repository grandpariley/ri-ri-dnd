const assert = require('assert');
const MessageHandler = require('../src/message.handler.js');
const CovidHandler = require('../src/covid.handler.js')

describe('test message handler', () => {
    describe('test basic crud', () => {
        it('should set message string', () => {
            let messageHandler = new MessageHandler('a message');
            assert(messageHandler.message === 'a message');
        });

        it('should set message number', () => {
            let messageHandler = new MessageHandler(42);
            assert(messageHandler.message === '42');
        });

        it('should throw error for non-string/non-numeric message', () => {
            assert.throws(() => {
                let messageHandler = new MessageHandler(undefined);
            }, Error);
        });
    });

    describe('test reply (end to end tests)', () => {
        [
            {
                msg: 'marco',
                exp: 'polo!',
                desc: 'test marco/polo'
            },
            {
                msg: '3d1 + 3',
                exp: '\nresults: 1,1,1\ntotal: 6',
                desc: 'test dice'
            },
            {
                msg: '3d1',
                exp: '\nresults: 1,1,1\ntotal: 3',
                desc: 'test dice no modifier should be 0'
            },
            {
                msg: 'd1',
                exp: '\nresults: 1\ntotal: 1',
                desc: 'test dice no amount should be 1'
            },
            {
                msg: 'ohno',
                exp: process.env.OHNO_URI,
                desc: 'test oh no should get picture link'
            },
            {
                msg: 'vroom',
                exp: 'ALL HAIL THE COOLEST GUY ON DISCORD',
                desc: 'test vroom should get message'
            },
            {
                msg: 'serious',
                exp: '~ s e r i o u s l y ADAM!',
                desc: 'test serious should get message'
            },
            {
                msg: 'hope',
                exp: '\n“Hope” is the thing with feathers -\n' +
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
                'It asked a crumb - of me.',
                desc: 'test hope should get poem'
            },
        ].forEach(testCase => {
            it(testCase.desc, () => {
                let messageHandler = new MessageHandler(testCase.msg);
                assert(messageHandler.reply === testCase.exp);
            });
        });
        it('test covid', () => {
            let messageHandler = new MessageHandler('covid');
            assert(new CovidHandler('').replyOptions.includes(messageHandler.reply) >= 0);
        })
    });
});

