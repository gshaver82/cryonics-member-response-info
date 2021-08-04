const router = require("express").Router();
const apiRoutes = require("./api");
const admin = require('firebase-admin');


//this will attempt to load firebase stuff from local service account key
//if not avaiable because this is being run from heroku, itll load from there automagically

//database URL is the url of the realtime database under firebase
try {
    const serviceAccount = require("../config/serviceAccountKey.json");
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // databaseURL: ""
    });
} catch (error) {
    admin.initializeApp({
        credential: admin.credential.cert({
            "client_email": process.env.FIREBASE_CLIENT_EMAIL,
            "private_key": process.env.FIREBASE_PRIVATE_KEY,
            "project_id": process.env.FIREBASE_PROJECT_ID,
        }),
        // databaseURL: ""
    });
}

function checkAuth(req, res, next) {
    if (req.headers.authorization) {
        admin.auth().verifyIdToken(req.headers.authorization)
            .then(() => {
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

router.use("/api", checkAuth);
router.use("/api", apiRoutes);

module.exports = router;
