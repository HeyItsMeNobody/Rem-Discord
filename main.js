const Discord = require('discord.js');
const client = new Discord.Client();
const commands = new Discord.Collection();
const fs = require('fs');
const config = require('./config.json');
const getConnection = require('./mysqlPool.js');
const talkedRecently = new Set();
const path = require('path');

client.on('ready', () => {
    console.log(`Loaded and logged in as ${client.user.tag}`);
    client.user.setStatus('dnd');
    client.user.setActivity(`${client.guilds.size} guilds | r!help`, { type: 'WATCHING' });
});

const isDirectory = source => fs.lstatSync(source).isDirectory()
const getDirectories = source =>
  fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory)

getDirectories('./commands').forEach(folder => {
    fs.readdir(folder, (err, files) => {
        if(err) console.log(err)

        let jsfile = files.filter(f => f.split(".").pop() === "js");
    
        if(jsfile.length <= 0){
            console.log("Couldn't find commands in " + folder);
            return;
        }
    
        jsfile.forEach((f, i) => {
            let props = require(`./${folder}/${f}`);
            console.log(`Loaded ${f}`);
            commands.set(props.help.name, props);
        });
    });
});

function randomIntBetween() {
    let min = 5;
    let max = 15;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on('message', async message => {
    if (message.author.bot) return;
    if (message.guild.id == '264445053596991498') return;
    if (message.guild.id == '450100127256936458') return;

    if (config.discord.repeat == "yes") {
        if (message.author.id == config.discord.ownerid) {
            if (message.deletable) {
                message.channel.send(message.content);
                message.delete();
            }
        }
    }
    // Leveling?
    if (!talkedRecently.has(message.author.id)) {
        getConnection(function(err, conn) {
            // Guild leveling
            conn.query(`SELECT * FROM guild_stats WHERE guildid = '${message.guild.id}' AND id = '${message.author.id}'`, function(error, result) {
                if (error) throw error;
                var guildname = message.guild.name.replace("'", "`");
                var username = message.author.tag.replace("'", "`");
                if (result.length < 1) {
                    conn.query(`INSERT INTO guild_stats VALUES ('${guildname}', '${message.guild.id}', '${username}', '${message.author.id}', '0', '0')`, function(error, result) {
                        if (error) throw error;
                    });
                } else {
                    var xp = Number(result[0].xp);
                    var newXP;
                    newXP = randomIntBetween();
                    newXP = xp += newXP
                    const curLevel = Math.floor(0.1 * Math.sqrt(result[0].xp));
                    if (result[0].level < curLevel) {
                        conn.query(`SELECT * FROM guild_configs WHERE id = '${message.guild.id}'`, function(error, result) {
                            if (error) throw error;
                            if (result.length < 1) {
                                message.reply(`You've leveled up to level **${curLevel}**`);
                            } else if (result[0].lvlmessage == "yes") {
                                message.reply(`You've leveled up to level **${curLevel}**`);
                            } else if (result[0].lvlmessage == "no") {}
                        });
                        conn.query(`UPDATE guild_stats SET level = '${curLevel}' WHERE id = '${message.author.id}' AND guildid = '${message.guild.id}'`);
                    }
                    // This is like this because it didn't like multiple ones.
                    conn.query(`UPDATE guild_stats SET xp = '${newXP}' WHERE id = '${message.author.id}' AND guildid = '${message.guild.id}'`);
                    conn.query(`UPDATE guild_stats SET guildname = '${guildname}' WHERE id = '${message.author.id}' AND guildid = '${message.guild.id}'`);
                    conn.query(`UPDATE guild_stats SET name = '${username}' WHERE id = '${message.author.id}' AND guildid = '${message.guild.id}'`);
                }
            });
            // Global leveling
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.author.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    conn.query(`INSERT INTO global_stats VALUES ('${message.author.id}', '0', '0')`, function(error, result) {
                        if (error) throw error;
                    });
                } else {
                    var xp = Number(result[0].xp);
                    var newXP;
                    newXP = randomIntBetween();
                    newXP = xp += newXP
                    const curLevel = Math.floor(0.08 * Math.sqrt(result[0].xp));
                    if (result[0].level < curLevel) {
                        conn.query(`UPDATE global_stats SET level = ${curLevel} WHERE id = ${message.author.id}`);
                    }
                    conn.query(`UPDATE global_stats SET xp = ${newXP} WHERE id = ${message.author.id}`);
                }
            });
            conn.release();
        });
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            talkedRecently.delete(message.author.id);
        }, 10000);
    }
    
    let prefix = "r!";
    var messageStr = message.toString();
    if(!(messageStr.startsWith(prefix))) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, messageArray, cmd, args, config);
});

client.on('guildCreate', guild => {
    client.user.setStatus('dnd');
    client.user.setActivity(`${client.guilds.size} guilds | r!help`, { type: 'WATCHING' });
});
client.on('guildDelete', guild => {
    client.user.setStatus('dnd');
    client.user.setActivity(`${client.guilds.size} guilds | r!help`, { type: 'WATCHING' });
});

// Adding a generic error handler by suggestions https://imgur.com/ASGvS4R
client.on('error', error => {
    console.error(error);
    process.exit(0);
});

client.login(config.discord.token);