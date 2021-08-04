/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import firebaseEnvConfigs from '../firebase';

// Initialize an instance of axios, pass in the header type.
const firebase = firebaseEnvConfigs.firebase_;
const authorize = axios.create();

// Observing firebase.auth() to listen signin/signout.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
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
        return authorize.put("/api/users", newUser);
    },
    edituser: function (editedUser) {
        return authorize.put("/api/users/edit", editedUser);
    },
    getOneUser: function (_id) {
        return authorize.get("/api/users/" + _id);
    },
    getOneUserByFirebaseID: function (firebaseUserID) {
        return authorize.get("/api/users/getOneUserByFirebaseID/" + firebaseUserID);
    },
    deleteUser: function (_id) {
        return authorize.delete("/api/users/" + _id);
    },
    putcheckIn: function (checkInData) {
        return authorize.put("/api/checkin", checkInData);
    },
    getcheckIn: function () {
        return authorize.get("/api/checkin");
    },
};
