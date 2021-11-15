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
            checkinArray: [
                {
                    dateCreated: {
                        type: Date,
                        required: false,
                    },
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
                    stage1: {
                        type: Date,
                        required: false,
                    },
                    stage2: {
                        type: Date,
                        required: false,
                    },
                    stage3: {
                        type: Date,
                        required: false,
                    },
                    stage4: {
                        type: Date,
                        required: false,
                    },
                    stage5: {
                        type: Date,
                        required: false,
                    },
                    stage6: {
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
    textToUserDatecode: {
        type: Date,
        required: false,
    },
    textToEmerContactDatecode: {
        type: Date,
        required: false,
    },
    textToAdminDatecode: {
        type: Date,
        required: false,
    },
    Datecode0: {
        type: Date,
        required: false,
    },
    Datecode1: {
        type: Date,
        required: false,
    },
    Datecode2: {
        type: Date,
        required: false,
    },
    text0: {
        type: String,
        required: false,
    },
    //fitbit device name
    text1: {
        type: String,
        required: false,
    },
    //fitbit device battery level
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
    },
    stage1Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
    stage2Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
    stage3Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
    stage4Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
    stage5Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
    stage6Alert: {
        num: {
            type: String,
            required: false,
        },
        method: {
            type: String,
            required: false,
        },
    },
}
);
cryonicsSchema.index({ "loc": "2dsphere" });

const cryonicsModel = mongoose.model("cryonicsTable", cryonicsSchema);
module.exports = cryonicsModel;