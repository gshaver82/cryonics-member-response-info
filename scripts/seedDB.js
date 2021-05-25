//change package json to the below code to go back to the seedDB.js
// "seed": "node scripts/seedDB.js"

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
        name: "Seeded user name",
        GPSLocationArray: [
            {
                loc: {
                    type: "Point",
                    coordinates: [-73.97, 40.77],
                }
            }
        ],
    },
    {
        firebaseAuthID: "seeded userID 2",
        name: "Seeded user name 2",
        GPSLocationArray: [
            {
                loc: {
                    type: "Point",
                    coordinates: [-73.97, 40.77],
                }
            },
            {
                loc: {
                    type: "Point",
                    coordinates: [-73.97, 40.77],
                }
            }

        ],
    },
];


async function seedAsyncFunction() {
    try {
        await cryonicsModel.deleteMany();
        await cryonicsModel.insertMany(usersSeed);
        process.exit(0);
    } catch (err) {
        console.log(err);
    }
}
seedAsyncFunction();
