var getConnection = require('../mysqlPool.js');

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    getConnection(function(err, conn) {
        if (message.mentions.members.first()) {
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.mentions.members.first().id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    message.channel.send(`${message.mentions.members.first().displayName} doesn't have xp yet!`);
                } else {
                    message.channel.send(`${message.mentions.members.first().displayName} has ${result[0].xp} xp`);
                }
            });
        } else {
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.author.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    message.channel.send('Send another message to gain some xp!');
                } else {
                    message.channel.send(`You have ${result[0].xp} xp`);
                }
            });
        }
    });
}

module.exports.help = {
    name: "xp"
}