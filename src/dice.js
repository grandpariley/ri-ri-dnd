class Dice {
    constructor() {
        this.reset();
    }

    reset() {
        this._sides = -1;
        this._amount = 1;
        this._advantage = 0;
    }

    set roll(_) {
        throw new Error('cannot set the value of a roll!');
    }

    get roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    }

    set sides(sides) {
        if (isNaN(sides) || sides < 0) {
            throw new Error('sides cannot be negative or NaN!');
        }
        this._sides = sides;
    }

    get sides() {
        return this._sides;
    }

    set amount(amount) {
        if (isNaN(amount) || amount <= 0) {
            throw new Error('amount cannot be zero, negative or NaN!');
        }
        this._amount = amount;
    }

    get amount() {
        return this._amount;
    }

    set advantage(advantageAsInt) {
        if (isNaN(advantageAsInt)) {
            throw new Error('advantage must be a number!');
        }
        this._advantage = Math.floor(advantageAsInt);
    }

    get advantage() {
        return this._advantage;
    }

    rollAll() {
        return Array.from({ length: this.amount + Math.abs(this.advantage) }, () => this.roll)
                .map(result => this.advantage < 0 ? result *= -1 : result)
                .sort((a, b) => b - a)
                .slice(0, this.amount)
                .map(result => Math.abs(result));
    }
}

module.exports = Dice;