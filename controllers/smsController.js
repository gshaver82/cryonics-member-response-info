const db = require("../models");
// const serverCode = require("../serverCode");
const MessagingResponse = require('twilio').twiml.MessagingResponse;

module.exports = {
    smsIncomingMsg: async function (req, res) {
        let incText = ''
        console.log("smsIncomingMsg")
        try {
            console.log("####################testing VARIABLES req.body, req.body.Body", req.body, req.body.Body)
            incText = req.body.Body.toLowerCase();
            const twiml = new MessagingResponse();
            if (incText == 'hello') {
                twiml.message('Hi!');
            } else if (incText == 'bye') {
                twiml.message('Goodbye');
            } else if (incText == 'test') {
                twiml.message('we think the number you texted us with is '+ req.body.From);
            } else {
                twiml.message(
                    'No Body param match, Twilio sends this in the request to your server. req.body.Body is ' + incText
                );
            }

            res.writeHead(200, { 'Content-Type': 'text/xml' });
            res.end(twiml.toString());
        } catch (err) {
            return res.status(400).json({ error: 'Error sending text' })
        }
    },
    resToOUtboundCall: async function (req, res) {
        console.log("resToOUtboundCall")
        try {
            console.log("####################testing VARIABLES req.body, req.body.Body", req.body, req.body.Body)
        } catch (err) {
            return res.status(400).json({ error: 'Error sending text' })
        }
    }
};

