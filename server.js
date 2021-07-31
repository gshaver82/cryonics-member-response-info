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

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.get('*', function (req, res) {
    const index = path.join(__dirname, 'build', 'index.html');
    res.sendFile(index);
});

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});

let hourcount = 0
console.log("first hourcount is  " + hourcount); 

let Fifteenmincount = 0
console.log("first Fifteenmincount is  " + Fifteenmincount); 

let firstloop = 0
if (firstloop < 10){
    setInterval(function(){ 
        firstloop ++;
        console.log("firstloop " + firstloop ); 
    }, 30000);
}
setInterval(function(){ 
    Fifteenmincount ++;
    console.log("Hello, it has been " + Fifteenmincount + "Fifteenmincount since server start"); 
}, 600000);


setInterval(function(){ 
    count ++;
    console.log("Hello, it has been " + hourcount + "hours since server start"); 
}, 3600000);