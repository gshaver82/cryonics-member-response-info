const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//when a group is created, the first user will be an admin. 
//TODO all of this

const adminSchema = new Schema({
    dateCreated: {
        type: Date,
        default: Date.now,
        required: false,
    },
    groupName: {
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