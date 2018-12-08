const Discord = require('discord.js');
const { exec } = require('child_process');
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    // Oh btw, Thanks raven for the idea
    if (message.author.id == config.discord.ownerid) {
        message.channel.send('Restarting..');
        process.exit(0);
    }
}

module.exports.help = {
    name: "restart"
}