const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({

    // displayName: {
    //     type: String,
    //     required: true,
    // },
    // public: {
    //     type: Boolean,
    //     required: true,
    // },

    //data fields above are only relevant to Public recipes
    //data fields below are things that ALL recipes will have
    userID: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        lowercase: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
        required: true,
    },
    comments: [
        {
            text: {
                type: String,
                required: false,
            },
            dateCreated: {
                type: Date,
                default: Date.now,
                required: true,
            },
        }
    ],
    description: {
        type: String,
        required: false,
    },
    imageUrls: [
        {
            type: String,
            required: false,
        }
    ],
    category: {
        type: String,
        required: false,
        lowercase: true,
    },
    tags: [
        {
            type: String,
            required: false,
            lowercase: true,
        }
    ],
    ingredients: [
        {
            name: {
                type: String,
                required: true,
                lowercase: true,
            },
            details: {
                type: String,
                required: false,
                lowercase: true,
            },
            quantity: {
                type: String,
                required: true,
                minimum: 0,
            },
            units: String
        }
    ],
}
);
const memberModel = mongoose.model("memberTable", memberSchema);

module.exports = memberModel;