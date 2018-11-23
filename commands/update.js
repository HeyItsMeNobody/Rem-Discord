const Discord = require('discord.js');
const { exec } = require('child_process');
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.author.id == config.discord.ownerid) {
        if (client.user.id == "508670321835114506") {
            const embed = new Discord.RichEmbed()
            embed.setTitle('Output');
            embed.setColor('#BA55D3');
            exec('git pull origin master', (error, stdout, stderr) => {
                if (error) return embed.setDescription('```' + error + '```');
                else embed.setDescription('```Stdout: ' + stdout + ' stderr: ' + stderr + '```');
            });
            message.channel.send(embed);
        } else {
            message.channel.send('The update command can only be run on the actual bot');
        }
    }
}

module.exports.help = {
    name: "update"
}