const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PhoneBlacklistSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false,
    },
    num: {
        type: String,
        required: false,
    },
}
);

const PhoneBlacklistModel = mongoose.model("PhoneBlacklistTable", PhoneBlacklistSchema);
module.exports = PhoneBlacklistModel;