module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (message.author.id == config.discord.ownerid) {
        if (args[0] == "yes") {
            config.discord.repeat = "yes";
            message.channel.send('I will repeat you now uwu');
        } else if (args[0] == "no") {
            config.discord.repeat = "no";
            message.channel.send('I wont repeat you anymore uwu');
        } else {
            message.channel.send('Not a valid argument!');
        }
    }
}

module.exports.help = {
    name: "repeat"
}