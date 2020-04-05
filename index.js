const Discord = require('discord.js');
const client = new Discord.Client();
console.log(client)

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content === 'marco') {
        msg.reply('polo');
    }
});

client.login('token');