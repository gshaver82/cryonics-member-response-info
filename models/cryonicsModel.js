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
    pubNotes: [
        {
            date: {
                type: Date,
                default: Date.now,
                required: true,
            },
            note: {
                type: String,
                required: true,
                default: "note",
            }
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
            user_id: {
                type: String,
                required: true,
            },
            authToken: {
                type: String,
                required: false,
            },
            refreshToken: {
                type: String,
                required: false,
            },
            fbDeviceName: {
                type: String,
                required: false,
            },
            fbDeviceBat: {
                type: String,
                required: false,
            },
            fbTimeOffset: {
                type: Number,
                required: true,
                default: 0,
            },
            checkinArray: [
                {
                    dateCreated: {
                        type: Date,
                        required: false,
                    },
                }
            ],
            syncAlertArray: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    activeState: {
                        type: Boolean,
                        required: true,
                        default: true,
                    },
                    stage: [
                        {
                            type: Date,
                            required: false,
                        }
                    ]
                }
            ],
            alertArray: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    lat: {
                        type: Number,
                        required: false,
                    },
                    long: {
                        type: Number,
                        required: false,
                    },
                    activeState: {
                        type: Boolean,
                        required: true,
                        default: true,
                    },
                    stage: [
                        {
                            type: Date,
                            required: false,
                        }
                    ]
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
    },
    alertStage: [
        {
            num: {
                type: String,
                required: false,
            },
            method: {
                type: String,
                required: false,
            },
        }
    ],
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
}
);
cryonicsSchema.index({ "loc": "2dsphere" });

const cryonicsModel = mongoose.model("cryonicsTable", cryonicsSchema);
module.exports = cryonicsModel;