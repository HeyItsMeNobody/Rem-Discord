var getConnection = require('../mysqlPool.js');
const Discord = require('discord.js');

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    var Level;
    var GlobalLevel;
    var Title;
    const Embed = new Discord.RichEmbed();
    Embed.setFooter(`uwu`);
    Embed.setColor('F06EA9');
    getConnection(function (err, conn) {
        if (message.mentions.members.first()) {
            //Embed.setTitle(`${message.mentions.members.first().displayName} their profile`);
            Title = `${message.mentions.members.first().displayName} their profile`;
            conn.query(`SELECT * FROM guild_stats WHERE id = '${message.mentions.members.first().id}' AND guildid = '${message.guild.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    //Embed.addField(`Level:`, `N/A`, true);
                    Level = 'N/A';
                } else {
                    //Embed.addField(`Level:`, `${result[0].level} (${result[0].xp}xp)`, true);
                    Level = `${result[0].level} (${result[0].xp}xp)`;
                }
            });
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.mentions.members.first().id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    //Embed.addField(`Global level:`, `N/A`, true);
                    GlobalLevel = 'N/A';
                } else {
                    //Embed.addField(`Global level:`, `${result[0].level} (${result[0].xp}xp)`, true);
                    GlobalLevel = `${result[0].level} (${result[0].xp}xp)`;
                }
            });
            waitForStuff();
        } else {
            //Embed.setTitle(`${message.author.tag} their profile`);
            Title = `${message.author.tag} their profile`;
            conn.query(`SELECT * FROM guild_stats WHERE id = '${message.author.id}' AND guildid = '${message.guild.id}'`, function(error, result) {
                if (error) throw error;
                console.log(result[0]);
                if (result.length < 1) {
                    //Embed.addField(`Level:`, `N/A`, true);
                    Level = 'N/A';
                } else {
                    //Embed.addField(`Level:`, `${result[0].level} (${result[0].xp}xp)`, true);
                    Level = `${result[0].level} (${result[0].xp}xp)`;
                    console.log(result[0])
                }
            });
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.author.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    //Embed.addField(`Global level:`, `N/A`, true);
                    GlobalLevel = 'N/A';
                } else {
                    //Embed.addField(`Global level:`, `${result[0].level} (${result[0].xp}xp)`, true);
                    GlobalLevel = `${result[0].level} (${result[0].xp}xp)`;
                }
            });
            waitForStuff();
        }
        function waitForStuff () {
            if (Title) {
                if (Level) {
                    if (GlobalLevel) {
                        Embed.setTitle(Title)
                        Embed.addField(`Level:`, Level, true);
                        Embed.addField(`Global level`, GlobalLevel, true);
                        message.channel.send(Embed)
                    } else {setTimeout (waitForStuff, 250)}
                } else {setTimeout (waitForStuff, 250)}
            } else {setTimeout (waitForStuff, 250)}
        }
        conn.release();
    });
}

module.exports.help = {
    name: "profile"
}