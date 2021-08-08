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

// List of all the files that should be served as-is
// let protected = ['favicon.ico', 'logo192.png']

// app.get("*", (req, res) => {

//     let path = req.params['0'].substring(1)

//     if (protected.includes(path)) {
//         // Return the actual file
//         res.sendFile(`${__dirname}/build/${path}`);
//     } else {
//         // Otherwise, redirect to /build/index.html
//         res.sendFile(`${__dirname}/build/index.html`);
//     }
// });


// app.get('*', function (req, res) {
//     const URL = path.join(__dirname, 'build', 'index.html');
//     console.log("🚀 ~ file: server.js ~ line 41 ~ URL", URL)    
//     res.sendFile(URL);
// });

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