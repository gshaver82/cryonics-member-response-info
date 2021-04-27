const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
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
    }
}
);
const exampleModel = mongoose.model("exampleTable", exampleSchema);

module.exports = exampleModel;