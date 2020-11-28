XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class SummaryHandler {
    constructor(message) {
        this.message = message;
        this._reply = ''
    }
    
    isAndSetSummary() {
        let msgArray = this.message.split(' ');
        this._reply = this.getRandomSummaryHelper(msgArray[Math.floor(Math.random() * msgArray.length)]);
        return !!this._reply;
    }

    getRandomSummaryHelper(seed) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.duckduckgo.com/?format=json&pretty=1&q=' + seed, false);
        xhr.send();
        let ddgResponse = JSON.parse(xhr.responseText);
        if (ddgResponse.AbstractText) {
            return ddgResponse.AbstractText;
        } 
        if (ddgResponse.RelatedTopics && ddgResponse.RelatedTopics.length > 0) {
            let newSeedArray = ddgResponse.RelatedTopics[0].FirstURL.split("/");
            let newSeed = newSeedArray[newSeedArray.length - 1].replace('_', ' ')
            return this.getRandomSummaryHelper(newSeed)
        }
        return undefined;
    }

    is() {
        return Math.random() < 0.2 && this.isAndSetSummary();
    }

    reply() {
        return this._reply;
    }
}

module.exports = SummaryHandler;