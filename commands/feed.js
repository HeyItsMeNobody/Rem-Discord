const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().displayName == message.author.username) {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**O-Oh? You want me to feed you ${message.author.username}?** >//<`);
            await neko.getSFWFeed().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**${message.mentions.members.first().displayName}** you have been fed by **${message.author.username}** :heart:`);
            await neko.getSFWFeed().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`**O-Oh? You want me to feed you ${message.author.username}?** >//<`);
        await neko.getSFWFeed().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    }
}

module.exports.help = {
    name: "feed"
}