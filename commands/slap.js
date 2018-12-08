const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().displayName == message.author.username) {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**I-I can't slap you ${message.author.username}! Let me hug you instead.. >.<**`);
            await neko.getSFWHug().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**${message.mentions.members.first().displayName}** you have been slapped by **${message.author.username}** :broken_heart:`);
            await neko.getSFWSlap().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`**I-I can't slap you ${message.author.username}! Let me hug you instead.. >.<**`);
        await neko.getSFWHug().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    }
}

module.exports.help = {
    name: "slap"
}