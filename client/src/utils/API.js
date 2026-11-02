/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import firebaseEnvConfigs from '../firebase';

// Initialize an instance of axios, pass in the header type.
const firebase = firebaseEnvConfigs.firebase_;
const authorize = axios.create();
const noAuth = axios.create();
// Observing firebase.auth() to listen signin/signout.
authorize.interceptors.request.use(async function (config) {
    const currentUser = firebase.auth().currentUser;

    if (!currentUser) {
        throw new Error("Sign-in required");
    }

    const idToken = await currentUser.getIdToken();

    config.headers = config.headers || {};
    config.headers.authorization = "Bearer " + idToken;

    return config;
});

export default {
    fitbitGetDBAuthToken: function (firebaseAuthID) {
        return authorize.get("/api/fitbit/" + firebaseAuthID);
    },
    putFitBitTokens: function (fitbitObjectForDB) {
        return authorize.put("/api/fitbit", fitbitObjectForDB);
    },
    putFitBitManualCheckin: function (FBcheckinDateCode) {
        return authorize.put("/api/fitbit/fitbitCheckin", FBcheckinDateCode);
    },
    putFitBitDeviceManualCheckin: function (fitBitDevice) {
        return authorize.put("/api/fitbit/fitbitCheckin/device", fitBitDevice);
    },
    getuserList: function () {
        return authorize.get("/api/users/");
    },
    getOneUser: function (_id) {
        return authorize.get("/api/users/" + _id);
    },
    deleteUser: function (_id) {
        return authorize.delete("/api/users/" + _id);
    },
    currentStatusNote: function (currentStatusNoteObjectForDB) {
        return authorize.put("/api/users/note", currentStatusNoteObjectForDB);
    },
    edituser: function (editedUser) {
        return authorize.put("/api/users/edit", editedUser);
    },
    getOneUserByFirebaseID: function (firebaseUserID) {
        return authorize.get("/api/users/getOneUserByFirebaseID/" + firebaseUserID);
    },
    putWebcheckIn: function (checkInData) {
        return authorize.put("/api/checkin", checkInData);
    },
    getcheckIn: function () {
        return authorize.get("/api/checkin");
    },
    putClearFBAlert: function (_id) {
        return noAuth.put("/capi/ClearFBAlert/" + _id, 0, {
            headers: {
                'semisecret': "vegetable"
            }
        });
    },
    appProfileDelete: function (delRequest) {
        console.log("🚀 ~ inside api file delRequest:", delRequest);
        return noAuth.put("https://autoheartwatchserver.herokuapp.com/appProfileDelete", delRequest);
    },
    putWebClearFBAlert: function (mongoUserId) {
        return authorize.put("/api/fitbit/WebClearFBAlert", mongoUserId);
    },
};
