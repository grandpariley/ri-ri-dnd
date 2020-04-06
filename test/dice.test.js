const assert = require('assert');
const Dice = require('../src/dice.js');

const dice = new Dice();

const SEVEN = 7;
const FIVE = 5;
const ONE = 1;
const ZERO = 0;
const NEG_ONE = -1;

describe('test dice', () => {
    describe('test reset', () => {
        it('should reset to -1', () => {
            dice.reset();
            assert(dice.sides === NEG_ONE);
        });
    });

    describe('test set sides', () => {
        it('should set sides', () => {
            dice.sides = SEVEN;
            assert(dice.sides === SEVEN);
        });

        it('should blow up for negative number', () => {
            assert.throws(() => {
                dice.sides = NEG_ONE;
            }, Error);
        });

        it('should blow up for NaN', () => {
            assert.throws(() => {
                dice.sides = 'cheerios';
            }, Error);
        });
    });

    describe('test roll', () => {
        it('should be between 1 and 7 inclusive', () => {
            dice.sides = SEVEN;
            dice.amount = ONE;
            let roll = dice.roll;
            assert(roll >= ONE);
            assert(roll <= SEVEN);
        });

        it('should blow up for trying to set a roll', () => {
            assert.throws(() => {
                dice.roll = SEVEN;
            }, Error);
        });
    });

    describe('test rollAllAndSum', () => {
        it('should roll several dice and return the sum', () => {
            dice.sides = SEVEN;
            dice.amount = FIVE;
            let sum = dice.rollAllAndSum();
            assert(sum > FIVE);
            assert(sum <= FIVE * SEVEN);
        });

        it('should return 0 for zero', () => {
            dice.amount = ZERO;
            let sum = dice.rollAllAndSum();
            assert(sum === ZERO);
        });
    });
});

