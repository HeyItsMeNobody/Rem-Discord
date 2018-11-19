const Discord = require('discord.js');
const moment = require('moment');
const configName = '../config.json';
const config = require(configName);
const fs = require('fs');

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.author.id == config.discord.ownerid) {
        if (args[0] == "yes") {
            config.discord.repeat = "yes";
            fs.writeFile(configName, JSON.stringify(config, null, 2), function (err) {if (err) return console.log(err);});
            message.channel.send('I will repeat you now uwu');
        } else if (args[0] == "no") {
            config.discord.repeat = "no";
            fs.writeFile(configName, JSON.stringify(config, null, 2), function (err) {if (err) return console.log(err);});
            message.channel.send('I wont repeat you anymore uwu');
        } else {
            message.channel.send('Not a valid argument!');
        }
    }
}

module.exports.help = {
    name: "repeat"
}