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
// serverCode.startup();


// serverCode.fifteenMin();
const fetch = require("node-fetch");
console.log("🚀 ~ process.env.NODE_ENV", process.env.NODE_ENV)
if (process.env.NODE_ENV === "production") {
    DBcalls();
    // AlertInterval();
}

//alert interval this checks sync data only
// async function AlertInterval() {
//     mainInterval = setInterval(async function () {
//         const FitbitUsers = await serverCode.DBFindFitbitUsers();
//         FitbitUsers.map(async (user) => {
//             // console.log("running sync alert checker for ", user.name)
//             try {
//                 let FBsyncDate = user.checkinDevices?.fitbit?.checkinArray[0]?.dateCreated ? user.checkinDevices.fitbit.checkinArray[0].dateCreated : 0
//                 let activeState = user.checkinDevices?.fitbit?.syncAlertArray[0]?.activeState ? user.checkinDevices.fitbit.syncAlertArray[0].activeState : false
//                 const temptime = Date.now() - (new Date(FBsyncDate).getTime());
//                 let minutes = Math.floor(temptime / 1000 / 60)
//                 let timeSinceLastSyncAlert = Date.now() - (user?.checkinDevices?.fitbit?.syncAlertArray[0]?.date ? user.checkinDevices.fitbit.syncAlertArray[0].date : 0)
//                 // console.log(user.name + " minutes -- " + minutes + " activeState -- " + activeState + " timeSinceLastSyncAlert -- " + timeSinceLastSyncAlert)
//                 if (minutes > 40 &&
//                     activeState === false &&
//                     (timeSinceLastSyncAlert > 900000)
//                 ) {
//                     // console.log("putting sync alert")
//                     serverCode.putSyncAlert(user);
//                 } else if (minutes > 40) {
//                     // console.log("NOT putSyncAlert. minutes > 40 but not puting sync alert, active state is true, or time since last sync alert is ", timeSinceLastSyncAlert)
//                 } else {
//                     // console.log("Completed sync alert checker for " + user.name + "minutes" + minutes)
//                 }


//             } catch {
//                 console.log("AlertInterval failed for " + user.name + " maybe no sync data yet?")
//             }
//         });
//         //30 seconds 30000
//         // 2 minutes 120000
//         //10 minutes 600000
//         //15 minutes 900000
//     }, 180000);
// }

async function DBcalls() {
    mainInterval = setInterval(async function () {
        //find fitbit users who have also signed up for alerts
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
    }, 900000);
}

const handleGetHeartrate = async (user) => {
    console.log(user.name + ' starting interval code, getting HR date from fitbit')
    let fitBitDataJSON = 'starting value'
    let authToken = 'starting value'
    let FBoffsetFromUTChours = 'starting value'
    let timezoneOffset = 42;
    authToken = user.checkinDevices.fitbit.authToken
    let fitBitDevice = 0;
    if (!authToken || authToken === 'starting value') {
        console.log("!authToken for user ", user.name)
        return
    } else {
        try { fitBitDataJSON = await getFitBitData(authToken) }
        catch { console.log("error getting getFitBitData") }
        try {
            fitBitDevice = await getFitBitDevice(authToken)
            // console.log("🚀getFitBitDevice  fitBitDevice", fitBitDevice)
        }
        catch { console.log("error getting fitbit device") }

        try {
            FBProfile = await getFBProfile(authToken)
            // console.log("FBProfile", FBProfile)
            FBoffsetFromUTChours = (FBProfile?.user?.offsetFromUTCMillis) / 1000 / 60 / 60
            // console.log("🚀 ~ handleGetHeartrate ~ FBoffsetFromUTChours", FBoffsetFromUTChours)
            try {
                if (FBoffsetFromUTChours > -16 && FBoffsetFromUTChours < 16) {
                    timezoneOffset = FBoffsetFromUTChours
                } else {
                    console.log("FBoffsetFromUTChours is outside reasonable range.... setting to -6 default offset for CST")
                    timezoneOffset = -6;
                }
            } catch {
                console.log("no time offset data")
            }
        }
        catch {
            console.log("error getting fitbit profile")
        }
    }
    if (fitBitDevice !== 0 && fitBitDevice[0]?.deviceVersion && fitBitDevice[0]?.batteryLevel) {
        try {
            serverCode.DBuserFitbitDevice(user.firebaseAuthID, fitBitDevice)
        }
        catch {
            console.log("storing fitbit device info failed")
        }
    } else if (fitBitDevice == 0) { console.log("fitBitDevice == 0") }
    else {console.log("ERROR sending fitbit device details, fitbit device has something loaded, but its not valid")}

    if (fitBitDataJSON.success === false) {
        if (fitBitDataJSON.errors[0].errorType === "expired_token") {
            const fitbitRefreshTokenResponse = await getFitBitRefreshTokens(user.checkinDevices.fitbit.refreshToken)
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
            serverCode.putFitBitTokens(fitbitObjectForDB)
                .catch(err => console.log(err));
            fitBitDataJSON = await getFitBitData(authToken)
            if (fitBitDataJSON.success === false) {
                console.log("!!!!!!!!!!!CRITICAL error failed to get new refresh token for " + user.name + " fitBitDataJSON ", fitBitDataJSON)
                return 1
            }
        }
    }
    fitBitDataJSON = JSON.stringify(fitBitDataJSON);
    fitBitDataJSON = fitBitDataJSON.replace(/-/g, '');
    fitBitDataJSON = JSON.parse(fitBitDataJSON);

    //getting the most recent time from the fitbitdatajson
    //if the current days entry does not exist then skip

    if (fitBitDataJSON.activitiesheartintraday.dataset && fitBitDataJSON.activitiesheartintraday.dataset.length === 0) {
        console.log(user.name + "no dataset data found. user hasnt logged data for that time period, device doesnt support intraday, or just after midnight")
        return 1
    } else if (fitBitDataJSON.activitiesheartintraday.dataset) {
        try {
            let datasetpop = fitBitDataJSON.activitiesheartintraday.dataset.pop();
            // console.log("datasetpop", datasetpop)
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
            FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() + timezoneOffset);
            // console.log("FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() - 5);", FBcheckinDateCode)
            FBcheckinDateCode.setUTCHours(hours, minutes, '00');
            // console.log("FBcheckinDateCode.setUTCHours(hours, minutes, '00')", FBcheckinDateCode)
            FBcheckinDateCode.setUTCHours(FBcheckinDateCode.getUTCHours() - timezoneOffset);

            const newArrayEntry ={dateCreated: FBcheckinDateCode}
            let fitbitCheckinObjectForDB = {
                firebaseAuthID: user.firebaseAuthID,
                newArrayEntry
            }
            // console.log("fitbitCheckinObjectForDB", fitbitCheckinObjectForDB)
            serverCode.putFitBitServerCheckin(fitbitCheckinObjectForDB)
                // .then(console.log("datecode sent to DB", fitbitCheckinObjectForDB))
                .catch(err => console.log(err));
            const temptime = Date.now() - (new Date(FBcheckinDateCode).getTime());
            let newMinutes = Math.floor(temptime / 1000 / 60)
            // console.log("newMinutes", newMinutes)
            // if (newMinutes < 25) {
            //     console.log(newMinutes + " minutes since sync registered HR. since minutes is under 25, NEED TO RESET")
            // } else {
            //     console.log(newMinutes + " min since fitbit sync registered HR.")
            // }
        } catch (error) {
            console.log("fitbit dataset pop failed", error);
            return 1
        }

    } else {
        console.log("fitBitDataJSON.activitiesheartintraday.dataset does not exist")
        return 1
    }
    console.log(user.name +' interval code complete')
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

async function getFitBitDevice(authToken) {
    if (authToken) {
        //"https://api.fitbit.com/1/user/[user-id]/devices.json"
        const url = "https://api.fitbit.com/1/user/-/devices.json"
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
async function getFBProfile(authToken) {
    if (authToken) {
        //"https://api.fitbit.com/1/user/[user-id]/profile.json"
        const url = "https://api.fitbit.com/1/user/-/profile.json"
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