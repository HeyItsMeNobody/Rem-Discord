const path = require('path');
const { google } = require('googleapis');
const uuid = require('uuid');
const config = require('../config.json');
const getConnection = require('../mysqlPool.js');

module.exports = {
    DetectIntent: async function(message, text) {
        getConnection(function(err, conn) {
            var uuid4;
            conn.query(`SELECT * FROM dialogflow_uuids WHERE id = '${message.author.id}'`, async function(error, result) {
                if (error) throw error;
                if (result.length < 1) {
                    uuid4 = uuid.v4();
                    conn.query(`INSERT INTO dialogflow_uuids VALUES ('${message.author.id}', '${uuid4}')`, function(error, result) {
                        if (error) throw error;
                    });
                } else {
                    uuid4 = result[0].uuid;
                }

                text = text || message.content
                const gclient = await google.auth.getClient({
                    keyFile: path.resolve('./Rem-Googlecloud.json'),
                    scopes: 'https://www.googleapis.com/auth/cloud-platform'
                });
                const dialogflow = google.dialogflow({
                    version: 'v2beta1',
                    auth: gclient
                });

                const gresult = await dialogflow.projects.agent.sessions.detectIntent({
                    session: `projects/${config.dialogflow.pId}/agent/sessions/${uuid4}`,
                    requestBody: {
                        queryInput: {
                            text: {
                                text: text,
                                languageCode: 'en-US',
                            },
                        },
                    },
                });

                message.channel.send(gresult.data.queryResult.fulfillmentText);
            });
        });
    }
}