require('dotenv').config();
const MessageHandler = require('./src/messageHandler.js');
const Discord = require('discord.js');

const client = new Discord.Client();
console.log(client)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if (msg.author.bot || !msg.guild) {
        return;
    }
    let messageHandler = new MessageHandler(msg.content);
    let reply = messageHandler.reply;
    if (reply) {
        msg.reply(reply);
    }
});

client.login(process.env.TOKEN);