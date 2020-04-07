const assert = require('assert');
const MessageHandler = require('../src/messageHandler.js');

const messageHandler = new MessageHandler();

describe('test message handler', () => {
    describe('test basic crud', () => {
        it('should be empty string from constructor', () => {
            let tempMessageHandler = new MessageHandler();
            assert(tempMessageHandler.message === '');
        });

        it('should set message string', () => {
            messageHandler.message = 'a message';
            assert(messageHandler.message === 'a message');
        });

        it('should set message number', () => {
            messageHandler.message = 42;
            assert(messageHandler.message === '42');
        });

        it('should throw error for non-string/non-numeric message', () => {
            assert.throws(() => {
                messageHandler.message = undefined;
            }, Error);
        });
    });

    describe('test reply (end to end tests)', () => {
        it('test marco/polo', () => {
            messageHandler.message = 'marco';
            assert(messageHandler.reply === 'polo!');
        });

        it('test dice', () => {
            messageHandler.message = '3d1 + 3';
            assert(messageHandler.reply === '6');
        });

        it('test dice no modifier should be 0', () => {
            messageHandler.message = '3d1';
            assert(messageHandler.reply === '3');
        });

        it('test dice no amount should be 1', () => {
            messageHandler.message = 'd1';
            assert(messageHandler.reply === '1');
        });

        it('test oh no should get picture link', () => {
            messageHandler.message = 'ohno';
            assert(process.env.OHNO_URI === messageHandler.reply)
        });
    });

    describe('test marco/polo', () => {
        it('should be marco', () => {
            messageHandler.message = 'marco'
            assert(messageHandler.isMarco());
        });

        it('should be marco case insensitive', () => {
            messageHandler.message = 'maRcO'
            assert(messageHandler.isMarco());
        });

        it('should not be marco', () => {
            messageHandler.message = 'not marko'
            assert(!messageHandler.isMarco());
        });

        it('should be polo', () => {
            assert(messageHandler.getPolo() === 'polo!');
        });
    });

    describe('test dice', () => {
        let isDiceRollTestCases = [
            {
                desc: 'should be dice roll with modifier',
                message: '3d6 + 4'
            },
            {
                desc: 'should be dice roll with negative modifier',
                message: '3d6 - 4'
            },
            {
                desc: 'should be dice roll with modifier and any number of digits',
                message: '30d65 + 432'
            },
            {
                desc: 'should be dice roll without modifier',
                message: '5d4'
            },
            {
                desc: 'should be dice roll with random spaces',
                message: '5 d 4  - 456  '
            },
        ];

        isDiceRollTestCases.forEach(testCase => {
            it(testCase.desc, () => {
                messageHandler.message = testCase.message;
                assert(messageHandler.isDiceRoll());
            });
        });

        it('should not be a dice roll', () => {
            messageHandler.message = 'marco';
            assert(!messageHandler.isDiceRoll());
        });

        it('should get modifier from message', () => {
            messageHandler.message = '7d3 + 5';
            assert(messageHandler.getModifierFromDiceMessage() === 5);
        });

        it('should throw error for invalid dice message', () => {
            messageHandler.message = 'not dice';
            assert.throws(() => {
                messageHandler.getModifierFromDiceMessage();
            }, Error);
        });

        it('should get sides from message', () => {
            messageHandler.message = '7d3 + 5';
            messageHandler.setDiceSidesFromDiceMessage()
            assert(messageHandler.dice.sides === 3);
        });

        it('should throw error for invalid dice message', () => {
            messageHandler.message = 'not dice';
            assert.throws(() => {
                messageHandler.getDiceSidesFromDiceMessage();
            }, Error);
        });

        it('should get amount from message', () => {
            messageHandler.message = '7d3 + 5';
            messageHandler.setDiceAmountFromDiceMessage()
            assert(messageHandler.dice.amount === 7);
        });

        it('should throw error for invalid dice message', () => {
            messageHandler.message = 'not dice';
            assert.throws(() => {
                messageHandler.setDiceAmountFromDiceMessage();
            }, Error);
        });
    });

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
                messageHandler.message = msg.message;
                assert(messageHandler.isOhNo);
            });
        });

        it('should not be oh no', () => {
            messageHandler.message = 'froot loops';
            assert(!messageHandler.isOhNo());
        });

        it('should get oh no picture uri', () => {
            assert(process.env.OHNO_URI === messageHandler.getOhNoPicture())
        });


    });
});

