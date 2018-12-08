const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().displayName == message.author.username) {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**O-Oh? You want me to poke you ${message.author.username}?** *boop*`);
            await neko.getSFWPoke().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**${message.mentions.members.first().displayName}** you have been poked by **${message.author.username}** :broken_heart:`);
            await neko.getSFWPoke().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`**O-Oh? You want me to poke you ${message.author.username}?** *boop*`);
        await neko.getSFWPoke().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    }
}

module.exports.help = {
    name: "poke"
}