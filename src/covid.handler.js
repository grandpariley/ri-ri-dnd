const covidRegEx = /covid/i;
const coronavirusRegEx = /corona/i;
const pandemicRegEx = /pandemic/i;



class CovidHandler {
    constructor(message) {
        this.message = message;
        this.replyOptions = [
            'it who must not be named',
            'Friendly reminder to socially distance this server from that virus!',
            'Friendly reminder to use `|| coronavirus stuff ||` when talking about the current global pandemic',
            'That virus is an appalling dump heap overflowing with the most disgraceful assortment of rubbish imaginable mangled up in tangled up knots',
            'Of all the bete, clumsy, blundering, boggling, baboon-blooded stuff I ever saw ..., that [virus] beat ... all the affected, sapless, soulless, beginningless, endless, topless, bottomless, topsyturviest, tuneless, scrannelpipiest--tongs and boniest--doggerel of viruses I ever endured the deadliness of, that eternity of nothing was the deadliest.',
            "Curse the blasted, jelly-boned swines, the slimy, the belly-wriggling invertebrates, the miserable soddingrotters, the flaming sods, the sniveling, dribbling, dithering, palsied, pulse-less lot that make up [that virus] today. [Its] got white of egg in [its] veins, and [its] spunk is that watery it's a marvel [it] can breed."
        ];
    }

    is() {
        return !!covidRegEx.exec(this.message) 
            || !!coronavirusRegEx.exec(this.message) 
            || !!pandemicRegEx.exec(this.message);
    }

    reply() {
        return this.replyOptions[Math.floor(Math.random() * this.replyOptions.length)];
    }
    
}

module.exports = CovidHandler;