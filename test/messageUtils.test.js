const assert = require('assert');
const MessageUtils = require('../messageUtils.js');

const messageUtils = new MessageUtils();

describe('test messageUtils', () => {
    describe('test basic crud', () => {
        it('should be empty string from constructor', () => {
            let tempMessageUtils = new MessageUtils();
            assert(tempMessageUtils.message === '');
        });

        it('should set message string', () => {
            messageUtils.message = 'a message';
            assert(messageUtils.message === 'a message');
        });

        it('should set message number', () => {
            messageUtils.message = 42;
            assert(messageUtils.message === '42');
        });

        it('should throw error for non-string/non-numeric message', () => {
            assert.throws(() => {
                messageUtils.message = undefined;
            }, Error);
        });
    });

    describe('test marco/polo', () => {
        it('should be marco', () => {
            messageUtils.message = 'marco'
            assert(messageUtils.isMarco());
        });

        it('should be marco case insensitive', () => {
            messageUtils.message = 'maRcO'
            assert(messageUtils.isMarco());
        });

        it('should not be marco', () => {
            messageUtils.message = 'not marko'
            assert(!messageUtils.isMarco());
        });

        it('should be polo', () => {
            assert(messageUtils.getPolo() === 'polo!');
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
                messageUtils.message = testCase.message;
                assert(messageUtils.isDiceRoll());
            });
        });

        it('should not be a dice roll', () => {
            messageUtils.message = 'marco';
            assert(!messageUtils.isDiceRoll());
        });

        it('should get modifier from message', () => {
            messageUtils.message = '7d3 + 5';
            assert(messageUtils.getModifierFromDiceMessage() === 5);
        });

        it('should throw error for invalid dice message', () => {
            messageUtils.message = 'not dice';
            assert.throws(() => { 
                messageUtils.getModifierFromDiceMessage(); 
            }, Error);
        });
        
        it('should get sides from message', () => {
            messageUtils.message = '7d3 + 5';
            assert(messageUtils.getDiceSidesFromDiceMessage() === 3);
        });

        it('should throw error for invalid dice message', () => {
            messageUtils.message = 'not dice';
            assert.throws(() => { 
                messageUtils.getDiceSidesFromDiceMessage(); 
            }, Error);
        });
        
        it('should get amount from message', () => {
            messageUtils.message = '7d3 + 5';
            assert(messageUtils.getDiceAmountFromDiceMessage() === 7);
        });

        it('should throw error for invalid dice message', () => {
            messageUtils.message = 'not dice';
            assert.throws(() => { 
                messageUtils.getDiceAmountFromDiceMessage(); 
            }, Error);
        });
    });
});

