const path = require('path');
const { google } = require('googleapis');
const uuid = require('uuid');
const config = require('../config.json');

module.exports = {
    DetectIntent: async function(message, text) {
        text = text || message.content
        const gclient = await google.auth.getClient({
            keyFile: path.resolve('./Rem-Googlecloud.json'),
            scopes: 'https://www.googleapis.com/auth/cloud-platform'
        });
        const dialogflow = google.dialogflow({
            version: 'v2beta1',
            auth: gclient
        });

         const result = await dialogflow.projects.agent.sessions.detectIntent({
            session: `projects/${config.dialogflow.pId}/agent/sessions/${uuid.v4()}`,
            requestBody: {
                queryInput: {
                    text: {
                        text: text,
                        languageCode: 'en-US',
                    },
                },
            },
        });

        message.channel.send(result.data.queryResult.fulfillmentText);
    }
}