

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

        // =====================================================
        // FITBIT WATCH
        // =====================================================

        fitbit: {
            fitbitDeviceRegistered: {
                type: Boolean,
                required: true,
                default: false,
            },

            // =================================================
            // NEW DEVICE PAIRING AND AUTHENTICATION
            // =================================================

            // SHA-256 HMAC of temporary six-digit code.
            // Raw pairing code is never stored in MongoDB.
            pairingCodeHash: {
                type: String,
                required: false,
                select: false,
            },

            // Temporary pairing code expiration.
            pairingCodeExpiresAt: {
                type: Date,
                required: false,
            },

            // SHA-256 hash of persistent 256-bit device token.
            // Raw token is stored only by the phone companion.
            deviceTokenHash: {
                type: String,
                required: false,
                select: false,
            },

            // Public six-character ID shown on the watch.
            // Example: K7M2P9
            displayId: {
                type: String,
                required: false,
                uppercase: true,
                trim: true,
                match: /^[A-Z0-9]{6}$/,
            },

            // Date when the watch was paired.
            pairedAt: {
                type: Date,
                required: false,
            },

            // Allows server-side device revocation.
            deviceTokenRevoked: {
                type: Boolean,
                required: true,
                default: false,
            },

            // =================================================
            // LEGACY FITBIT API FIELDS
            // Preserved for existing records.
            // No longer required for new registrations.
            // =================================================

            user_id: {
                type: String,
                required: false,
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

            // =================================================
            // EXISTING CHECK-IN HISTORY
            // =================================================

            checkinArray: [
                {
                    dateCreated: {
                        type: Date,
                        required: false,
                    },
                }
            ],

            // =================================================
            // EXISTING SYNC ALERT HISTORY
            // Preserved for historical compatibility.
            // =================================================

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

            // =================================================
            // EXISTING WATCH EMERGENCY ALERTS
            // Preserve structure for Twilio alert chain.
            // =================================================

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
});

// =====================================================
// DATABASE INDEXES
// =====================================================

// Existing index, preserved.
cryonicsSchema.index({ "loc": "2dsphere" });

// Prevent two devices from sharing the same display ID.
// Only index documents where a display ID exists.
cryonicsSchema.index(
    { "checkinDevices.fitbit.displayId": 1 },
    {
        unique: true,
        partialFilterExpression: {
            "checkinDevices.fitbit.displayId": {
                $type: "string"
            }
        }
    }
);

// Fast token lookup and protection against duplicate
// device-token hashes.
cryonicsSchema.index(
    { "checkinDevices.fitbit.deviceTokenHash": 1 },
    {
        unique: true,
        partialFilterExpression: {
            "checkinDevices.fitbit.deviceTokenHash": {
                $type: "string"
            }
        }
    }
);

// Look up temporary pairing codes.
// A unique index prevents multiple accounts from
// simultaneously using the same six-digit code.
cryonicsSchema.index(
    { "checkinDevices.fitbit.pairingCodeHash": 1 },
    {
        unique: true,
        partialFilterExpression: {
            "checkinDevices.fitbit.pairingCodeHash": {
                $type: "string"
            }
        }
    }
);

// =====================================================
// MODEL EXPORT
// =====================================================

const cryonicsModel = mongoose.model(
    "cryonicsTable",
    cryonicsSchema
);

module.exports = cryonicsModel;

