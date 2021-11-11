//change package json to the below code to go back to the seedDB.js
// "seed": "node scripts/seedDB.js"

//THIS IS OUT OF DATE, NO GROUPS ETC

let mongoose = require("mongoose");
let cryonicsModel = require("../models/cryonicsModel");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cryonics_localtest_db", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

let usersSeed = [
    {
        firebaseAuthID: "seeded userID",
        dateCreated: 1626054981430,
        name: "Tony Stark",
        description: "this user created their profile and checked in on jul 11",
        cryonicsProvider: "Alcor",
        checkinDevices: {
            WebsiteCheckIn: {
                WebsiteCheckinRegistered: true,
                checkinArray: [
                    {
                        dateCreated: 1626054981430,
                        loc: {
                            type: "Point",
                            coordinates: [40.7128, -74.0060],
                        }
                    }
                ]
            },
        },
    },
    {
        firebaseAuthID: "seeded userID1",
        dateCreated: 1226054981430,
        name: "Thor",
        description: "this user created their profile in 2008 and checked in in 2018",
        cryonicsProvider: "Alcor",
        checkinDevices: {
            WebsiteCheckIn: {
                WebsiteCheckinRegistered: true,
                checkinArray: [
                    {
                        dateCreated: 1526014081430,
                        loc: {
                            type: "Point",
                            coordinates: [60.3930, 5.3242],
                        }
                    }
                ]
            },
        },
    },
    {
        firebaseAuthID: "seeded userID 2",
        dateCreated: 1626054981432,
        name: "Dr. Strange",
        description: "this user created their profile on jul 12th, and checked in when DB seed was run",
        cryonicsProvider: "Cryonics Institute",
        checkinDevices: {
            WebsiteCheckIn: {
                WebsiteCheckinRegistered: true,
                checkinArray: [
                    {
                        dateCreated: Date.now(),
                        loc: {
                            type: "Point",
                            coordinates: [51.5074, .1278],
                        }
                    }
                ]
            }
        },
    },
];


async function seedAsyncFunction() {
    try {
        await cryonicsModel.deleteMany();
        // await cryonicsModel.insertMany(usersSeed);
        process.exit(0);
    } catch (err) {
        console.log(err);
    }
}
seedAsyncFunction();
