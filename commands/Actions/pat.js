const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.mentions.members.first()) {
        if (message.mentions.members.first().displayName == message.author.username) {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**Aww, I see you are lonely ${message.author.username}, Take a pat? owo**`);
            await neko.getSFWPat().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        } else {
            const embed = new Discord.RichEmbed()
            embed.setTitle(`**${message.mentions.members.first().displayName}** you have been pat by **${message.author.username}** :heart:`);
            await neko.getSFWPat().then((image) => embed.setImage(image.url));
            embed.setColor('#BA55D3');
            await message.channel.send(embed);
        }
    } else {
        const embed = new Discord.RichEmbed()
        embed.setTitle(`**Aww, I see you are lonely ${message.author.username}, Take a pat? owo**`);
        await neko.getSFWPat().then((image) => embed.setImage(image.url));
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    }
}

module.exports.help = {
    name: "pat"
}