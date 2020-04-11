const assert = require('assert');
const DiceHandler = require('../src/dice.handler.js');


describe('test dice handler', () => {
    [
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
    ].forEach(testCase => {
        it(testCase.desc, () => {
            let diceHandler = new DiceHandler(testCase.message);
            assert(diceHandler.is());
        });
    });

    it('should not be a dice roll', () => {
        let diceHandler = new DiceHandler('marco');
        assert(!diceHandler.is());
    });

    it('should get modifier from message', () => {
        let diceHandler = new DiceHandler('7d3 + 5');
        assert(diceHandler.getModifierFromDiceMessage() === 5);
    });

    it('should throw error for invalid dice message', () => {
        let diceHandler = new DiceHandler('not dice');
        assert.throws(() => {
            diceHandler.getModifierFromDiceMessage();
        }, Error);
    });

    it('should get sides from message', () => {
        let diceHandler = new DiceHandler('7d3 + 5');
        diceHandler.setDiceSidesFromDiceMessage()
        assert(diceHandler.dice.sides === 3);
    });

    it('should throw error for invalid dice message', () => {
        let diceHandler = new DiceHandler('not dice');
        assert.throws(() => {
            diceHandler.getDiceSidesFromDiceMessage();
        }, Error);
    });

    it('should get amount from message', () => {
        let diceHandler = new DiceHandler('7d3 + 5');
        diceHandler.setDiceAmountFromDiceMessage();
        assert(diceHandler.dice.amount === 7);
    });

    it('should throw error for invalid dice message', () => {
        let diceHandler = new DiceHandler('not dice');
        assert.throws(() => {
            diceHandler.setDiceAmountFromDiceMessage();
        }, Error);
    });
});