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

// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

// app.use(expressCspHeader({
//     directives: {
//         'default-src': [SELF]
//     }
// }));

app.get("*", (req, res) => {
    let url = path.join(__dirname, '../client/build', 'index.html');
    if (!url.startsWith('/app/')) // since we're on local windows
        url = url.substring(1);
    res.sendFile(url);
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