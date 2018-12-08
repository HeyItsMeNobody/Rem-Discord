module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    if (args[0] == "channel") {
        if (!message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.send(`You don't have the administrator permission`);
            return;
        } else {
            try {
                var sendMessage = args.splice(2).join(" ");
                if (args[1] == undefined) {
                    return message.channel.send(`You didn't give me a channel id to send the message to!`);
                } else if (sendMessage == "") {
                    return message.channel.send(`You didn't give me anything to send to <#${args[1]}>!`);
                } else {
                    message.guild.channels.get(`${args[1]}`).send(sendMessage);
                    message.delete().catch(O_o=>{});
                    return;
                }
            } catch (err) {
                return message.channel.send(`Something went wrong, Did you double check the channel id?`);
            }
        }
        return;
    } 
    const sayMessage = args.join(" ");
    sayMessageFiltered = sayMessage.replace('@', '');
    if (sayMessageFiltered === "") {
        message.channel.send("You didn't give me anything to say uwu")
        return;
    } else {
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessageFiltered);
        return;
    }
}

module.exports.help = {
    name: "say"
}