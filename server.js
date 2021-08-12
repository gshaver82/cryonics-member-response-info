const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();

const routes = require("./routes");

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

let hourcount = 0
console.log("first hourcount is  " + hourcount);

let Fifteenmincount = 0
console.log("first Fifteenmincount is  " + Fifteenmincount);

fifteenmincounttimer = setInterval(function () {
    Fifteenmincount++;
    let remainder = (Fifteenmincount % 4) * 15;
    remainder === 0 ? hourcount++ : remainder;
    console.log("it has been " + hourcount +
        " hours, and " + remainder + " minutes since server start");
}, 900000);


// res.json is not a function. res by itself returns undefined
//if this works and gets deployed will probably need to reroute to build for heroku
// const db = require("./models");

// oneMinuteTimer = setInterval(function () {
//     console.log("oneMinuteTimer");
//     test()
//     function test(req, res) {
//         db.CryonicsModel
//             .find()
//             .then(console.log("inside api call, res" , res))
//             .then(res => console.log(res.json(res)))
//             .catch(err => console.log("error" , err));
//     }
// }, 60000);



