
import React, { useState, useEffect } from "react";
import firebaseEnvConfigs from "../../firebase";
import API from "../../utils/API";

const firebase = firebaseEnvConfigs.firebase_;

function PrivateHomePage() {

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [pairingCode, setPairingCode] = useState("");
    const [pairingExpiresAt, setPairingExpiresAt] = useState(null);
    const [isGeneratingCode, setIsGeneratingCode] = useState(false);

    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // =====================================================
    // LOAD USER PROFILE
    // =====================================================

    const loadUser = async () => {

        const currentUser = firebase.auth().currentUser;

        if (!currentUser) {
            setUser(null);
            setIsLoading(false);
            return;
        }

        try {
            const response = await API.getOneUserByFirebaseID(
                currentUser.uid
            );

            setUser(response.data);

        } catch (error) {
            console.error("Error loading user:", error);
            setErrorMessage("Unable to load user profile.");

        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // =====================================================
    // ENABLE / DISABLE ALERTS
    // =====================================================

    const updateAlertSetting = async (enabled) => {

        const currentUser = firebase.auth().currentUser;
        if (!currentUser) return;

        setIsSaving(true);
        setMessage("");
        setErrorMessage("");

        try {

            const editedUser = {
                firebaseAuthID: currentUser.uid,
                signedUpForAlerts: enabled
            };

            await API.edituser(editedUser);

            await loadUser();

            setMessage(
                enabled
                    ? "Text and phone alerts enabled."
                    : "Text and phone alerts disabled."
            );

        } catch (error) {

            console.error("Error updating alerts:", error);
            setErrorMessage("Unable to update alert settings.");

        } finally {
            setIsSaving(false);
        }
    };

    // =====================================================
    // GENERATE WATCH PAIRING CODE
    // =====================================================

    const generatePairingCode = async () => {

        const currentUser = firebase.auth().currentUser;

        if (!currentUser) {
            setErrorMessage("You must be logged in.");
            return;
        }

        setIsGeneratingCode(true);
        setPairingCode("");
        setPairingExpiresAt(null);
        setMessage("");
        setErrorMessage("");

        try {

            // Firebase authentication token.
            const idToken = await currentUser.getIdToken();

            // New endpoint implemented in server.js.
            const response = await fetch(
                "/cApi/device/pair-code",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + idToken
                    }
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Server returned HTTP " + response.status
                );
            }

            const data = await response.json();

            if (
                typeof data.pairingCode !== "string" ||
                !/^[0-9]{6}$/.test(data.pairingCode)
            ) {
                throw new Error("Invalid pairing code response.");
            }

            setPairingCode(data.pairingCode);
            setPairingExpiresAt(data.expiresAt);

            setMessage("Pairing code generated successfully.");

        } catch (error) {

            console.error("Pairing code error:", error);
            setErrorMessage(
                "Unable to generate pairing code. Please try again."
            );

        } finally {
            setIsGeneratingCode(false);
        }
    };

    // =====================================================
    // CLEAR ACTIVE WATCH ALERT
    // =====================================================

    const handleClearAlert = async () => {

        if (!user?._id) return;

        setIsSaving(true);
        setMessage("");
        setErrorMessage("");

        try {

            const mongoUserId = {
                _id: user._id
            };

            await API.putWebClearFBAlert(mongoUserId);

            await loadUser();

            setMessage("Watch alert cleared successfully.");

        } catch (error) {

            console.error("Error clearing alert:", error);
            setErrorMessage("Unable to clear watch alert.");

        } finally {
            setIsSaving(false);
        }
    };

    // =====================================================
    // PAGE STATUS
    // =====================================================

    if (isLoading) {
        return <h3>Loading Profile...</h3>;
    }

    if (!user) {
        return (
            <div>
                <h3>
                    No profile found. Please create a profile
                    to access the control panel.
                </h3>
            </div>
        );
    }

    const fitbit = user.checkinDevices?.fitbit;

    const activeAlert =
        fitbit?.alertArray?.[0]?.activeState === true;

    const alertsEnabled =
        user.signedUpForAlerts === true;

    const displayId = fitbit?.displayId;

    const isPaired =
        fitbit?.fitbitDeviceRegistered === true &&
        fitbit?.deviceTokenRevoked === false &&
        typeof displayId === "string" &&
        /^[A-Z0-9]{6}$/.test(displayId);

    // =====================================================
    // RENDER CONTROL PANEL
    // =====================================================

    return (
        <div>

            <h3>
                Welcome <span>{user.name}</span>
            </h3>

            <h2>Control Panel</h2>

            {message && (
                <p style={{ color: "green" }}>
                    {message}
                </p>
            )}

            {errorMessage && (
                <p style={{ color: "red" }}>
                    {errorMessage}
                </p>
            )}

            {/* ==========================================
                EMERGENCY ALERT STATUS
            ========================================== */}

            <div className="recipe-card recipe-border-2">

                <h3>Emergency Alert Status</h3>

                {activeAlert ? (
                    <div>

                        <p style={{
                            color: "red",
                            fontWeight: "bold"
                        }}>
                            ACTIVE WATCH ALERT
                        </p>

                        <button
                            onClick={handleClearAlert}
                            disabled={isSaving}
                        >
                            Clear Alert
                        </button>

                    </div>
                ) : (
                    <p style={{ color: "green" }}>
                        No active alert
                    </p>
                )}

            </div>

            {/* ==========================================
                TEXT AND PHONE ALERT SETTINGS
            ========================================== */}

            <div className="recipe-card recipe-border-2">

                <h3>Text / Phone Alerts</h3>

                <p>
                    <b>
                        Alerts are currently:
                        {" "}
                        <span style={{
                            color: alertsEnabled
                                ? "green"
                                : "red"
                        }}>
                            {alertsEnabled ? "ON" : "OFF"}
                        </span>
                    </b>
                </p>

                <button
                    onClick={() => updateAlertSetting(true)}
                    disabled={isSaving || alertsEnabled}
                >
                    Alerts ON
                </button>

                {" "}

                <button
                    onClick={() => updateAlertSetting(false)}
                    disabled={isSaving || !alertsEnabled}
                >
                    Alerts OFF
                </button>

                <p>
                    When alerts are ON, emergency alerts
                    received from your watch can trigger
                    text messages and phone calls to the
                    contacts configured in your profile.
                </p>

                <p>
                    Turning alerts OFF disables outgoing
                    text and phone notifications. The
                    watch can still monitor heart rate
                    and send alerts to the server.
                </p>

            </div>

            {/* ==========================================
                FITBIT WATCH PAIRING
            ========================================== */}

            <div className="recipe-card recipe-border-2">

                <h3>Watch Pairing</h3>

                {isPaired ? (
                    <div>

                        <p style={{ color: "green" }}>
                            <b>Watch Paired</b>
                        </p>

                        <p>
                            Watch ID:
                            {" "}
                            <b>{displayId}</b>
                        </p>

                    </div>
                ) : (
                    <p>
                        No watch currently paired.
                    </p>
                )}

                <hr />

                <h4>Generate Pairing Code</h4>

                <p>
                    Generate a temporary six-digit pairing
                    code to connect your Fitbit Sense
                    clockface to this account.
                </p>

                <button
                    onClick={generatePairingCode}
                    disabled={isGeneratingCode}
                >
                    {isGeneratingCode
                        ? "Generating..."
                        : "Generate Pairing Code"}
                </button>

                {pairingCode && (
                    <div style={{
                        marginTop: "20px",
                        textAlign: "center"
                    }}>

                        <p>Your Pairing Code:</p>

                        <h2 style={{
                            fontSize: "36px",
                            letterSpacing: "6px"
                        }}>
                            {pairingCode}
                        </h2>

                        <p>
                            Enter this code in your Fitbit
                            clockface settings.
                        </p>

                        {pairingExpiresAt && (
                            <p>
                                Expires:
                                {" "}
                                {new Date(
                                    pairingExpiresAt
                                ).toLocaleTimeString()}
                            </p>
                        )}

                    </div>
                )}

                <p>
                    After entering the pairing code,
                    the Fitbit phone companion will
                    exchange it for a secure device
                    token and a six-character watch ID.
                </p>

                <p>
                    The watch ID will be displayed on
                    your Fitbit clockface after pairing
                    completes.
                </p>

                <button
                    onClick={loadUser}
                    disabled={isSaving || isGeneratingCode}
                >
                    Refresh Pairing Status
                </button>

            </div>

        </div>
    );
}

export default PrivateHomePage;
