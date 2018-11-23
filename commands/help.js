const Discord = require('discord.js');
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    const embed = new Discord.RichEmbed()
    embed.setTitle('Help page');
    embed.setDescription('You can find the help page [here](http://rem.nobody.life/commands.html)');
    embed.setColor('#BA55D3');
    message.channel.send(embed);
}

module.exports.help = {
    name: "help"
}