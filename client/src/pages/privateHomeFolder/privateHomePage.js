import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const firebase = firebaseEnvConfigs.firebase_;

function PrivateHomePage() {
    const firebaseUserID = firebase.auth().currentUser.uid
    //this loads a dummy user that later gets checked on. no user should ever have this value
    //this is because the use effect immediately tries to pull user date from database.
    //if the DB doesnt have the user, itll put NULL into the user
    //if it does have the user, then user info gets put in.
    //the reason to have this complex setup is to prevent the create profile button from flashing
    //across the screen as the web page waits for the DB to respond
    const [user, setUser] = useState("starting user condition");
    const [isLoading, setisLoading] = useState(true);
    // const [lat, setLat] = useState(null);
    // const [lng, setLng] = useState(null);
    // const [status, setStatus] = useState(null);
    let history = useHistory();
    // const [userList, setUsers] = useState([]);
    // const [fitbitObject, setfitbitObject] = useState(false);
    const [fitbitFULLURL, setfitbitFULLURL] = useState(false);
    // const [fitbitUserHRDataResponse, setfitbitUserHRDataResponse] = useState(false);
    // const [fitbitNewestTime, setfitbitNewestTime] = useState(false);

    useEffect(() => {
        // geolocator()
        API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        startupcode();
    }, []);
    function startupcode() {
        let basefitbitURL = "https://www.fitbit.com/oauth2/authorize?response_type=code"
        let fitbitURLclientid = "&client_id=" + process.env.REACT_APP_CLIENT_ID
        let fitbitURLredirect_uriNavPage = "privateHomePage";
        let fitbitURLredirect_uri = ""
        window.location.hostname === "localhost"
            ? fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%3A3000%2F" + fitbitURLredirect_uriNavPage
            : fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%2F" + fitbitURLredirect_uriNavPage

        let fitbitURLscope = "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&"
        let fitbitURLexpires_in = "expires_in=604800"
        setfitbitFULLURL(basefitbitURL + fitbitURLclientid + "&redirect_uri=" + fitbitURLredirect_uri + fitbitURLscope + fitbitURLexpires_in);
        if (window.location.search.substring(0, 6) === "?code=") {
            fitbitGetAuthToken(fitbitURLredirect_uri)
        }
    };
    async function fitbitGetAuthToken(fitbitURLredirect_uri) {
        const fitbitAuthTokenNeededData = {
            Authorization: "Basic " + process.env.REACT_APP_ENCODEDBASE,
            clientId: process.env.REACT_APP_CLIENT_ID,
            grant_type: 'authorization_code',
            redirect_uri: fitbitURLredirect_uri,
            code: window.location.search.substring(6),
        }
        let url = "https://api.fitbit.com/oauth2/token" + "?clientId=" + fitbitAuthTokenNeededData.clientId
            + "&grant_type=" + fitbitAuthTokenNeededData.grant_type + "&redirect_uri=" + fitbitAuthTokenNeededData.redirect_uri
            + "&code=" + fitbitAuthTokenNeededData.code;
        let fitbitData = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': fitbitAuthTokenNeededData.Authorization
            },
            referrerPolicy: 'no-referrer',
        })
            .then(response => response.json())
            .catch(error => {
                console.error('Error:', error);
            });
        //fitbitdata is stored fitbitobject for display on webpage
        // setfitbitObject(fitbitData)
        const fitbitObjectForDB = {
            firebaseAuthID: firebaseUserID,
            checkinDevices: {
                fitbit: {
                    fitbitDeviceRegistered: true,
                    authToken: fitbitData.access_token,
                    refreshToken: fitbitData.refresh_token,
                    user_id: fitbitData.user_id,
                },
            }
        }
        // console.log("🚀 ~ fitbitGetAuthToken ~ fitbitObjectForDB")
        API.putFitBitTokens(fitbitObjectForDB)
            // .then(console.log("tokens sent to DB"))
            .then(history.push("/privateHomePage"))
            .catch(err => console.log(err));
    }

    const handleGetHeartrate = async () => {
        let fitBitDataJSON = 'starting value'
        let fitBitDeviceDataJSON = 'starting value'
        // let fitBitDeviceDataJSON = 'starting value'
        let authTokens = 'starting value'
        authTokens = await API.fitbitGetDBAuthToken(firebaseUserID)
            .then(res => res.data)
            .catch(err => console.log(err))
        if (!authTokens) {
            console.log("!authtokens")
            return
        } else {
            fitBitDataJSON = await getFitBitData(authTokens)
            fitBitDeviceDataJSON = await getFitBitDeviceData(authTokens)
        }
        console.log(fitBitDeviceDataJSON[0])

        if (!fitBitDataJSON) {
            console.log("!fitBitDataJSON")
            return
        } else if (fitBitDataJSON.success === false) {
            console.log("failure to retrieve fitbit data", fitBitDataJSON.errors[0])
            return
        }

        fitBitDataJSON = JSON.stringify(fitBitDataJSON);
        fitBitDataJSON = fitBitDataJSON.replaceAll('-', '');
        fitBitDataJSON = JSON.parse(fitBitDataJSON);
        // const heartRate = fitBitDataJSON.activitiesheart[0].value.restingHeartRate;
        // setfitbitUserHRDataResponse(heartRate)

        //getting the most recent time from the fitbitdatajson
        //if the current days entry does not exist then skip
        if (fitBitDataJSON.activitiesheartintraday.dataset) {
            setisLoading(true)
            try {
                let YoungestFitbitHR = fitBitDataJSON.activitiesheartintraday.dataset.pop();
                YoungestFitbitHR = YoungestFitbitHR.time;
                YoungestFitbitHR = YoungestFitbitHR.replaceAll(':', '')
                YoungestFitbitHR = YoungestFitbitHR.slice(0, 4)
                // setfitbitNewestTime(YoungestFitbitHR)
                //convert to current date code
                //this will take todays date and then put in the hours and minutes that was retrieved from fitbit
                let hours = YoungestFitbitHR.slice(0, 2)
                let minutes = YoungestFitbitHR.slice(2, 4)
                const FBcheckinDateCode = new Date(new Date().setHours(hours, minutes, '00'));
                const newArrayEntry = { dateCreated: FBcheckinDateCode }
                let fitbitCheckinObjectForDB = {
                    firebaseAuthID: firebaseUserID,
                    newArrayEntry
                }
                //TODO fitBitDeviceDataJSON send that to upload the battery info
                API.putFitBitManualCheckin(fitbitCheckinObjectForDB)
                    // .then(console.log("datecode sent to DB"))
                    .catch(err => console.log(err));
                API.getOneUserByFirebaseID(firebaseUserID)
                    .then(res => setUser(res.data))
                    .then(setisLoading(false))
                    .catch(err => console.log(err));
            } catch (error) {
                setisLoading(false)
                console.log("fitbit dataset pop failed", error);
            }
        }
    }

    async function getFitBitData(authTokens) {
        if (authTokens) {
            let url = "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d/1min.json"
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + authTokens.authToken
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } else {
            console.log("no auth tokens")
        }
    }
    async function getFitBitDeviceData(authTokens) {
        if (authTokens) {
            const url = "https://api.fitbit.com/1/user/-/devices.json"
            const response = await fetch(url, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + authTokens.authToken
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer'
            });
            return response.json(); // parses JSON response into native JavaScript objects
        } else {
            console.log("no auth tokens")
        }
    }

    const handleAlertsOn = async () => {
        setisLoading(true)
        try {
            const editedUser = {
                firebaseAuthID: firebaseUserID,
                signedUpForAlerts: true,
            }
            await API.edituser(editedUser)
                .catch(err => console.log(err));
            await API.getOneUserByFirebaseID(firebaseUserID)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
            const response = await API.putClearFBAlert(user._id)
                .then(setisLoading(false))
                .catch(err => console.log(err));
            //this console log will expose the put URL. only use for testing purposes
            // console.log("api response", response)
        } catch (error) {
            console.error(error);
            setisLoading(false)
        }
    };
    // async function newCheckinDataFunction(lat = 0, lng = 0) {
    // //defaults to 0 if lat and long are not detected
    // console.log("🚀 ~ newCheckinDataFunction ~ lat", lat)
    //     let newCheckinData = {
    //         dateCreated: Date.now(),
    //         loc: {
    //             type: "Point",
    //             coordinates: [lat, lng],
    //         }
    //     }
    //     return newCheckinData
    // }
    const handleAlertsOff = async () => {
        setisLoading(true)
        const editedUser = {
            firebaseAuthID: firebaseUserID,
            signedUpForAlerts: false,
        }
        await API.edituser(editedUser)
            .catch(err => console.log(err));
        await API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };

    // function geolocator() {if (!navigator.geolocation) {
    //         setStatus('Geolocation is not supported by your browser');
    //     } else {
    //         setStatus('Locating...');
    //         navigator.geolocation.getCurrentPosition((position) => {
    //             setStatus(null);
    //             setLat(position.coords.latitude);
    //             setLng(position.coords.longitude);
    //         }, () => {setStatus('Unable to retrieve your location');});
    //     }}

    if (isLoading) {
        return (<h3>Loading Profile....</h3>)
    }
    else if (!user) {
        return (<div>
            <h3>No profile found, please create a profile to view the private home page. </h3>
        </div>)
    } else if (user !== "starting user condition") {
        return (<div>
            <h3>Welcome <span>{user.name}</span></h3>
            <div className="recipe-card recipe-border-2">
                <p>
                    Your device will monitor your heart rate. if it does not detect a heartrate it will send and alert to this server and then send out text and phone alerts to the numbers in your profile
                </p>
                <p>
                    if you want to pause, or turn off phone/text alerts, turn the alerts OFF. the server will still monitor heart rate, but will send no phone/txt messages
                </p>
                {user.signedUpForAlerts ? <p><b>Alert txt/phone active</b></p> : <p><b>Alert txt/phone NOT active</b></p>}
                <button onClick={handleAlertsOn}>
                    Alerts ON
                </button>
                <button onClick={handleAlertsOff}>
                    Alerts OFF
                </button>

            </div>

            <div className="recipe-card recipe-border-2">
                <div>
                    <p>Link to fitbit step by step walkthrough
                        <Link
                            to="/ClockfaceCards"
                        >
                            HERE
                        </Link>
                    </p>
                </div>
                <div className="recipe-card recipe-border-2">
                    <p>
                        click here to go to fitbit, log in and register your fitbit with this website.
                    </p>
                    {fitbitFULLURL && <a target="_blank" href={fitbitFULLURL}>FITBIT LOGIN</a>}
                </div>
                <div className="recipe-card recipe-border-2">
                    <p>
                        click here to manually check with fitbit for the most recent heart rate timestamp.
                        Please note that the server will automatically be doing this every 10-15 minutes for registered devices
                    </p>
                    <button onClick={handleGetHeartrate}>
                        Get most recent heart rate and sign up for alerts
                    </button>
                </div>

                {user.checkinDevices.fitbit.fitbitDeviceRegistered && user.checkinDevices.fitbit.checkinArray[0]
                    ? <div>
                        <p>Latest Fitbit reading:
                            {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toDateString())} {" "}
                        </p>
                        <p>
                            {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toTimeString())}
                        </p>
                    </div>
                    : <p>fitbit device not registered</p>
                }

                {user.checkinDevices?.fitbit?.fbDeviceName && user.checkinDevices?.fitbit?.fbDeviceBat
                    ? <p>
                        Fitbit {user.checkinDevices.fitbit.fbDeviceName} Battery {user.checkinDevices.fitbit.fbDeviceBat}%
                    </p>
                    : <p>fitbit device not registered</p>
                }



            </div>
        </div>)
    } else {
        return (<h3>Loading Profile....</h3>)
    }
}

export default PrivateHomePage;