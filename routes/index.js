// const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const admin = require('firebase-admin');

//why is this here? its not in the recipebox
// const { auth } = require("firebase-admin");

//this will attempt to load firebase stuff from local service account key
//if not avaiable because this is being run from heroku, itll load from there automagically


// is this only for firebase database auth, or does login auth need this too?
//database URL is the url of the realtime database under firebase
// try {
//     const serviceAccount = require("../config/serviceAccountKey.json");
//     admin.initializeApp({
//         credential: admin.credential.cert(serviceAccount),
//         // databaseURL: ""
//     });
// } catch (error) {
//     admin.initializeApp({
//         credential: admin.credential.cert({
//             "client_email": process.env.FIREBASE_CLIENT_EMAIL,
//             "private_key": process.env.FIREBASE_PRIVATE_KEY,
//             "project_id": process.env.FIREBASE_PROJECT_ID,
//         }),
//         // databaseURL: ""
//     });
// }

function checkAuth(req, res, next) {
    console.log("================================================")
    console.log("[SERVER] Beginning Authentication");
    if (req.headers.authorization) {
        admin.auth().verifyIdToken(req.headers.authorization)
            .then(() => {
                console.log("[SERVER] Authorization successful");
                next()
            }).catch(() => {
                console.log("[SERVER] Found unauthorized token");
                res.status(403).send('Unauthorized')
            });
    } else {
        console.log("[SERVER] No Authorization token found");
        res.status(403).send('Unauthorized')
    }
}

// API Routes
router.use("/api", checkAuth);
console.log("[SERVER-ROUTES] API Routes hit");
router.use("/api", apiRoutes);

module.exports = router;
