const Discord = require('discord.js');
const nekoclient = require('nekos.life');
const neko = new nekoclient();
module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (!args.length == 0) {
        owostring = args.join(" ");
        let owo = await neko.getSFWOwOify({text: `${owostring}`});
        const embed = new Discord.RichEmbed()
        embed.setTitle(`OwOified text:`)
        await embed.setDescription(owo.owo);
        embed.setColor('#BA55D3');
        await message.channel.send(embed);
    } else {
        message.channel.send(`You didn't give me any text to owoify <@${message.author.id}>!`)
    }
}

module.exports.help = {
    name: "owo"
}