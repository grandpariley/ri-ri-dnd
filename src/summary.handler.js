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
        console.log(seed)
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.duckduckgo.com/?format=json&pretty=1&q=' + seed, false);
        xhr.send();
        let ddgResponse = JSON.parse(xhr.responseText);
        console.log(ddgResponse)
        if (ddgResponse.AbstractText) {
            return ddgResponse.AbstractText;
        } 
        if (ddgResponse.RelatedTopics && ddgResponse.RelatedTopics > 0) {
            let newSeedArray = ddgResponse.RelatedTopics[0].FirstURL.split("/");
            return this.getRandomSummaryHelper(newSeedArray[newSeedArray.length - 1])
        }
        return undefined;
    }

    is() {
        // return Math.random() < 0.2 && this.isAndSetSummary();
        return this.isAndSetSummary()
    }

    reply() {
        return this._reply;
    }
}

module.exports = SummaryHandler;