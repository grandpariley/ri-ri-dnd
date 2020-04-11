const assert = require('assert');
const MessageHandler = require('../src/message.handler.js');

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
        ].forEach(testCase => {
            it(testCase.desc, () => {
                let messageHandler = new MessageHandler(testCase.msg);
                assert(messageHandler.reply === testCase.exp);
            });
        });
    });
});

