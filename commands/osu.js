const config = require('../config.json');
const osu = require('node-osu');
const Discord = require('discord.js');
var osuApi = new osu.Api(config.osu.apiKey, {notFoundAsError: false});

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    const initEmbed = new Discord.RichEmbed();
    initEmbed.setTitle('Select osu! gamemode');
    initEmbed.setDescription('[1] Standard');
    initEmbed.setFooter(`Type 'exit' to leave the menu`);
    initEmbed.setThumbnail('http://nobody.life/images/osuicon.png');
    initEmbed.setColor('F06EA9');
    message.channel.send(initEmbed)
    const initCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
    initCollector.on('collect', message => {
        if (message.content == "1") {
            const oneEmbed = new Discord.RichEmbed();
            oneEmbed.setTitle('Select the info you wish to view');
            oneEmbed.setDescription('[1] User profiles');
            oneEmbed.setFooter(`Type 'exit' to leave the menu`);
            oneEmbed.setThumbnail('http://nobody.life/images/osuicon.png');
            oneEmbed.setColor('F06EA9');
            message.channel.send(oneEmbed);
            const oneCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
            oneCollector.on('collect', message => {
                if (message.content == "1") {
                    message.channel.send('***Enter the username of the player please.***');
                    const userprofileCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                    userprofileCollector.on('collect', message => {
                        osuApi.getUser({u: message.content}).then(user => {
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
                            } else return message.channel.send(`Didn't find a user with the name ${message.content}`)
                        });
                        userprofileCollector.stop();
                    });
                    oneCollector.stop();
                } else if (message.content == "exit") return message.channel.send('Exited the menu!'); oneCollector.stop();
            });
            initCollector.stop();
        } else if (message.content == "exit") return message.channel.send('Exited the menu!'); initCollector.stop();
    });
}

module.exports.help = {
    name: "osu"
}