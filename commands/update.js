const Discord = require('discord.js');
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.author.id == config.discord.ownerid) {
        if (!client.user.tag == "Rem#0947") return message.channel.send('You can only use the update command on the main bot!'); 
        else {
            const simpleGit = require('simple-git');
            try {
                simpleGit().pull('origin', 'master');
                message.channel.send('Updated');
            } catch (err) {
                message.channel.send(err.name);
            }
        }
    }
}

module.exports.help = {
    name: "update"
}