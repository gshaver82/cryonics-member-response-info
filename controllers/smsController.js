const db = require("../models");
// const serverCode = require("../serverCode");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {
    smsIncomingMsg: async function (req, res) {

        console.log("smsIncomingMsg")
        try {
            console.log("sms controller sending text")
            console.log("####################testing VARIABLES req", req)
            console.log("####################testing VARIABLES req.body, req.body.Body", req.body, req.body.Body)
            const twiml = new MessagingResponse();
            if (req.body == 'hello') {
                twiml.message('Hi!');
            } else if (req.body == 'bye') {
                twiml.message('Goodbye');
            } else {
                twiml.message(
                    'No Body param match, Twilio sends this in the request to your server.'
                );
            }

            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        } catch (err) {
            return res.status(400).json({ error: 'Error sending text' })
        }
    }
};

