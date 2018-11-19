const Discord = require('discord.js');
const client = new Discord.Client();
const commands = new Discord.Collection();
const fs = require('fs');
const config = require('./config.json');

client.on('ready', () => {
    console.log(`Loaded and logged in as ${client.user.tag}`);
});

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Couldn't find commands?..");
        return;
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`Loaded ${f}`);
        commands.set(props);
    });
});

client.on('message', async message => {
    if (message.author.bot) return;

    let prefix = "r!";
    var messageStr = message.toString();
    if(!(messageStr.startsWith(prefix))) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, messageArray, cmd, args);
});

client.login(config.discord.token);