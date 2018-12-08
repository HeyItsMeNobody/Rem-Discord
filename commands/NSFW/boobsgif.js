const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.channel.nsfw) {
        const embed = new Discord.RichEmbed()
        await neko.getNSFWBoobs().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`This isn't a NSFW channel ${message.author.tag}`)
        embed.setColor('#BA55D3');
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "boobsgif"
}