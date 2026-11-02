
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const serverCode = require("./serverCode");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "32kb" }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/cryonics_localtest_db",
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// ==========================================================
// Fitbit Sense replacement pairing API
// Implement the called functions in serverCode.js next.
// These routes MUST appear before app.use(routes).
// ==========================================================

function getBearerToken(req) {
  const match = /^Bearer\s+(\S+)$/i.exec(req.get("Authorization") || "");
  return match ? match[1] : null;
}

// WEBSITE ONLY: A logged-in user requests a short-lived pairing code.
// Do not trust a user ID submitted in the body. The serverCode function
// must verify the WEBSITE's Firebase ID token and return an authenticated
// user record (including firebaseAuthID).
app.post("/cApi/device/pair-code", async (req, res) => {
  try {
    const websiteToken = getBearerToken(req);
    if (!websiteToken) return res.status(401).json({ error: "Sign-in required" });

    const user = await serverCode.verifyWebsiteUser(websiteToken);
    if (!user || !user.firebaseAuthID) {
      return res.status(401).json({ error: "Invalid website credentials" });
    }

    // serverCode: securely create a 6-digit, one-use code, hash it in DB,
    // associate it with this user, expire it after ~5-10 minutes,
    // and rate-limit generation. Return { pairingCode, expiresAt }.
    const result = await serverCode.createDevicePairingCode(user.firebaseAuthID);
    if (!result || !/^[0-9]{6}$/.test(result.pairingCode)) {
      throw new Error("Invalid pairing-code generation result");
    }
    return res.status(201).json({
      pairingCode: result.pairingCode,
      expiresAt: result.expiresAt
    });
  } catch (err) {
    console.error("Pair-code generation failed:", err.message);
    return res.status(500).json({ error: "Could not create pairing code" });
  }
});

// PHONE COMPANION: Exchange a temporary six-digit code for a long-lived
// per-device bearer credential and a public six-character display ID.
app.post("/cApi/device/pair", async (req, res) => {
  const pairingCode = req.body && req.body.pairingCode;
  if (typeof pairingCode !== "string" || !/^[0-9]{6}$/.test(pairingCode)) {
    return res.status(400).json({ error: "A six-digit pairing code is required" });
  }

  try {
    // serverCode MUST rate-limit guesses, atomically consume a valid
    // unexpired code, generate a crypto-random 32-byte hex token,
    // hash the token for DB storage, associate it with the user,
    // generate a unique 6-character displayId, and return:
    // { deviceToken: <64 hex characters>, displayId: <6 A-Z0-9 chars> }
    const result = await serverCode.exchangeDevicePairingCode(pairingCode);

    if (!result) {
      return res.status(400).json({ error: "Invalid or expired pairing code" });
    }
    if (!/^[a-fA-F0-9]{64}$/.test(result.deviceToken || "") ||
        !/^[A-Z0-9]{6}$/.test(result.displayId || "")) {
      throw new Error("Invalid pairing exchange result");
    }

    res.set("Cache-Control", "no-store");
    return res.status(200).json({
      deviceToken: result.deviceToken,
      displayId: result.displayId
    });
  } catch (err) {
    console.error("Device pairing failed:", err.message);
    return res.status(500).json({ error: "Could not complete pairing" });
  }
});

// PHONE COMPANION ALERTS: Authenticate before passing the request to the
// existing /cApi/device route defined in ./routes.
// IMPORTANT: That handler must be modified to use req.pairedDevice.user,
// not a caller-provided user_id or the old 'semisecret' header.
app.put("/cApi/device", async (req, res, next) => {
  const deviceToken = getBearerToken(req);
  if (!deviceToken || !/^[a-fA-F0-9]{64}$/.test(deviceToken)) {
    return res.status(401).json({ error: "Valid device token required" });
  }

  try {
    // serverCode must SHA-256 hash the token, find an active (not revoked)
    // device credential, and return the account mapping (or null).
    const pairedDevice = await serverCode.validateDeviceToken(deviceToken);
    if (!pairedDevice || !pairedDevice.firebaseAuthID) {
      return res.status(401).json({ error: "Device not paired or revoked" });
    }

    req.pairedDevice = pairedDevice;
    return next();
  } catch (err) {
    console.error("Device token validation failed:", err.message);
    return res.status(503).json({ error: "Device authentication unavailable" });
  }
});

// Existing application/API routes, including actual alert processing.
app.use(routes);

// SPA fallback must remain after API routes.
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});


