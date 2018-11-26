var getConnection = require('../mysqlPool.js');

module.exports.run = async (client, message, messageArray, cmd, args, config) => {
    getConnection(function(err, conn) {
        if (message.mentions.members.first()) {
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.mentions.members.first().id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    message.channel.send(`${message.mentions.members.first().displayName} doesn't have any xp yet!`);
                } else {
                    message.channel.send(`${message.mentions.members.first().displayName} is level ${result[0].level} (${result[0].xp}xp)`);
                }
            });
        } else {
            conn.query(`SELECT * FROM global_stats WHERE id = '${message.author.id}'`, function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    message.channel.send('Send another message to gain some xp!');
                } else {
                    message.channel.send(`You are level ${result[0].level} (${result[0].xp}xp)`);
                }
            });
        }
        conn.release();
    });
}

module.exports.help = {
    name: "level"
}