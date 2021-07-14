/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import firebaseEnvConfigs from '../firebase';

// Initialize an instance of axios, pass in the header type.
const firebase = firebaseEnvConfigs.firebase_;
const authorize = axios.create();

// Observing firebase.auth() to listen signin/signout.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("🚀 ~ file: API.js ~ line 12 ~ user", user.providerData)
        console.log("[API] User is signed in");
        user.getIdToken().then(function (idToken) {
            // Intercepting any request and appending token to the header.
            authorize.interceptors.request.use(function (config) {
                config.headers.authorization = idToken;
                return config;
            });
        }).catch(function (error) {
            console.log("[API] Error:", error);
        });
    } else {
        console.log("[API] User is not signed in");
    }
});

export default {
    getuserList: function () {
        return authorize.get("/api/users");
    },

    adduser: function (newUser) {
        console.log("🚀 ~ file: API.js ~ line 33 ~ newUser", newUser)
        return authorize.put("/api/users", newUser);
    },
    edituser: function (editedUser) {
        console.log("🚀 ~ file: API.js ~ line 37 ~ newUser", editedUser)
        return authorize.put("/api/users/edit", editedUser);
    },
    getOneUser: function (_id) {
        console.log("🚀 ~ file: API.js ~ line 52 ~ _id", _id)
        return authorize.get("/api/users/" + _id);
    },
    getOneUserByFirebaseID: function (firebaseUserID) {
        console.log("🚀 ~ file: API.js ~ line 52 ~ _id", firebaseUserID)
        return authorize.get("/api/users/getOneUserByFirebaseID/" + firebaseUserID);
    },
    deleteUser: function (_id) {
        console.log("🚀 ~ file: API.js ~ line 52 ~ _id", _id)
        return authorize.delete("/api/users/" + _id);
    },
    putcheckIn: function (checkInData) {
        console.log("🚀 ~ file: API.js ~ line 42 ~ checkinObject", checkInData)
        return authorize.put("/api/checkin", checkInData);
    },
    checkIn: function (checkinObject) {
        console.log("🚀 ~ file: API.js ~ line 42 ~ checkinObject", checkinObject)
        return authorize.put("/api/checkin", checkinObject);
    },
    getcheckIn: function () {
        console.log("🚀 ~ file: API.js ~ line 42 ~ getcheckIn")
        return authorize.get("/api/checkin");
    },
};
