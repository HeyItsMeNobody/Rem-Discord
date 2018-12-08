const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().displayName == message.author.username) {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**You want me to tickle you, ${message.author.username}? Well here i go OWO**`);
            await neko.getSFWTickle().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**${message.mentions.members.first().displayName}** you have been tickled by **${message.author.username}** :broken_heart:`);
            await neko.getSFWTickle().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`**You want me to tickle you, ${message.author.username}? Well here i go OWO**`);
        await neko.getSFWTickle().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    }
}

module.exports.help = {
    name: "tickle"
}