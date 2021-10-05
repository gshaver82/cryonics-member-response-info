const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//things that will go in firebase database
//youtube vid, profile pic, HCD or other Docs/PDFs

//emergency contact (people who are expected to know where the user is. significant other etc)
//emergency contact (HCD health care agent. people who are expected to the HCD details but may or may not know day to day details. )
//GPS location
//street name location if available
//building location if available (like a hospital)

const cryonicsSchema = new Schema({
    firebaseAuthID: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true,
    },
    name: {
        type: String,
        required: false,
        lowercase: false,
    },
    signedUpForAlerts: {
        type: Boolean,
        required: true,
        default: false,
    },
    group: [
        {
            type: String,
            required: true,
            default: "private",
        }
    ],
    checkinDevices: {
        WebsiteCheckIn: {
            WebsiteCheckinRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },
            checkinArray: [
                {
                    dateCreated: {
                        type: Date,
                        default: Date.now,
                        required: false,
                    },
                    loc: {
                        type: { type: String },
                        coordinates: [Number],
                    },
                }
            ]
        },
        fitbit: {
            fitbitDeviceRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },
            authToken: {
                type: String,
                required: false,
            },
            refreshToken: {
                type: String,
                required: false,
            },
            checkinArray: [
                {
                    dateCreated: {
                        type: Date,
                        required: false,
                    },
                }
            ]
        },
        exampleDevice: {
            exampleDeviceRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },
            authToken: {
                type: String,
                required: false,
            },
            refreshToken: {
                type: String,
                required: false,
            },
            exampleCheckinArray: [
                {
                    dateCreated: {
                        type: Date,
                        default: Date.now,
                        required: false,
                    },
                }
            ]
        },
        exampleDevice2: {
            exampleDeviceRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },
            authToken: {
                type: String,
                required: false,
            },
            refreshToken: {
                type: String,
                required: false,
            },
            exampleCheckinArray: [
                {
                    dateCreated: {
                        type: Date,
                        default: Date.now,
                        required: false,
                    },
                }
            ]
        },
        exampleDevice3: {
            exampleDeviceRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },
            authToken: {
                type: String,
                required: false,
            },
            refreshToken: {
                type: String,
                required: false,
            },
            exampleCheckinArray: [
                {
                    dateCreated: {
                        type: Date,
                        default: Date.now,
                        required: false,
                    },
                }
            ]
        },
    },
    description: {
        type: String,
        required: false,
    },
    cryonicsProvider: {
        type: String,
        enum: ['Alcor', 'Cryonics Institute', 'None'],
        required: false,
    },
    photoURL: {
        type: String,
        required: false,
    },
    text0: {
        type: String,
        required: false,
    },
    text1: {
        type: String,
        required: false,
    },
    text2: {
        type: String,
        required: false,
    },
    text3: {
        type: String,
        required: false,
    },
    text4: {
        type: String,
        required: false,
    },
    text5: {
        type: String,
        required: false,
    },
    text6: {
        type: String,
        required: false,
    },
    text7: {
        type: String,
        required: false,
    },
    text8: {
        type: String,
        required: false,
    },
    text9: {
        type: String,
        required: false,
    },
    file0: {
        type: String,
        required: false,
    },
    file1: {
        type: String,
        required: false,
    },
    file2: {
        type: String,
        required: false,
    },
    file3: {
        type: String,
        required: false,
    },
    file4: {
        type: String,
        required: false,
    }
}
);
cryonicsSchema.index({ "loc": "2dsphere" });

const cryonicsModel = mongoose.model("cryonicsTable", cryonicsSchema);
module.exports = cryonicsModel;