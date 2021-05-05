const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exampleSchema = new Schema({
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
    }
}
);
const exampleModel = mongoose.model("exampleTable", exampleSchema);

module.exports = exampleModel;