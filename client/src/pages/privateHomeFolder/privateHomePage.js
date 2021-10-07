import React, { useState, useEffect } from 'react';
import firebaseEnvConfigs from '../../firebase';
// import { Link } from 'react-router-dom';
import API from "../../utils/API";
import { useHistory } from "react-router-dom";

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
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);
    let history = useHistory();
    const [userList, setUsers] = useState([]);
    const [fitbitObject, setfitbitObject] = useState(false);
    const [fitbitFULLURL, setfitbitFULLURL] = useState(false);
    const [fitbitUserHRDataResponse, setfitbitUserHRDataResponse] = useState(false);
    const [fitbitNewestTime, setfitbitNewestTime] = useState(false);

    useEffect(() => {
        geolocator()
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
        //----------
        //this block creates the fitbit URL for the login link
        let basefitbitURL = "https://www.fitbit.com/oauth2/authorize?response_type=code"
        let fitbitURLclientid = "&client_id=" + process.env.REACT_APP_CLIENT_ID
        //this should be test or privateHomePage
        let fitbitURLredirect_uriNavPage = "privateHomePage";
        let fitbitURLredirect_uri = ""

        window.location.hostname === "localhost"
            ? fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%3A3000%2F" + fitbitURLredirect_uriNavPage
            : fitbitURLredirect_uri = "https%3A%2F%2F" + window.location.hostname + "%2F" + fitbitURLredirect_uriNavPage

        let fitbitURLscope = "&scope=activity%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight&"
        let fitbitURLexpires_in = "expires_in=604800"
        setfitbitFULLURL(basefitbitURL + fitbitURLclientid + "&redirect_uri=" + fitbitURLredirect_uri + fitbitURLscope + fitbitURLexpires_in);
        //----------
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
        setfitbitObject(fitbitData)
        const fitbitObjectForDB = {
            firebaseAuthID: firebaseUserID,
            checkinDevices: {
                fitbit: {
                    fitbitDeviceRegistered: true,
                    authToken: fitbitData.access_token,
                    refreshToken: fitbitData.refresh_token
                },
            }
        }
        console.log("🚀 ~ fitbitGetAuthToken ~ fitbitObjectForDB", fitbitObjectForDB)
        API.putFitBitTokens(fitbitObjectForDB)
            .then(console.log("tokens sent to DB", fitbitObjectForDB))
            .then(history.push("/privateHomePage"))
            .catch(err => console.log(err));
    }

    const handleGetHeartrate = async () => {
        let fitBitDataJSON = 'starting value'
        let authTokens = 'starting value'
        authTokens = await API.fitbitGetDBAuthToken(firebaseUserID)
            .then(res => res.data)
            .catch(err => console.log(err))
        if (!authTokens) {
            console.log("!authtokens")
            return
        } else {
            console.log("🚀 ~ handleGetHeartrate ~ authTokens", authTokens)
            fitBitDataJSON = await getFitBitData(authTokens)
        }

        if (!fitBitDataJSON) {
            console.log("!fitBitDataJSON")
            return
        } else if (fitBitDataJSON.success === false) {
            console.log("failure to retrieve fitbit data", fitBitDataJSON.errors[0])
            return
        } else {
            console.log("no errors")
        }

        fitBitDataJSON = JSON.stringify(fitBitDataJSON);
        fitBitDataJSON = fitBitDataJSON.replaceAll('-', '');
        fitBitDataJSON = JSON.parse(fitBitDataJSON);
        const heartRate = fitBitDataJSON.activitiesheart[0].value.restingHeartRate;
        setfitbitUserHRDataResponse(heartRate)

        //getting the most recent time from the fitbitdatajson
        //if the current days entry does not exist then skip
        if (fitBitDataJSON.activitiesheartintraday.dataset) {
            setisLoading(true)
            try{
            let YoungestFitbitHR = fitBitDataJSON.activitiesheartintraday.dataset.pop();
            YoungestFitbitHR = YoungestFitbitHR.time;
            console.log("🚀 TIME ~ handleGetHeartrate ~ YoungestFitbitHR", YoungestFitbitHR)
            YoungestFitbitHR = YoungestFitbitHR.replaceAll(':', '')
            YoungestFitbitHR = YoungestFitbitHR.slice(0, 4)
            setfitbitNewestTime(YoungestFitbitHR)

            //convert to current date code
            //this will take todays date and then put in the hours and minutes that was retrieved from fitbit
            const CurrentDate = new Date();
            console.log("🚀 ~ handleGetHeartrate ~ CurrentDate", CurrentDate)
            let hours = YoungestFitbitHR.slice(0, 2)
            console.log("🚀 ~ handleGetHeartrate ~ hours", hours)
            let minutes = YoungestFitbitHR.slice(2, 4)
            console.log("🚀 ~ handleGetHeartrate ~ minutes", minutes)
            const FBcheckinDateCode = new Date(new Date().setHours(hours, minutes, '00'));
            console.log("🚀 ~ handleGetHeartrate ~ FBcheckinDateCode", FBcheckinDateCode)
            //then putfitbit checkin
            const newArrayEntry =
            {
                dateCreated: FBcheckinDateCode
            }
            let fitbitCheckinObjectForDB = {
                firebaseAuthID: firebaseUserID,
                newArrayEntry
            }
            console.log("🚀 ~ handleGetHeartrate ~ fitbitCheckinObjectForDB", fitbitCheckinObjectForDB)

            API.putFitBitManualCheckin(fitbitCheckinObjectForDB)
                .then(console.log("datecode sent to DB", fitbitCheckinObjectForDB))
                .catch(err => console.log(err));
            API.getOneUserByFirebaseID(firebaseUserID)
                .then(res => setUser(res.data))
                .then(setisLoading(false))
                .catch(err => console.log(err));
            } catch (error) {
                setisLoading(false)
                console.log("fitbit dataset pop failed", error);
                // expected output: ReferenceError: nonExistentFunction is not defined
                // Note - error messages will vary depending on browser
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

    const handleputWebcheckIn = async () => {
        setisLoading(true)
        //sends lat and lng to create a new object for the array. function will default to 0 
        let newCheckinData = await newCheckinDataFunction(lat, lng);
        let checkInData = {
            firebaseAuthID: firebaseUserID,
            newCheckinData
        }
        await API.putWebcheckIn(checkInData)
            .catch(err => console.log(err));
        await API.getOneUserByFirebaseID(firebaseUserID)
            .then(res => setUser(res.data))
            .then(setisLoading(false))
            .catch(err => console.log(err));
    };
    //defaults to 0 if lat and long are not detected
    async function newCheckinDataFunction(lat = 0, lng = 0) {
        // console.log("🚀 ~ newCheckinDataFunction ~ lat", lat)
        let newCheckinData = {
            dateCreated: Date.now(),
            loc: {
                type: "Point",
                coordinates: [lat, lng],
            }
        }
        return newCheckinData
    }

    function geolocator() {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    let minutes = "Loading..."
    let hours = "Loading..."
    let days = "Loading..."

    if (isLoading === false && user !== "starting user condition" && user) {
        const temptime = Date.now() - (new Date(user.checkinDevices.WebsiteCheckIn.checkinArray[0].dateCreated).getTime());
        minutes = Math.floor(temptime / 1000 / 60 % 60) < 0 ? 0 : Math.floor(temptime / 1000 / 60 % 60);
        hours = Math.floor(temptime / 1000 / 60 / 60 % 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 % 24);
        days = Math.floor(temptime / 1000 / 60 / 60 / 24) < 0 ? 0 : Math.floor(temptime / 1000 / 60 / 60 / 24);
    }

    let GoogleURL = "void";
    if (isLoading === false && user !== "starting user condition" && user) {
        if (user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]
            && user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]) {
            GoogleURL = "https://www.google.com/maps/place/" +
                [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]] + "+" +
                [user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]]
        }
    }

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
            <div className="mb-2">
                <div className="d-flex justify-content-between">
                    <p>
                        this is where you will be able to view all of your active devices,
                        and what their status is according to this server
                    </p>
                </div>
            </div>
            <div className="recipe-card recipe-border-2">
                <p>Click this button to check in and update your status. Make sure you allow GPS if you want to store your location information</p>
                <button type="button" onClick={handleputWebcheckIn}>
                    Website Checkin
                </button>
                <p>{days} days {hours} hours {minutes} minutes since website checkin</p>
                <p>Click this button to check in and update your status. Make sure you allow GPS if you want to store your location information</p>
                {/* <h3>GPS Coordinates according to browser</h3> */}
                <p>Browser GPS status: {status}</p>
                {/* {!lat && !lng &&
                <p>no lat or Longitude</p>
            }
            {lat && lng &&
                <p>Latitude: {lat} Longitude: {lng}</p>
            } */}

                <p>Database shows:</p>
                {GoogleURL !== "void"
                    ? <a href={GoogleURL} target="_blank" rel="noopener noreferrer">GoogleMaps</a>
                    : <p>no GPS coordinates found in database</p>}
                {!isLoading &&
                    user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0] &&
                    user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1] &&
                    <p>Lat: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[0]}{"    "}
                        Long: {user.checkinDevices.WebsiteCheckIn.checkinArray[0].loc.coordinates[1]}{"    "}</p>
                }
            </div>
            <div className="recipe-card recipe-border-2">
                <div className="recipe-card recipe-border-2">
                    <p>
                        click here to go to fitbit, log in and register your fitbit with this website.
                    </p>
                    {fitbitFULLURL && <a target="_blank" href={fitbitFULLURL}>FITBIT LOGIN</a>}
                </div>
                <div className="recipe-card recipe-border-2">
                    {/* <p>Fitbit object is {fitbitObject && <span> valid and user id is: {fitbitObject.user_id}</span>}
                    {!fitbitObject && <span> not valid</span>}</p> */}
                    <p>
                        click here to manually check with fitbit for the most recent heart rate timestamp.
                        Please note that the server will automatically be doing this every 10-15 minutes for registered devices
                    </p>
                    <button onClick={handleGetHeartrate}>
                        Get most recent heart rate
                    </button>
                    {/* <p>generic Data from fitbit
                    {fitbitUserHRDataResponse &&
                        <span> is loaded and your resting heart rate is:
                            {fitbitUserHRDataResponse}</span>}
                    {!fitbitUserHRDataResponse && <span> has not yet loaded</span>}</p> */}

                    {/* <p>Fitbit Intra day data
                    {fitbitNewestTime &&
                        <span> is loaded and your most recent time according to the fitbit server is:
                            {fitbitNewestTime}</span>}
                    {!fitbitNewestTime && <span> has not yet loaded</span>}</p> */}
                </div>

                {user.checkinDevices.fitbit.fitbitDeviceRegistered
                    ? <div>
                        <p>Most recent fitbit Check in:
                        </p>
                        <p>
                            {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toDateString())} {" "}
                        </p>
                        <p>
                            {(new Date(user.checkinDevices.fitbit.checkinArray[0].dateCreated).toTimeString())}
                        </p>
                    </div>
                    : <p>fitbit device not registered</p>
                }
            </div>

        </div>)
    } else {
        return (<h3>Loading Profile....</h3>)
    }
}

export default PrivateHomePage;