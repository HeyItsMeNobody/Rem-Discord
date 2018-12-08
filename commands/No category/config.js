var getConnection = require('../../mysqlPool.js');
const Discord = require('discord.js');

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
        getConnection(function(err, conn) {
            conn.query(`SELECT * FROM guild_configs WHERE id = '${message.guild.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    conn.query(`INSERT INTO guild_configs VALUES ('${message.guild.id}', 'yes')`, function(error, result) {
                        if (error) throw error;
                        conn.query(`SELECT * FROM guild_configs WHERE id = '${message.guild.id}'`, function(error, result) {
                            if (error) throw error;
                            return doEverything(result);
                        });
                    });
                    return;
                } else {
                    doEverything(result);
                }
            });
            conn.release();
        });
        function doEverything (result) {
            getConnection(function(err, conn) {
                const initEmbed = new Discord.RichEmbed();
                initEmbed.setTitle('Guild config');
                initEmbed.setDescription('Choose a setting you want to edit.\n[1] Level messages');
                initEmbed.setFooter(`Type 'exit' to leave the menu`);
                initEmbed.setColor('F06EA9');
                message.channel.send(initEmbed)
                const initCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                initCollector.on('collect', message => {
                    if (message.content == '1') {
                        const lvlmessageEmbed = new Discord.RichEmbed();
                        lvlmessageEmbed.setTitle('Editing: Level message');
                        if (result[0].lvlmessage == "yes") {
                            lvlmessageEmbed.setDescription('Turn level up message off in this guild?\n[1] Yes\n[2] No');
                        } else {
                            lvlmessageEmbed.setDescription('Turn level up message on in this guild?\n[1] Yes\n[2] No');
                        }
                        lvlmessageEmbed.setFooter(`Type 'exit' to leave the menu`);
                        lvlmessageEmbed.setColor('F06EA9');
                        message.channel.send(lvlmessageEmbed);
                        const lvlmessageCollector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 60000 });
                        lvlmessageCollector.on('collect', message => {
                            if (message.content == "1") {
                                if (result[0].lvlmessage == "yes") {
                                    conn.query(`UPDATE guild_configs SET lvlmessage = 'no' WHERE id = ${result[0].id}`, function(error, result){
                                        if (error) throw error; else {
                                            message.channel.send(`I will no longer send level up messages uwu`);
                                        }
                                    });
                                } else {
                                    conn.query(`UPDATE guild_configs SET lvlmessage = 'yes' WHERE id = ${result[0].id}`, function(error, result){
                                        if (error) throw error; else {
                                            message.channel.send(`I will now send level up messages again uwu`);
                                        }
                                    });
                                }
                                lvlmessageCollector.stop();
                            } else if (message.content == "2") {
                                if (result[0].lvlmessage == "yes") {
                                    conn.query(`UPDATE guild_configs SET lvlmessage = 'yes' WHERE id = ${result[0].id}`, function(error, result){
                                        if (error) throw error; else {
                                            message.channel.send(`I will now send level up messages again uwu`);
                                        }
                                    });
                                } else {
                                    conn.query(`UPDATE guild_configs SET lvlmessage = 'no' WHERE id = ${result[0].id}`, function(error, result){
                                        if (error) throw error; else {
                                            message.channel.send(`I will no longer send level up messages uwu`);
                                        }
                                    });
                                }
                                lvlmessageCollector.stop();
                            } else if (message.content == "exit") return message.channel.send('Exited the menu!'); lvlmessageCollector.stop();
                        });
                        initCollector.stop();
                    } else if (message.content == "exit") return message.channel.send('Exited the menu!'); initCollector.stop();
                });
                conn.release();
            });
        }
    } else {
        message.reply(`You aren't a server admin!`);
    }
}

module.exports.help = {
    name: "config"
}