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
DBcalls();

async function DBcalls() {
    // const findall = await serverCode.DBFindallTest();
    // console.log("inside DBcalls, getting find all", findall)
    const FitbitUsers = await serverCode.DBFindFitbitUsers();
    console.log("inside DBcalls, getting FitbitUsers", FitbitUsers)
    //take the FitbitUsers array (currently only has one [me]), 
    //and within interval map through it to do:  auth token, refresh token (if needed)
    //then do handleGetHeartrate code, but modified for server.
}

// thirtySecondsTimer = setInterval(function () {
//     console.log("thirtySecondsTimer");
//     const db = require("./models");
//     db.CryonicsModel
//         .find()
//         .then(console.log("--------------interval run"))
//         .then(dbModelDataResult => console.log((dbModelDataResult)))
//         .catch(err => res.status(422).json(err));
// }, 120000);



// pseudo code 
// for those in DB who have signed up for server alerts
// check DB for auth key

// run api to get heartrate, if expired expired_token..
// {
//     "errors": [
//       {
//         "errorType": "expired_token",
//         "message": "Access token expired: eyJhbGciOi.....EpUlpc"
//       }
//     ]
//   }
//   if error type is expired_token, run the refresh api and get the new auth key
//   store that auth key in the DB

