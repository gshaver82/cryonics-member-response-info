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
    checkinDevices:{
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
            }
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
            }
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
    WebsiteCheckIn: {
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
}
);
cryonicsSchema.index({ "loc": "2dsphere" });

const cryonicsModel = mongoose.model("cryonicsTable", cryonicsSchema);
module.exports = cryonicsModel;