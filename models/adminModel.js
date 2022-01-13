const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false,
    },
    name: {
        type: String
    },
    admins: [
        {
            dateCreated: {
                type: Date,
                default: Date.now,
                required: false,
            },
            name: {
                type: String
            },
            firebaseAuthID: {
                type: String
            },
        }
    ],
}
);

const adminModel = mongoose.model("adminTable", adminSchema);
module.exports = adminModel;