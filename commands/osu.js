const config = require('../config.json');
const osu = require('node-osu');
const Discord = require('discord.js');
var osuApi = new osu.Api(config.osu.apiKey, {notFoundAsError: false});

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (args[0]) {
        if (args[0] == "user") {
            if (args[1]) {
                osuApi.getUser({u: args[1]}).then(user => {
                    if (user.length == undefined) {
                        const embed = new Discord.RichEmbed()
                        embed.setTitle(`**Osu! profile for ${user.name}**`);
                        embed.setDescription(`300s: ${user.counts['300']} | 100s: ${user.counts['100']} | 50s: ${user.counts['50']}\nSS: ${user.counts.SS} | S: ${user.counts.S} | A: ${user.counts.A}`);
                        if (user.country) embed.addField(`User`, `${user.name} (${user.country})`, true);
                        else embed.addField(`User`, `${user.name}`, true);
                        embed.addField(`Play Count | Level`, `${user.counts.plays} | ${parseFloat(user.level).toFixed(2)}`, true);
                        embed.addField(`Ranked | Total scores`, `${user.scores.ranked} | ${user.scores.total}`, true);
                        if (user.country) embed.addField(`Rank | Country rank`, `${user.pp.rank} | ${user.pp.countryRank}`, true);
                        else embed.addField(`Rank`, `${user.pp.rank}`, true);
                        embed.addField(`PP | Accuracy`, `${parseFloat(user.pp.raw).toFixed()} | ${parseFloat(user.accuracy).toFixed(2)}%`, true);
                        embed.addField(`Profile url`, `[Here](https://osu.ppy.sh/users/${user.id})`, true);
                        embed.setThumbnail('http://nobody.life/images/osuicon.png');
                        embed.setColor('F06EA9');
                        message.channel.send(embed);
                    } else return message.channel.send(`Didn't find a user with the name ${args[1]}`)
                });
            } else return message.channel.send(`You didn't give me a user to search owo`);
        } else return message.channel.send('Not a valid argument uwu');
    } else return message.channel.send('You gave no arguments uwu');
}

module.exports.help = {
    name: "osu"
}