const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

const routes = require("./routes");
const { countDocuments } = require("./models/cryonicsModel");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/cryonics_localtest_db",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
);
app.use(routes);

//this will prevent page refreshes that go directly to /examplepage from failing. 
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});

const serverCode = require("./serverCode");
serverCode.startup();
serverCode.fifteenMin();
const fetch = require("node-fetch");
DBcalls();

async function DBcalls() {
    mainInterval = setInterval(async function () {
        console.log("inside interval");
        const FitbitUsers = await serverCode.DBFindFitbitUsers();
        // console.log("inside DBcalls, getting FitbitUsers", FitbitUsers)
        FitbitUsers.map(async (user) => {
            const rtnvalue = await handleGetHeartrate(user)
            // console.log("rtnvalue", rtnvalue)
        });
        //30 seconds 30000
        //2 minutes 120000
        //10 minutes 600000
        //15 minutes 900000
    }, 600000);
}

const handleGetHeartrate = async (user) => {
    console.log('running interval code for ', user.name)
    let fitBitDataJSON = 'starting value'
    let authToken = 'starting value'
    authToken = user.checkinDevices.fitbit.authToken
    if (!authToken || authToken === 'starting value') {
        console.log("!authToken")
        return
    } else {
        // console.log("🚀 ~ handleGetHeartrate ~ authTokens", authTokens)
        fitBitDataJSON = await getFitBitData(authToken)
    }

    if (fitBitDataJSON.success === false) {
        console.log("failure to retrieve fitbit data", fitBitDataJSON.errors[0])
        if (fitBitDataJSON.errors[0].errorType === "expired_token") {
            console.log("!!!!!!!!!!expired_token for ", user.name)
            const fitbitRefreshTokenResponse = await getFitBitRefreshTokens(user.checkinDevices.fitbit.refreshToken)
            console.log("fitbitRefreshTokenResponse", fitbitRefreshTokenResponse)
            const fitbitObjectForDB = {
                firebaseAuthID: user.firebaseAuthID,
                checkinDevices: {
                    fitbit: {
                        fitbitDeviceRegistered: true,
                        authToken: fitbitRefreshTokenResponse.access_token,
                        refreshToken: fitbitRefreshTokenResponse.refresh_token
                    },
                }
            }
            console.log("serverjs putting in new refreshed tokens fitbitObjectForDB", fitbitObjectForDB)
            serverCode.putFitBitTokens(fitbitObjectForDB)
                .catch(err => console.log(err));

            fitBitDataJSON = await getFitBitData(authToken)
            if (fitBitDataJSON.success === false) {
                console.log("!!!!!!!!!!!failed to get refreshed token!!!!!!!!!!!")
                console.log("fitBitDataJSON", fitBitDataJSON)
                return 1
            }else {
                console.log("no errors retrieving refreshed fitbit data for ", user.name)
            }
        }
    } else {
        console.log("no errors retrieving fitbit data for ", user.name)
    }

    fitBitDataJSON = JSON.stringify(fitBitDataJSON);
    fitBitDataJSON = fitBitDataJSON.replace(/-/g, '');
    fitBitDataJSON = JSON.parse(fitBitDataJSON);

    //getting the most recent time from the fitbitdatajson
    //if the current days entry does not exist then skip

    if (fitBitDataJSON.activitiesheartintraday.dataset && fitBitDataJSON.activitiesheartintraday.dataset.length === 0) {
        console.log(user.name, "no dataset data found. possibly because user hasnt logged data for that time perio, device doesnt support intraday, or just after midnight")
        return 1
    } else if (fitBitDataJSON.activitiesheartintraday.dataset) {
        try {
            let datasetpop = fitBitDataJSON.activitiesheartintraday.dataset.pop();
            console.log("datasetpop", datasetpop)
            let YoungestFitbitHR = datasetpop.time;
            // console.log("🚀 TIME ~ handleGetHeartrate ~ YoungestFitbitHR", YoungestFitbitHR)
            YoungestFitbitHR = YoungestFitbitHR.replace(/:/g, '')
            YoungestFitbitHR = YoungestFitbitHR.slice(0, 4)
            //convert to current date code
            //this will take todays date and then put in the hours and minutes that was retrieved from fitbit
            let hours = YoungestFitbitHR.slice(0, 2)
            // console.log("🚀 ~ handleGetHeartrate ~ hours", hours)
            let minutes = YoungestFitbitHR.slice(2, 4)
            // console.log("🚀 ~ handleGetHeartrate ~ minutes", minutes)
            // const FBcheckinDateCode = new Date(new Date().setHours(hours, minutes, '00'));
            // console.log("🚀 ~ handleGetHeartrate ~ FBcheckinDateCode", FBcheckinDateCode)

            let FBcheckinDateCode = new Date();
            //hardcoding timezone offset for central standard time
            const timezoneOffset = -5;
            // console.log("let FBcheckinDateCode = new Date()", FBcheckinDateCode)
            //central time zone offset hardcode. please change this later
            FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() + timezoneOffset);

            // console.log("FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() - 5);", FBcheckinDateCode)

            FBcheckinDateCode.setUTCHours(hours, minutes, '00');
            // console.log("FBcheckinDateCode.setUTCHours(hours, minutes, '00')", FBcheckinDateCode)

            FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() - timezoneOffset);

            const newArrayEntry =
            {
                dateCreated: FBcheckinDateCode
            }
            let fitbitCheckinObjectForDB = {
                firebaseAuthID: user.firebaseAuthID,
                newArrayEntry
            }
            // console.log("fitbitCheckinObjectForDB", fitbitCheckinObjectForDB)
            serverCode.putFitBitManualCheckin(fitbitCheckinObjectForDB)
                // .then(console.log("datecode sent to DB", fitbitCheckinObjectForDB))
                .catch(err => console.log(err));
        } catch (error) {
            console.log("fitbit dataset pop failed", error);
            return 1
        }

    } else {
        console.log("fitBitDataJSON.activitiesheartintraday.dataset does not exist")
        return 1
    }
    console.log('interval code complete for ', user.name)
    return 0
}

async function getFitBitData(authToken) {
    if (authToken) {
        const url = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json"
        const response = await fetch(url, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + authToken
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer'
        });
        return response.json(); // parses JSON response into native JavaScript objects
    } else {
        console.log("no auth tokens")
    }
}

async function getFitBitRefreshTokens(RefreshToken) {
    if (RefreshToken) {
        const fitbitAuthTokenNeededData = {
            Authorization: "Basic " + process.env.REACT_APP_ENCODEDBASE,
            refresh_token: RefreshToken,
        }
        const url = "https://api.fitbit.com/oauth2/token"
            + "?grant_type=refresh_token"
            + "&refresh_token=" + fitbitAuthTokenNeededData.refresh_token;
        console.log("refresh token URL", url)
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': fitbitAuthTokenNeededData.Authorization
            },
            referrerPolicy: 'no-referrer',
        })
        return response.json(); // parses JSON response into native JavaScript objects
    } else {
        console.log("no RefreshToken")
    }
}