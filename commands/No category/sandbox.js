const Discord = require('discord.js');
const moment = require('moment');
var consolelog;
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    var argsjoined = args.join(" ");
    const {VM} = require('vm2');
    const vm = new VM({
        sandbox: {
            console: {
                log: function(str) {consolelog = str}
            }
        }
    });
    const embed = new Discord.RichEmbed()
    embed.setTitle('Sandbox');
    embed.setDescription('Everything your command outputted uwu');
    try {
        if (vm.run(argsjoined) == undefined && consolelog == "") {
            // message.channel.send('Undefined');
            embed.addField('Output:', '```Undefined```')
        } else {
            // message.channel.send(`Consolelog: ${consolelog}`);
            embed.addField('Output: (console.log)', `\`\`\`${consolelog}\`\`\``)
        }
    } catch (err) {
        // message.channel.send(err.message);
        embed.addField('Output:', `\`\`\`${err.message}\`\`\``)
    }
    embed.setFooter(`Requested by ${message.author.tag} at ${moment().format('MMM Do Y h:mm:ss a')}`, message.author.avatarURL);
    embed.setColor('#BA55D3');
    message.channel.send(embed);
}

module.exports.help = {
    name: "sandbox"
}