
const router = require("express").Router();

const apiRoutes = require("./api");
const cApiRoutes = require("./cApi");
const smsRoutes = require("./sms");

const admin = require("firebase-admin");


try {
    const serviceAccount =
        require("../config/serviceAccountKey.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

} catch (error) {

    admin.initializeApp({
        credential: admin.credential.cert({
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            private_key: process.env.FIREBASE_PRIVATE_KEY,
            project_id: process.env.FIREBASE_PROJECT_ID
        })
    });
}

// =====================================================
// WEBSITE AUTHENTICATION
// =====================================================

// Keep compatibility with the existing website.
// Accept either a raw Firebase ID token or a Bearer token.

async function checkAuth(req, res, next) {

    const authorization = req.headers.authorization;

    if (!authorization) {
        console.log("[SERVER] No authorization token");
        return res.status(403).send("Unauthorized");
    }

    const token = authorization.replace(
        /^Bearer\s+/i,
        ""
    );

    try {
        const decodedToken = await admin
            .auth()
            .verifyIdToken(token);

        // Make authenticated user ID available to routes.
        req.firebaseAuthID = decodedToken.uid;

        next();

    } catch (error) {
        console.log("[SERVER] Invalid Firebase token");
        return res.status(403).send("Unauthorized");
    }
}

router.use("/api", checkAuth);
router.use("/api", apiRoutes);

// =====================================================
// COMPANION / DEVICE AUTHENTICATION
// =====================================================

function checkCompanion(req, res, next) {

    // NEW DEVICE TOKEN AUTHENTICATION
    //
    // The middleware in server.js validates the
    // bearer token and attaches req.pairedDevice.
    //
    // Only the emergency-alert endpoint is allowed
    // to use this new authentication mechanism.

    if (
        req.method === "PUT" &&
        req.path === "/device" &&
        req.pairedDevice &&
        req.pairedDevice.firebaseAuthID
    ) {
        return next();
    }

    // LEGACY AUTHENTICATION
    //
    // Preserve the old shared secret for other
    // existing device endpoints until migrated.
    //
    // The PUT /cApi/device endpoint must NOT
    // fall back to the old shared secret.

    if (
        req.method === "PUT" &&
        req.path === "/device"
    ) {
        console.log(
            "[SERVER] Device token authentication required"
        );

        return res.status(401).send(
            "Device authentication required"
        );
    }

    if (
        req.headers.semisecret &&
        req.headers.semisecret ===
            process.env.SEMISECRET &&
        process.env.SEMISECRET
    ) {

        console.log(
            "[SERVER] Legacy device authenticated"
        );

        return next();

    } else {

        console.log(
            "[SERVER] Unauthorized companion request"
        );

        return res.status(403).send(
            "Unauthorized companion"
        );
    }
}

router.use("/cApi", checkCompanion);
router.use("/cApi", cApiRoutes);

// =====================================================
// SMS / VOICE ROUTES
// =====================================================

function smsFunction(req, res, next) {

    console.log(
        "[SERVER] Incoming SMS or voice request"
    );

    next();
}

router.use("/sms", smsFunction);
router.use("/sms", smsRoutes);

module.exports = router;

