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
                        embed.setTitle(`Osu! Userinfo`);
                        embed.addField(`Username:`, user.name, true);
                        embed.addField(`Id:`, user.id, true);
                        if (user.country) {
                            embed.addField(`Country:`, user.country, true);
                        }
                        embed.addField(`Accuracy:`, user.accuracy, true);
                        embed.addField(`Level:`, user.level, true);
                        embed.addField(`pp:`, user.pp.raw, true);
                        embed.addField(`Rank:`, `#${user.pp.rank}`, true);
                        embed.addField(`Country Rank:`, `#${user.pp.countryRank}`, true)
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