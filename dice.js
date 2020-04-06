class Dice {
    constructor() {
        this.reset();
    }

    reset() {
        this._sides = -1;
    }

    get roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    }

    set roll(_) {
        throw new Error('cannot set the value of a roll!');
    }

    set sides(sides) {
        if (isNaN(sides) || sides < 0) {
            throw new Error('sides cannot be negative or NaN!')
        }
        this._sides = sides;
    }

    get sides() {
        return this._sides;
    }

    rollManyAndSum(numberOfDice) {
        let sum = 0;
        for (; numberOfDice > 0; numberOfDice--) {
            sum += this.roll;
        }
        return sum;
    }
}

module.exports = Dice;