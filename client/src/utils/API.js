/* eslint-disable import/no-anonymous-default-export */
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

export default {
    // getAllRecipes: function () {
    //     return authorize.get("/api/recipes");
    // },
    // createRecipe: function (newUser) {
    //     console.log("[API] test create. ", newUser);
    //     return authorize.post("/api/example", newUser);
    // },
    getuserList: function () {
        console.log("[API] getting all users");
        return authorize.get("/api/users");
    },

    
    adduser: function (newUser) {
        console.log("[API] add 1 user " + newUser);
        return authorize.put("/api/users", newUser);
    },

    // updateRecipe: function (_id, recipe) {
    //     return authorize.put("/api/recipes/" + _id, recipe);
    // },
    // getOneRecipe: function (_id) {
    //     return authorize.get("/api/recipes/" + _id);
    // },
    // getUserRecipes: function (userID) {
    //     console.log("[API] getting all recipes by specified user", userID);
    //     return authorize.get("/api/recipes/user/" + userID);
    // },
    // deleteRecipe: function (_id) {
    //     console.log("[API] Recipe deleted:", _id);
    //     return authorize.delete("/api/recipes/" + _id);
    // },
};
