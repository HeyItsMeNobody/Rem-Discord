module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    const sayMessage = args.join(" ");
    sayMessageFiltered = sayMessage.replace('@', '');
    if (sayMessageFiltered === "") {
        message.channel.send("You didn't give me anything to say uwu")
        return;
    }
    else {
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessageFiltered);
        return;
    }
}

module.exports.help = {
    name: "say"
}