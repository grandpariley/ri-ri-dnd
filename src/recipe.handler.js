require('dotenv').config();
XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class RecipeHandler {

    constructor(message) {
        this.message = message;
        this._reply = ''
    }

    isAndSetRecipe() {
        let msgArray = this.message.split(' ');
        this._reply = this.getRandomRecipeHelper(msgArray[Math.floor(Math.random() * msgArray.length)]);
        return !!this._reply;
    }

    getRandomRecipeHelper(seed) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spoonacular.com/food/ingredients/search?query=' + seed + '&apiKey=' + process.env.SPOONACULAR, false);
        xhr.send();
        let spoonacularResponse = JSON.parse(xhr.responseText);
        if (spoonacularResponse && spoonacularResponse.results.length > 0) {
            return this.parseSpoonacular(spoonacularResponse.results);
        }
        return undefined;
    }

    parseSpoonacular(results) {
        let recipeId = results[Math.floor(Math.random() * results.length)].id;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.spoonacular.com/recipes/' + recipeId + '/information?includeNutrition=false&apiKey=' + process.env.SPOONACULAR, false);
        xhr.send();
        let recipeResponse = JSON.parse(xhr.responseText);
        if (!recipeResponse || recipeResponse.status === 'failure') {
            return undefined;
        }
        let resp = recipeResponse.title + '\nIngredients:\n';
        recipeResponse.extendedIngredients.forEach(ingredient => {
            resp += ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + '\n';
        });
        let instructions = recipeResponse.instructions ? recipeResponse.instructions : recipeResponse.summary;
        if (instructions.startsWith('Instructions')) {
            instructions = instructions.slice(0, 'Instructions'.length) + '\n' + instructions.slice('Instructions'.length)
        }
        resp += instructions;
        return resp
    }  

    is() {
        // return Math.random() < 0.2 && this.isAndSetChitChat();
        return this.isAndSetRecipe()
    }

    reply() {
        return this._reply;
    }
}

module.exports = RecipeHandler;