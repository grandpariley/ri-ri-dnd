require('dotenv').config();
const Dice = require('./dice.js');
const MessageUtils = require('./messageUtils.js');
const Discord = require('discord.js');

const client = new Discord.Client();
const dice = new Dice();
const messageUtils = new MessageUtils();
console.log(client)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    messageUtils.message = msg.content;
    if (messageUtils.isMarco()) {
        msg.reply(messageUtils.getPolo());
        return;
    }

    if (messageUtils.isDiceRoll()) {
        dice.sides = messageUtils.getDiceSidesFromDiceMessage();
        let diceResult = dice.rollManyAndSum(messageUtils.getDiceAmountFromDiceMessage())
            + messageUtils.getDiceModifierFromDiceMessage();
        msg.reply(diceResult);
        return;
    }

});

client.login(process.env.TOKEN);