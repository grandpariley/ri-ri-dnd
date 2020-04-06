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
            throw new Error('sides cannot be negative or NaN!')
        }
        this._sides = sides;
    }

    get sides() {
        return this._sides;
    }

    set amount(amount) {
        if (isNaN(amount) || amount < 0) {
            throw new Error('amount cannot be negative or NaN!')
        }
        this._amount = amount;
    }

    get amount() {
        return this._amount;
    }

    set advantage(advantageAsInt) {
        if (isNaN(advantageAsInt) || this.amount !== 1 || ![-1, 0, 1].includes(advantageAsInt)) {
            throw new Error('advantage can only happen with one die!')
        }
        this._advantage = advantageAsInt;
    }

    get advantage() {
        return this._advantage;
    }

    rollAllAndSum() {
        if (this.advantage !== 0) {
            let result = [];
            for (let i = 0; i < this.amount + Math.abs(this.advantage); i++) {
                result.push(this.roll);
            }
            let maxMin;
            result.forEach(result => {
                result *= this.advantage;
                if (!maxMin || result > maxMin) {
                    maxMin = result;
                }
            });
            return Math.abs(maxMin);
        }
        let sum = 0;
        for (let i = 0; i < this.amount; i++) {
            sum += this.roll;
        }
        return sum;
    }
}

module.exports = Dice;