require('dotenv').config();
import { Client } from 'discord.js';
import { Dice } from './dice'
import { MessageUtils } from './messageUtils'

const client = new Client();
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