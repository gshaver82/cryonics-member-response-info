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
                twiml.message('we think the number you texted us with is ' + req.body.From);
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
        console.log("----------response to phone call is req.params--------", req.params)
        console.log("----------response to phone call is req.query--------", req.query)
        let user = 0
        try {
            user = await db.CryonicsModel.findOne({ _id: req.params._id }).exec()
        } catch (err) {
            return res.status(400).send("<Response><Say>Error finding user in database</Say></Response>");
        }
        try {
            if(req.query.Digits){
                let watchalert = 0
                let syncAlert = 0
                user?.checkinDevices?.fitbit?.alertArray[0]?.activeState
                    ? watchalert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.alertArray.0.activeState": false } }).exec()
                    : console.log("not setting alert array to false. either doesnt exist, or is already false")
    
                user?.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState
                    ? syncAlert = await db.CryonicsModel.updateOne({ _id: req.params._id }, { $set: { "checkinDevices.fitbit.syncAlertArray.0.activeState": false } }).exec()
                    : console.log("not setting alert array to false. either doesnt exist, or is already false")
                    if(watchalert === 0){
                        return res.status(200).send("<Response><Say>You have no active watch alert</Say></Response>");
                    }else{
                        return res.status(200).send("<Response><Say>Your watch alert has been cleared</Say></Response>");
                    }
            }else{
                return res.status(200).send("<Response><Say>Error, no input digits</Say></Response>");
            }

        } catch (err) {
            console.log("ERROR!! ", err)
            return res.status(400).send("<Response><Say>Error clearing your alert</Say></Response>");
        }
    }
};

