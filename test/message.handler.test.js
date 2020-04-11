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
        it('test marco/polo', () => {
            let messageHandler = new MessageHandler('marco');
            assert(messageHandler.reply === 'polo!');
        });

        it('test dice', () => {
            let messageHandler = new MessageHandler('3d1 + 3');
            assert(messageHandler.reply === '6');
        });

        it('test dice no modifier should be 0', () => {
            let messageHandler = new MessageHandler('3d1');
            assert(messageHandler.reply === '3');
        });

        it('test dice no amount should be 1', () => {
            let messageHandler = new MessageHandler('d1');
            assert(messageHandler.reply === '1');
        });

        it('test oh no should get picture link', () => {
            let messageHandler = new MessageHandler('ohno');
            assert(process.env.OHNO_URI === messageHandler.reply)
        });
        const messageHandler = new MessageHandler('');
    });
});

