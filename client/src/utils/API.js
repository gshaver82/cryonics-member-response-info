import axios from "axios";
import firebaseEnvConfigs from '../firebase';

// Initialize an instance of axios, pass in the header type.
const firebase = firebaseEnvConfigs.firebase_;
const authorize = axios.create();

// Observing firebase.auth() to listen signin/signout.
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("[API] User is signed in");
        // console.log("user =", user)
        // console.log("Firebase.auth().user =",firebase.auth().user)
        // Getting an authorization token from Fireback to send to the backend.
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

// export default {
//     findOneAndUpdate: function (userid) {
//         console.log("[api] find one and update " + userid);

        
//         return authorize.post("/api/example", userid);
//     }
// };


